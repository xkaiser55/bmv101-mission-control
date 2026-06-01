"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { ALLOWED_ACTION, validateQueueRequest } = require("../server/action-schema");
const { createBridgeServer } = require("../server/bridge-server");
const { createQueueStore } = require("../server/queue-store");

function requestJson(port, body) {
  return new Promise((resolve, reject) => {
    const request = http.request({
      hostname: "127.0.0.1",
      port,
      path: "/actions/queue",
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, (response) => {
      let responseBody = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => resolve({ statusCode: response.statusCode, body: JSON.parse(responseBody) }));
    });

    request.on("error", reject);
    request.end(JSON.stringify(body));
  });
}

test("allowlist contains one queue action", () => {
  assert.equal(ALLOWED_ACTION, "ask_eva_checkpoint");
});

test("unknown action is rejected", () => {
  const result = validateQueueRequest({ action: "send_to_mia", payload: { cardId: "card-1", cardTitle: "Review" } });
  assert.equal(result.ok, false);
});

test("extra dangerous field is rejected", () => {
  const result = validateQueueRequest({
    action: ALLOWED_ACTION,
    payload: { cardId: "card-1", cardTitle: "Review", token: "must-not-be-stored" }
  });
  assert.equal(result.ok, false);
});

test("checkpoint request creates sanitized local queue and audit entries", async (context) => {
  const dataDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "mission-control-e2a-"));
  const server = createBridgeServer(createQueueStore(dataDirectory));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  context.after(() => {
    server.close();
    fs.rmSync(dataDirectory, { recursive: true, force: true });
  });

  const port = server.address().port;
  const response = await requestJson(port, {
    action: ALLOWED_ACTION,
    payload: {
      cardId: "checkpoint-card",
      cardTitle: "Review secret token metadata"
    }
  });

  assert.equal(response.statusCode, 202);
  assert.equal(response.body.status, "queued_local");
  assert.equal(response.body.transport, "none");
  assert.equal(response.body.externalDelivery, false);

  const queueEntry = JSON.parse(fs.readFileSync(path.join(dataDirectory, "checkpoint-queue.jsonl"), "utf8").trim());
  const auditEntry = JSON.parse(fs.readFileSync(path.join(dataDirectory, "checkpoint-audit.jsonl"), "utf8").trim());
  assert.equal(queueEntry.action, ALLOWED_ACTION);
  assert.equal(queueEntry.transport, "none");
  assert.equal(queueEntry.externalDelivery, false);
  assert.equal(queueEntry.payload.cardTitle.includes("secret"), false);
  assert.equal(queueEntry.payload.cardTitle.includes("token"), false);
  assert.equal(auditEntry.transport, "none");
  assert.equal(auditEntry.externalDelivery, false);
});
