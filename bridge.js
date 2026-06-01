(function () {
  "use strict";

  const SUPPORTED_ACTIONS = Object.freeze([
    "ask_eva_checkpoint",
    "send_to_mia",
    "run_linkedin_metrics_dry_run",
    "upload_linkedin_analytics_file_metadata_only",
    "mark_task_done_local",
    "mark_task_blocked_local"
  ]);

  const SAFE_CONFIG = Object.freeze({
    mode: "queue-only",
    enabled: false,
    transport: "none",
    endpoint: null,
    queueEndpoint: "/api/actions/queue",
    reason: "Local queue scaffold only. No approved OpenClaw or Discord delivery transport is configured."
  });

  const QUEUE_ONLY_ACTION = "ask_eva_checkpoint";
  const CHECKPOINT_PAYLOAD_FIELDS = Object.freeze(["cardId", "cardTitle"]);
  const DANGEROUS_FIELD = /token|secret|password|cookie|private.?key|api.?key|authorization|webhook|endpoint|url|command|shell|bash|python|file.?path/i;

  function sanitizeValue(value) {
    return String(value)
      .replace(/token|secret|password|cookie|private key|api key|webhook|database id/gi, "[redacted-label]")
      .replace(/[A-Za-z0-9_-]{24,}/g, "[redacted-value]");
  }

  function sanitizePayload(payload) {
    return Object.fromEntries(
      Object.entries(payload || {}).map(([key, value]) => [sanitizeValue(key), sanitizeValue(value)])
    );
  }

  function validateCheckpointPayload(payload) {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return false;
    }

    const keys = Object.keys(payload);
    return keys.length === CHECKPOINT_PAYLOAD_FIELDS.length
      && keys.every((key) => CHECKPOINT_PAYLOAD_FIELDS.includes(key) && !DANGEROUS_FIELD.test(key))
      && CHECKPOINT_PAYLOAD_FIELDS.every((key) => typeof payload[key] === "string" && payload[key].length > 0 && payload[key].length <= 180);
  }

  function queueCheckpoint(payload) {
    fetch(SAFE_CONFIG.queueEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: QUEUE_ONLY_ACTION,
        payload: sanitizePayload(payload)
      }),
      credentials: "same-origin",
      cache: "no-store"
    }).catch(() => {
      // The local UI remains in mock mode if the internal queue sidecar is unavailable.
    });
  }

  function dispatch(action, payload) {
    if (!SUPPORTED_ACTIONS.includes(action)) {
      return Object.freeze({
        accepted: false,
        mode: SAFE_CONFIG.mode,
        status: "blocked",
        action: sanitizeValue(action),
        detail: "Action is not in the structured bridge allowlist."
      });
    }

    if (action === QUEUE_ONLY_ACTION) {
      if (!validateCheckpointPayload(payload)) {
        return Object.freeze({
          accepted: false,
          mode: SAFE_CONFIG.mode,
          status: "blocked",
          action,
          detail: "Checkpoint request rejected because its local queue payload was not allowed."
        });
      }

      queueCheckpoint(payload);
      return Object.freeze({
        accepted: true,
        mode: SAFE_CONFIG.mode,
        status: "local_mock",
        action,
        payload: sanitizePayload(payload),
        detail: "Checkpoint request sent to the local queue scaffold only. No external delivery occurred."
      });
    }

    return Object.freeze({
      accepted: true,
      mode: SAFE_CONFIG.mode,
      status: "local_mock",
      action,
      payload: sanitizePayload(payload),
      detail: "Structured action recorded locally only. No external transport is configured."
    });
  }

  window.MissionControlBridge = Object.freeze({
    config: SAFE_CONFIG,
    supportedActions: SUPPORTED_ACTIONS,
    dispatch
  });
})();
