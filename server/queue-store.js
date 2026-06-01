"use strict";

const fs = require("node:fs");
const path = require("node:path");

function appendJsonLine(filePath, value) {
  fs.appendFileSync(filePath, `${JSON.stringify(value)}\n`, { encoding: "utf8", mode: 0o600 });
}

function createQueueStore(dataDirectory = "/data") {
  fs.mkdirSync(dataDirectory, { recursive: true, mode: 0o700 });

  const queuePath = path.join(dataDirectory, "checkpoint-queue.jsonl");
  const auditPath = path.join(dataDirectory, "checkpoint-audit.jsonl");

  return Object.freeze({
    append(entry) {
      appendJsonLine(queuePath, entry);
      appendJsonLine(auditPath, {
        time: entry.time,
        action: entry.action,
        status: entry.status,
        transport: entry.transport,
        externalDelivery: entry.externalDelivery,
        detail: "Sanitized checkpoint request queued locally only. No external delivery occurred."
      });
    }
  });
}

module.exports = {
  createQueueStore
};
