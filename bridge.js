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
    mode: "mock",
    enabled: false,
    transport: "none",
    endpoint: null,
    reason: "No approved structured OpenClaw or Discord task endpoint is configured."
  });

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
