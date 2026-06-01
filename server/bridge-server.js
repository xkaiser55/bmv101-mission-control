"use strict";

const http = require("node:http");
const { validateQueueRequest } = require("./action-schema");
const { createQueueStore } = require("./queue-store");

const HOST = "0.0.0.0";
const PORT = 8787;
const MAX_BODY_BYTES = 4096;

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(body));
}

function readJsonBody(request, callback) {
  let body = "";

  request.setEncoding("utf8");
  request.on("data", (chunk) => {
    body += chunk;
    if (Buffer.byteLength(body, "utf8") > MAX_BODY_BYTES) {
      request.destroy();
    }
  });
  request.on("end", () => {
    try {
      callback(null, JSON.parse(body));
    } catch (error) {
      callback(new Error("Invalid JSON."));
    }
  });
  request.on("error", () => callback(new Error("Request could not be read.")));
}

function createBridgeServer(store = createQueueStore()) {
  return http.createServer((request, response) => {
    if (request.method === "GET" && request.url === "/health") {
      sendJson(response, 200, { status: "ok", mode: "queue-only", transport: "none", externalDelivery: false });
      return;
    }

    if (request.method !== "POST" || request.url !== "/actions/queue") {
      sendJson(response, 404, { status: "blocked", detail: "Route not allowed." });
      return;
    }

    readJsonBody(request, (error, body) => {
      if (error) {
        sendJson(response, 400, { status: "blocked", detail: error.message });
        return;
      }

      const result = validateQueueRequest(body);
      if (!result.ok) {
        sendJson(response, 400, { status: "blocked", detail: result.error });
        return;
      }

      store.append(result.entry);
      sendJson(response, 202, {
        accepted: true,
        action: result.entry.action,
        status: result.entry.status,
        transport: result.entry.transport,
        externalDelivery: result.entry.externalDelivery,
        detail: "Checkpoint request queued locally only. No external delivery occurred."
      });
    });
  });
}

if (require.main === module) {
  createBridgeServer().listen(PORT, HOST);
}

module.exports = {
  createBridgeServer
};
