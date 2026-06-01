"use strict";

const REDACTED_LABEL = "[redacted-label]";
const REDACTED_VALUE = "[redacted-value]";
const SENSITIVE_LABEL = /token|secret|password|cookie|private.?key|api.?key|authorization|webhook|database.?id|endpoint|url|command|shell|bash|python|file.?path/gi;
const LONG_VALUE = /[A-Za-z0-9_-]{24,}/g;

function sanitizeText(value, maxLength) {
  return String(value)
    .replace(SENSITIVE_LABEL, REDACTED_LABEL)
    .replace(LONG_VALUE, REDACTED_VALUE)
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeCheckpointPayload(payload) {
  return {
    cardId: sanitizeText(payload.cardId, 180),
    cardTitle: sanitizeText(payload.cardTitle, 180)
  };
}

module.exports = {
  sanitizeCheckpointPayload,
  sanitizeText
};
