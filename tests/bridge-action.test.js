"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

function loadBridge() {
  const context = vm.createContext({ window: {} });
  const source = fs.readFileSync(path.join(__dirname, "..", "bridge.js"), "utf8");
  vm.runInContext(source, context);
  return context.window.MissionControlBridge;
}

test("bridge is frontend-only local mock with no transport", () => {
  const bridge = loadBridge();
  assert.equal(bridge.config.mode, "local/mock");
  assert.equal(bridge.config.enabled, false);
  assert.equal(bridge.config.transport, "none");
  assert.equal(bridge.config.endpoint, null);
});

test("unknown action is rejected", () => {
  const result = loadBridge().dispatch("unknown_action", { cardId: "card-1", cardTitle: "Review" });
  assert.equal(result.accepted, false);
  assert.equal(result.status, "blocked");
  assert.equal(result.transport, "none");
  assert.equal(result.externalDelivery, false);
});

test("Ask Eva checkpoint creates local mock result only", () => {
  const result = loadBridge().dispatch("ask_eva_checkpoint", {
    cardId: "checkpoint-card",
    cardTitle: "Review"
  });
  assert.equal(result.accepted, true);
  assert.equal(result.mode, "local/mock");
  assert.equal(result.status, "local_mock");
  assert.equal(result.transport, "none");
  assert.equal(result.externalDelivery, false);
  assert.match(result.detail, /local UI and audit event only/);
});

test("local mock payload labels are sanitized", () => {
  const result = loadBridge().dispatch("ask_eva_checkpoint", {
    cardId: "checkpoint-card",
    cardTitle: "Review secret token metadata"
  });
  assert.equal(result.payload.cardTitle.includes("secret"), false);
  assert.equal(result.payload.cardTitle.includes("token"), false);
});
