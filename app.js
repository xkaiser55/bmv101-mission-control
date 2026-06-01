(function () {
  "use strict";

  const STORAGE_KEY = "bmv101MissionControlState";
  const AUDIT_KEY = "bmv101MissionControlAudit";
  const UPLOAD_KEY = "bmv101MissionControlUploads";

  const pages = [
    ["dashboard", "Dashboard Home"],
    ["kanban", "Kanban Board"],
    ["owner", "Owner Tasks"],
    ["agentTasks", "Agent Tasks"],
    ["agents", "Agents"],
    ["tools", "Tools"],
    ["integrations", "Integrations"],
    ["status", "Notion + LinkedIn Status"],
    ["audit", "Audit Logs"],
    ["upload", "Mobile Upload Area"],
    ["settings", "Settings / Safety Rules"]
  ];

  const kanbanColumns = [
    "Inbox",
    "Planned",
    "Assigned to Agent",
    "In Progress",
    "Waiting on Owner",
    "Ready for Review",
    "Safe Auto-Update Ready",
    "Done",
    "Blocked",
    "Archived"
  ];

  const agents = [
    {
      name: "Eva",
      role: "Supervisor / chief-of-staff / checkpoint / backup",
      status: "Checkpoint ready",
      lane: "Safety oversight"
    },
    {
      name: "Mia",
      role: "BMV101 routine operator and lead manager",
      status: "Available for local mock tasks",
      lane: "Routine operations"
    },
    {
      name: "Rowan",
      role: "Planning worker",
      status: "Planning queue clear",
      lane: "Plan shaping"
    },
    {
      name: "Leo",
      role: "Packaging/draft worker",
      status: "Draft support ready",
      lane: "Packaging"
    },
    {
      name: "Miles",
      role: "KPI/reporting worker",
      status: "Reporting dry-runs only",
      lane: "Metrics"
    },
    {
      name: "Nina",
      role: "Read-only research / authority scout",
      status: "Read-only mock mode",
      lane: "Research"
    }
  ];

  const seedCards = [
    {
      id: "bmv101_linkedin_metrics_dry_run_registration",
      title: "LinkedIn metrics dry-run registration",
      owner: "Owner",
      agent: "Miles",
      column: "Planned",
      priority: "High",
      status: "Dry-run only",
      description: "Register a safe local-only dry-run for LinkedIn post metrics."
    },
    {
      id: "bmv101_linkedin_metrics_auto_update_from_file",
      title: "LinkedIn metrics auto-update from file",
      owner: "Owner",
      agent: "Mia",
      column: "Safe Auto-Update Ready",
      priority: "Medium",
      status: "Mock auto-apply only",
      description: "Prepare a local mock auto-update path from an uploaded analytics file."
    },
    {
      id: "owner_review_metrics_mapping",
      title: "Owner review metrics mapping",
      owner: "Owner",
      agent: "Eva",
      column: "Waiting on Owner",
      priority: "Medium",
      status: "Needs visual approval",
      description: "Confirm plain-English mapping labels before any future live workflow."
    },
    {
      id: "routine_manager_checklist",
      title: "BMV101 routine manager checklist",
      owner: "Mia",
      agent: "Mia",
      column: "Assigned to Agent",
      priority: "Low",
      status: "Local checklist",
      description: "Create local checklist events for routine operating cadence."
    },
    {
      id: "blocked_live_notion_write",
      title: "Live Notion write path",
      owner: "Eva",
      agent: "Eva",
      column: "Blocked",
      priority: "High",
      status: "Blocked by safety rules",
      description: "No live Notion writes are allowed in this prototype."
    }
  ];

  const tools = [
    {
      category: "Safe read-only",
      tone: "safe",
      items: ["View mock tasks", "View sanitized audit logs", "Review safety rules", "Preview local status"]
    },
    {
      category: "Dry-run only",
      tone: "info",
      items: ["Run LinkedIn metrics dry-run", "Create mock checkpoint", "Simulate owner review event"]
    },
    {
      category: "Auto-apply allowed under strict rules",
      tone: "warn",
      items: ["Local task status update", "Local sanitized audit log entry", "Local upload metadata capture"]
    },
    {
      category: "Blocked / future only",
      tone: "danger",
      items: ["Live Notion writes", "Discord webhooks", "Hostinger publish", "Cloudflare changes", "OpenClaw production edits"]
    },
    {
      category: "Unknown / needs inspection",
      tone: "warn",
      items: ["Any new external integration", "Any credentialed workflow", "Any workflow that changes live data"]
    }
  ];

  const safeControls = [
    ["Send to Mia", "Assigns a local mock task event to Mia."],
    ["Ask Eva for checkpoint", "Creates a local checkpoint request event."],
    ["Run dry-run", "Creates a local dry-run event only."],
    ["Upload analytics file", "Opens the local metadata-only upload area."],
    ["Mark done", "Moves the selected mock item to Done."],
    ["Mark blocked", "Moves the selected mock item to Blocked."]
  ];

  const blockedControls = [
    "Terminal or shell runner",
    "Python runner",
    "Raw file editor",
    "Schema editor",
    "Delete or cleanup controls",
    "Publishing controls",
    "Scheduling controls",
    "Amazon workflows",
    "Unverified live-write buttons"
  ];

  const app = document.querySelector("#app");
  const sideNav = document.querySelector("#sideNav");
  const mobilePageSelect = document.querySelector("#mobilePageSelect");
  const bridge = window.MissionControlBridge;

  let activePage = "dashboard";
  let state = loadState();
  let auditLog = loadJson(AUDIT_KEY, []).map(normalizeRecord);
  let uploads = loadJson(UPLOAD_KEY, []).map(normalizeRecord);

  function loadJson(key, fallback) {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function loadState() {
    const stored = loadJson(STORAGE_KEY, null);
    if (stored && Array.isArray(stored.cards) && Array.isArray(stored.events)) {
      return {
        cards: stored.cards.map(normalizeRecord),
        events: stored.events.map(normalizeRecord)
      };
    }

    return {
      cards: seedCards,
      events: [
        {
          time: timestamp(),
          cardId: "bmv101_linkedin_metrics_dry_run_registration",
          label: "Prototype seeded",
          detail: "Local mock workflow card created."
        }
      ]
    };
  }

  function normalizeBrandText(value) {
    return typeof value === "string" ? value.replace(/Linkedl(?=n)/g, "LinkedI") : value;
  }

  function normalizeRecord(record) {
    if (!record || typeof record !== "object") {
      return record;
    }

    return Object.fromEntries(
      Object.entries(record).map(([key, value]) => [key, normalizeBrandText(value)])
    );
  }

  function saveState() {
    saveJson(STORAGE_KEY, state);
  }

  function timestamp() {
    return new Date().toISOString();
  }

  function sanitize(input) {
    return String(input)
      .replace(/token|secret|password|cookie|private key|api key|webhook|database id/gi, "[redacted-label]")
      .replace(/[A-Za-z0-9_-]{24,}/g, "[redacted-value]");
  }

  function audit(action, detail) {
    const entry = {
      time: timestamp(),
      action: sanitize(action),
      detail: sanitize(detail),
      scope: "local mock only"
    };
    auditLog = [entry, ...auditLog].slice(0, 60);
    saveJson(AUDIT_KEY, auditLog);
  }

  function addEvent(cardId, label, detail) {
    const event = {
      time: timestamp(),
      cardId,
      label: sanitize(label),
      detail: sanitize(detail)
    };
    state.events = [event, ...state.events].slice(0, 80);
    saveState();
    audit(label, detail);
  }

  function updateCard(cardId, updates, label, detail) {
    state.cards = state.cards.map((card) => {
      if (card.id !== cardId) {
        return card;
      }
      return { ...card, ...updates };
    });
    saveState();
    addEvent(cardId, label, detail);
    render();
  }

  function navigate(pageId) {
    activePage = pageId;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderNav() {
    const navMarkup = pages
      .map(([id, label]) => `<button type="button" class="${id === activePage ? "active" : ""}" data-page="${id}">${label}</button>`)
      .join("");
    sideNav.innerHTML = navMarkup;
    mobilePageSelect.innerHTML = pages
      .map(([id, label]) => `<option value="${id}" ${id === activePage ? "selected" : ""}>${label}</option>`)
      .join("");
  }

  function render() {
    renderNav();
    const pageRenderers = {
      dashboard: renderDashboard,
      kanban: renderKanban,
      owner: renderOwnerTasks,
      agentTasks: renderAgentTasks,
      agents: renderAgents,
      tools: renderTools,
      integrations: renderIntegrations,
      status: renderStatus,
      audit: renderAudit,
      upload: renderUpload,
      settings: renderSettings
    };

    app.innerHTML = pageRenderers[activePage]();
    bindPageActions();
  }

  function pageHeader(title, description, tag) {
    return `
      <div class="page-header">
        <div>
          <p class="eyebrow">${tag || "Local Prototype"}</p>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
        <span class="tag safe">No live writes</span>
      </div>
    `;
  }

  function renderDashboard() {
    const ownerTasks = state.cards.filter((card) => card.owner === "Owner" || card.column === "Waiting on Owner").slice(0, 4);
    const activeAgentTasks = state.cards.filter((card) => !["Done", "Blocked", "Archived"].includes(card.column));
    const blockedItems = state.cards.filter((card) => card.column === "Blocked");
    const recentWins = state.cards.filter((card) => card.column === "Done");
    const nextAction = ownerTasks[0] || activeAgentTasks[0];

    return `
      ${pageHeader("Dashboard Home", "A local-only control room for BMV101 workflows, mock task events, and safety checkpoints.", "BMV101 / OpenClaw")}
      <section class="grid four">
        ${metricCard(ownerTasks.length, "Today's owner tasks")}
        ${metricCard(activeAgentTasks.length, "Active agent tasks")}
        ${metricCard(blockedItems.length, "Blocked items")}
        ${metricCard(auditLog.length, "Sanitized audit entries")}
      </section>
      <section class="grid two">
        ${panel("Today's Owner Tasks", renderCards(ownerTasks, "Owner View"))}
        ${panel("Active Agent Tasks", renderCards(activeAgentTasks.slice(0, 5), "Agent View"))}
        ${panel("Blocked Items", blockedItems.length ? renderCards(blockedItems, "Safety View") : emptyState("No blocked mock tasks right now."))}
        ${panel("Recent Wins", recentWins.length ? renderCards(recentWins, "Completed View") : emptyState("Wins will appear after a task is marked done."))}
      </section>
      <section class="grid three">
        ${statusPanel("LinkedIn Post Metrics", "Dry-run only", "No LinkedIn connection. Uploads capture metadata only.", "info")}
        ${statusPanel("Notion Connection", "Disconnected", "No Notion API calls or live writes.", "danger")}
        ${statusPanel("Next Safest Action", nextAction ? nextAction.title : "Review safety settings", nextAction ? "Use a local mock action button only." : "Confirm guardrails before adding features.", "safe")}
      </section>
      <section class="grid two">
        ${panel("Safe Tools Available", renderSimpleList(tools.slice(0, 3).flatMap((tool) => tool.items.slice(0, 2))))}
        ${panel("Tools Blocked", renderSimpleList(blockedControls))}
        ${panel("Recent Checkpoints", renderEvents(state.events.slice(0, 5)))}
        ${panel("Prototype Actions", renderActionDeck(state.cards[0].id))}
      </section>
    `;
  }

  function metricCard(value, label) {
    return `<div class="metric-card"><strong>${value}</strong><span>${label}</span></div>`;
  }

  function statusPanel(title, status, detail, tone) {
    return `
      <article class="panel status-card">
        <span class="tag ${tone} status-badge">${status}</span>
        <h3>${title}</h3>
        <p class="muted">${detail}</p>
      </article>
    `;
  }

  function panel(title, body) {
    return `
      <section class="panel">
        <h3>${title}</h3>
        ${body}
      </section>
    `;
  }

  function renderCards(cards, viewLabel) {
    if (!cards.length) {
      return emptyState("No matching mock cards.");
    }

    return `
      <ul class="list">
        ${cards.map((card) => renderCardItem(card, viewLabel)).join("")}
      </ul>
    `;
  }

  function renderCardItem(card, viewLabel) {
    return `
      <li class="list-item">
        <div class="item-top">
          <div>
            <div class="meta-row compact-meta">
              ${viewLabel ? `<span class="tag safe view-chip">${viewLabel}</span>` : ""}
              <span class="pill">Owner: ${card.owner}</span>
              <span class="pill">Agent: ${card.agent}</span>
            </div>
            <p class="item-title">${card.title}</p>
          </div>
          <span class="tag ${toneForStatus(card.status)}">${card.column}</span>
        </div>
        <p class="muted">${card.description}</p>
        <div class="meta-row">
          <span class="pill">Priority: ${card.priority}</span>
          <span class="pill">${card.status}</span>
        </div>
        ${renderActionDeck(card.id)}
      </li>
    `;
  }

  function toneForStatus(status) {
    if (/blocked|disconnected/i.test(status)) {
      return "danger";
    }
    if (/dry|mock|review/i.test(status)) {
      return "info";
    }
    return "safe";
  }

  function renderActionDeck(cardId) {
    return `
      <div class="action-group" data-card-actions="${cardId}">
        <div class="button-row primary-actions" aria-label="Primary local actions">
          <button class="ghost-btn" type="button" data-action="send-mia">Send to Mia</button>
          <button class="ghost-btn" type="button" data-action="eva-checkpoint">Ask Eva for checkpoint</button>
          <button class="primary-btn" type="button" data-action="dry-run">Run dry-run</button>
        </div>
        <div class="button-row secondary-actions" aria-label="Secondary local actions">
          <button class="subtle-btn" type="button" data-action="upload">Upload analytics file</button>
          <button class="subtle-btn" type="button" data-action="done">Mark done</button>
          <button class="subtle-btn caution" type="button" data-action="blocked">Mark blocked</button>
        </div>
      </div>
    `;
  }

  function renderKanban() {
    return `
      ${pageHeader("Kanban Board", "All columns are local mock workflow lanes. Button actions only update local task events and audit logs.", "Workflow")}
      <section class="kanban" aria-label="Kanban board">
        ${kanbanColumns.map(renderKanbanColumn).join("")}
      </section>
    `;
  }

  function renderKanbanColumn(column) {
    const cards = state.cards.filter((card) => card.column === column);
    return `
      <section class="kanban-column">
        <h3>${column}<span class="pill">${cards.length}</span></h3>
        ${cards.length ? cards.map(renderKanbanCard).join("") : emptyState("No cards in this lane.")}
      </section>
    `;
  }

  function renderKanbanCard(card) {
    return `
      <article class="kanban-card">
        <strong>${card.title}</strong>
        <p class="muted">${card.description}</p>
        <div class="meta-row">
          <span class="pill">${card.agent}</span>
          <span class="pill">${card.priority}</span>
        </div>
        <div class="meta-row compact-meta">
          <span class="tag info view-chip">Kanban View</span>
          <span class="pill">Owner: ${card.owner}</span>
        </div>
        ${renderActionDeck(card.id)}
      </article>
    `;
  }

  function renderOwnerTasks() {
    const cards = state.cards.filter((card) => card.owner === "Owner" || card.column === "Waiting on Owner");
    return `
      ${pageHeader("Owner Tasks", "Only final approval, visual review, login, MFA, billing, admin, security, and deployment confirmation belong here.", "Owner Review")}
      ${renderCards(cards, "Owner View")}
    `;
  }

  function renderAgentTasks() {
    const cards = state.cards.filter((card) => card.owner !== "Owner");
    return `
      ${pageHeader("Agent Tasks", "Codex and named agents handle implementation, structure, tests, checks, summaries, self-audits, and docs.", "Agent Work")}
      ${renderCards(cards, "Agent View")}
    `;
  }

  function renderAgents() {
    return `
      ${pageHeader("Agents", "Seeded local roles for BMV101 operations. These are mock assignments, not live external workers.", "Roster")}
      <section class="grid three">
        ${agents.map((agent) => `
          <article class="card">
            <div class="meta-row">
              <span class="agent-avatar">${agent.name.charAt(0)}</span>
              <div>
                <h3>${agent.name}</h3>
                <p class="muted">${agent.lane}</p>
              </div>
            </div>
            <p>${agent.role}</p>
            <span class="tag safe">${agent.status}</span>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderTools() {
    return `
      ${pageHeader("Tools", "Tool categories show what is safe now, what is dry-run only, and what remains blocked.", "Safety Controls")}
      <section class="grid two">
        ${tools.map((tool) => `
          <article class="panel tool-category ${tool.tone}">
            <span class="tag ${tool.tone}">${tool.category}</span>
            ${renderSimpleList(tool.items)}
          </article>
        `).join("")}
      </section>
      <section class="panel">
        <h3>Prototype Buttons</h3>
        <div class="grid two">
          ${safeControls.map(([label, detail]) => `
            <div class="list-item">
              <p class="item-title">${label}</p>
              <p class="muted">${detail}</p>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderIntegrations() {
    return `
      ${pageHeader("Integrations", "Every external integration is disconnected or blocked in this phase.", "External Services")}
      <section class="grid two">
        ${integrationCard("Notion", "Disconnected", "No API calls, no database IDs, no writes.", "danger")}
        ${integrationCard("Hostinger", "Disconnected", "No hosting connection or publishing controls.", "danger")}
        ${integrationCard("Cloudflare", "Disconnected", "No DNS, routing, worker, or security changes.", "danger")}
        ${integrationCard("OpenClaw Production", "Disconnected", "No production files or live systems touched.", "danger")}
        ${integrationCard("Discord Webhooks", "Not used yet", "No webhook URLs requested, stored, or called.", "warn")}
        ${integrationCard("LinkedIn", "Mock status only", "No LinkedIn API connection. Upload UI stores metadata only.", "info")}
      </section>
    `;
  }

  function integrationCard(name, status, detail, tone) {
    return `
      <article class="card">
        <span class="tag ${tone}">${status}</span>
        <h3>${name}</h3>
        <p class="muted">${detail}</p>
      </article>
    `;
  }

  function renderStatus() {
    return `
      ${pageHeader("Notion + LinkedIn Status", "A plain local status page for disconnected Notion and mock LinkedIn metrics readiness.", "Readiness")}
      <section class="grid two">
        ${statusPanel("Notion", "Disconnected", "No Notion connection, live write, database ID, or API credential is present.", "danger")}
        ${statusPanel("LinkedIn Post Metrics", "File metadata only", "CSV/XLS/XLSX uploads are captured as local metadata only. No parsing or Notion updates occur.", "info")}
      </section>
      ${panel("LinkedIn Metrics Workflow Cards", renderCards(state.cards.filter((card) => /linkedin/i.test(card.id)), "Metrics View"))}
    `;
  }

  function renderAudit() {
    return `
      ${pageHeader("Audit Logs", "Sanitized local-only entries created by prototype buttons and upload metadata events.", "Safety Record")}
      <section class="panel">
        <h3>Sanitized Entries</h3>
        ${auditLog.length ? `
          <div class="grid">
            ${auditLog.map((entry) => `
              <article class="audit-entry">
                <strong>${entry.action}</strong>
                <span class="muted">${entry.time} | ${entry.scope}</span>
                <code>${entry.detail}</code>
              </article>
            `).join("")}
          </div>
        ` : emptyState("No audit entries yet. Use a prototype action to create one.")}
      </section>
    `;
  }

  function renderUpload() {
    return `
      ${pageHeader("Mobile Upload Area", "Upload UI for CSV/XLS/XLSX metadata only. Files are not parsed, sent, or used to update Notion.", "Local Upload")}
      <section class="upload-box">
        <h3>Analytics File Metadata</h3>
        <p class="muted">Choose a CSV, XLS, or XLSX file to create a local metadata event. The prototype records name, type, size, and timestamp only.</p>
        <input id="analyticsUpload" type="file" accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <span class="tag info">No parsing. No upload to external services.</span>
      </section>
      <section class="panel">
        <h3>Local Upload Metadata</h3>
        ${uploads.length ? renderSimpleList(uploads.map((file) => `${file.name} | ${file.sizeLabel} | ${file.time}`)) : emptyState("No local file metadata captured yet.")}
      </section>
    `;
  }

  function renderSettings() {
    const bridgeStatus = bridge && bridge.config ? `${bridge.config.mode} / ${bridge.config.enabled ? "enabled" : "disabled"}` : "unavailable";
    const bridgeTransport = bridge && bridge.config ? bridge.config.transport : "unavailable";
    return `
      ${pageHeader("Settings / Safety Rules", "Current prototype rules and blocked capabilities. These settings are informational only.", "Safety")}
      <section class="grid two">
        ${panel("Local-Only Rules", renderSimpleList([
          "Use mock data only.",
          "Do not connect to Notion, Hostinger, Cloudflare, OpenClaw production, or Discord webhooks.",
          "Do not ask for secrets or create a real .env file.",
          "All action buttons create local task events and sanitized audit logs only.",
          "Owner review uses plain English, screenshots, previews, and final approvals."
        ]))}
        ${panel("Dangerous Controls Blocked", renderSimpleList(blockedControls))}
        ${panel("App Install", renderSimpleList([
          "On phone, open the browser menu and choose Add to Home Screen when available.",
          "The shortcut uses standalone app mode where the browser supports it.",
          "Private Tailscale mode stays in place. Public HTTPS is not required for this prototype phase."
        ]))}
        ${panel("Structured Bridge", renderSimpleList([
          `Bridge status: ${bridgeStatus}.`,
          `External transport: ${bridgeTransport}.`,
          "Allowed actions are fixed and recorded locally only.",
          "No OpenClaw endpoint, Discord webhook, token, or external transport is configured."
        ]))}
      </section>
      <section class="panel">
        <h3>Blocked Control Preview</h3>
        <div class="button-row">
          ${blockedControls.slice(0, 6).map((label) => `<span class="blocked-note">${label}</span>`).join("")}
        </div>
      </section>
    `;
  }

  function renderSimpleList(items) {
    return `
      <ul class="list">
        ${items.map((item) => `<li class="list-item">${item}</li>`).join("")}
      </ul>
    `;
  }

  function renderEvents(events) {
    if (!events.length) {
      return emptyState("No checkpoint events yet.");
    }

    return renderSimpleList(events.map((event) => `${event.label}: ${event.detail}`));
  }

  function emptyState(message) {
    return `<div class="empty-state"><p>${message}</p></div>`;
  }

  function bindPageActions() {
    document.querySelectorAll("[data-page]").forEach((button) => {
      button.addEventListener("click", () => navigate(button.dataset.page));
    });

    document.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        const actionWrap = button.closest("[data-card-actions]");
        const cardId = actionWrap ? actionWrap.dataset.cardActions : state.cards[0].id;
        handleAction(button.dataset.action, cardId);
      });
    });

    mobilePageSelect.onchange = () => navigate(mobilePageSelect.value);

    const uploadInput = document.querySelector("#analyticsUpload");
    if (uploadInput) {
      uploadInput.addEventListener("change", handleUpload);
    }
  }

  function handleAction(action, cardId) {
    const card = state.cards.find((item) => item.id === cardId) || state.cards[0];
    const handlers = {
      "send-mia": () => runStructuredAction("send_to_mia", card, () => updateCard(card.id, { agent: "Mia", column: "Assigned to Agent", status: "Assigned locally" }, "Sent to Mia", `${card.title} assigned to Mia as a local mock event.`)),
      "eva-checkpoint": () => runStructuredAction("ask_eva_checkpoint", card, () => addEvent(card.id, "Eva checkpoint requested", `${card.title} needs a local supervisor checkpoint.`)),
      "dry-run": () => runStructuredAction("run_linkedin_metrics_dry_run", card, () => updateCard(card.id, { column: "In Progress", status: "Dry-run logged" }, "Dry-run created", `${card.title} dry-run event created locally only.`)),
      "upload": () => runStructuredAction("upload_linkedin_analytics_file_metadata_only", card, () => {
        addEvent(card.id, "Upload area opened", `${card.title} opened the local metadata-only upload area.`);
        navigate("upload");
      }),
      "done": () => runStructuredAction("mark_task_done_local", card, () => updateCard(card.id, { column: "Done", status: "Completed locally" }, "Marked done", `${card.title} marked done in the local prototype.`)),
      "blocked": () => runStructuredAction("mark_task_blocked_local", card, () => updateCard(card.id, { column: "Blocked", status: "Blocked locally" }, "Marked blocked", `${card.title} marked blocked in the local prototype.`))
    };

    handlers[action]();
  }

  function runStructuredAction(action, card, onAccepted) {
    const result = bridge.dispatch(action, { cardId: card.id, cardTitle: card.title });
    audit("Structured bridge mock", `${result.action} recorded in ${result.status} mode. No external transport used.`);

    if (!result.accepted) {
      addEvent(card.id, "Structured action blocked", result.detail);
      return;
    }

    onAccepted();
  }

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const isAllowed = /\.(csv|xls|xlsx)$/i.test(file.name);
    const metadata = {
      name: sanitize(file.name),
      sizeLabel: `${Math.round(file.size / 1024)} KB`,
      type: sanitize(file.type || "unknown"),
      time: timestamp()
    };

    if (!isAllowed) {
      addEvent(state.cards[0].id, "Upload rejected", `${metadata.name} was rejected because only CSV, XLS, and XLSX metadata is allowed.`);
      event.target.value = "";
      render();
      return;
    }

    uploads = [metadata, ...uploads].slice(0, 20);
    saveJson(UPLOAD_KEY, uploads);
    bridge.dispatch("upload_linkedin_analytics_file_metadata_only", { fileName: metadata.name, fileType: metadata.type, fileSize: metadata.sizeLabel });
    addEvent(state.cards[1].id, "Upload metadata captured", `${metadata.name} metadata captured locally. File not parsed and no Notion update performed.`);
    render();
  }

  render();
})();
