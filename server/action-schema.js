"use strict";

const { sanitizeCheckpointPayload } = require("./sanitize-audit");

const ALLOWED_ACTION = "ask_eva_checkpoint";
const TOP_LEVEL_FIELDS = Object.freeze(["action", "payload"]);
const PAYLOAD_FIELDS = Object.freeze(["cardId", "cardTitle"]);

function hasExactFields(value, allowedFields) {
  const keys = Object.keys(value);
  return keys.length === allowedFields.length && keys.every((key) => allowedFields.includes(key));
}

function validateQueueRequest(input) {
  if (!input || typeof input !== "object" || Array.isArray(input) || !hasExactFields(input, TOP_LEVEL_FIELDS)) {
    return { ok: false, error: "Request rejected. Only the fixed local queue action shape is allowed." };
  }

  if (input.action !== ALLOWED_ACTION) {
    return { ok: false, error: "Request rejected. Action is not allowed by the local queue scaffold." };
  }

  if (!input.payload || typeof input.payload !== "object" || Array.isArray(input.payload) || !hasExactFields(input.payload, PAYLOAD_FIELDS)) {
    return { ok: false, error: "Request rejected. Extra or missing payload fields are not allowed." };
  }

  if (!PAYLOAD_FIELDS.every((key) => typeof input.payload[key] === "string" && input.payload[key].length > 0 && input.payload[key].length <= 180)) {
    return { ok: false, error: "Request rejected. Payload values must be short non-empty text." };
  }

  return {
    ok: true,
    entry: {
      time: new Date().toISOString(),
      action: ALLOWED_ACTION,
      payload: sanitizeCheckpointPayload(input.payload),
      status: "queued_local",
      transport: "none",
      externalDelivery: false
    }
  };
}

module.exports = {
  ALLOWED_ACTION,
  validateQueueRequest
};
