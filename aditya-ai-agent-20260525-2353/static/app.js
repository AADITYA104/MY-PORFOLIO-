const form = document.getElementById("chat-form");
const promptInput = document.getElementById("prompt");
const audienceInput = document.getElementById("audience");
const modeInput = document.getElementById("mode");
const depthInput = document.getElementById("depth");
const languageInput = document.getElementById("language");
const answerFormatInput = document.getElementById("answer-format");
const psychologyModeInput = document.getElementById("psychology-mode");
const objectionsModeInput = document.getElementById("objections-mode");
const researchModeInput = document.getElementById("research-mode");
const sendButton = document.getElementById("send-button");
const clearButton = document.getElementById("clear-button");
const messages = document.getElementById("messages");
const summary = document.getElementById("summary");
const proofGrid = document.getElementById("proof-grid");
const valuePoints = document.getElementById("value-points");
const roleFitGrid = document.getElementById("role-fit-grid");
const contactLinks = document.getElementById("contact-links");
const promptStrip = document.getElementById("prompt-strip");
const engineBadge = document.getElementById("engine-badge");
const statusCopy = document.getElementById("status-copy");
const conversationMeta = document.getElementById("conversation-meta");
const messageTemplate = document.getElementById("message-template");
const promptTemplate = document.getElementById("prompt-template");

const storageKey = "aditya-ai-agent-history";
const settingsKey = "aditya-ai-agent-settings";
const sessionKey = "aditya-ai-agent-session";

const initialMessage = {
  role: "assistant",
  content:
    "Hi, I'm Aditya's AI agent. Ask me why he is strong for a role, how he works, what he has built, or why connecting with him can create real value.",
  meta: "System intro",
};

const sessionId =
  localStorage.getItem(sessionKey) ||
  (window.crypto?.randomUUID ? window.crypto.randomUUID() : `session-${Date.now()}`);

localStorage.setItem(sessionKey, sessionId);

let history = loadHistory();

function loadHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function persistHistory() {
  localStorage.setItem(storageKey, JSON.stringify(history.slice(-10)));
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(settingsKey) || "{}");
    return typeof saved === "object" && saved ? saved : {};
  } catch {
    return {};
  }
}

function persistSettings() {
  localStorage.setItem(
    settingsKey,
    JSON.stringify({
      audience: audienceInput.value,
      mode: modeInput.value,
      depth: depthInput.value,
      language: languageInput.value,
      answerFormat: answerFormatInput.value,
      psychologyMode: psychologyModeInput.checked,
      objectionsMode: objectionsModeInput.checked,
      researchMode: researchModeInput.checked,
    }),
  );
}

function renderConversationMeta(items) {
  conversationMeta.innerHTML = "";
  for (const item of items) {
    const pill = document.createElement("span");
    pill.className = `meta-pill${item.error ? " error-pill" : ""}`;
    pill.textContent = item.label;
    conversationMeta.appendChild(pill);
  }
}

function addMessage(role, text, meta = "", save = true) {
  const fragment = messageTemplate.content.cloneNode(true);
  const article = fragment.querySelector(".message");
  const paragraph = fragment.querySelector("p");
  const metaNode = fragment.querySelector(".message-meta");

  article.classList.add(role);
  paragraph.textContent = text;
  metaNode.textContent = meta || (role === "assistant" ? "Assistant" : "You");
  messages.appendChild(fragment);
  messages.scrollTop = messages.scrollHeight;

  if (save) {
    history.push({ role, content: text, meta });
    history = history.slice(-10);
    persistHistory();
  }
}

function restoreHistory() {
  messages.innerHTML = "";
  if (history.length === 0) {
    addMessage(initialMessage.role, initialMessage.content, initialMessage.meta, false);
    return;
  }

  for (const item of history) {
    addMessage(item.role, item.content, item.meta, false);
  }
}

function renderProfile(profilePayload) {
  const { using_ai, profile } = profilePayload;
  const {
    identity,
    contact,
    professional_summary,
    proof_points,
    value_points,
    suggested_prompts,
    role_fit_matrix,
  } = profile;

  document.title = `${identity.name} AI Agent`;
  summary.textContent = professional_summary;
  engineBadge.textContent = using_ai ? "AI-enhanced" : "Profile-grounded";

  proofGrid.innerHTML = "";
  for (const item of proof_points) {
    const card = document.createElement("article");
    card.className = "proof-card";
    card.innerHTML = `<strong>${item.label}</strong><span>${item.value}</span>`;
    proofGrid.appendChild(card);
  }

  valuePoints.innerHTML = "";
  for (const point of value_points) {
    const block = document.createElement("div");
    block.className = "value-point";
    block.textContent = point;
    valuePoints.appendChild(block);
  }

  roleFitGrid.innerHTML = "";
  for (const item of role_fit_matrix) {
    const card = document.createElement("article");
    card.className = "fit-card";
    card.innerHTML = `<strong>${item.role}</strong><span>${item.why[0]}</span><em>${item.fit} fit</em>`;
    roleFitGrid.appendChild(card);
  }

  contactLinks.innerHTML = `
    <a href="${contact.portfolio}" target="_blank" rel="noreferrer">Portfolio</a>
    <a href="${contact.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
    <a href="${contact.github}" target="_blank" rel="noreferrer">GitHub</a>
    <a href="mailto:${contact.email}">${contact.email}</a>
  `;

  promptStrip.innerHTML = "";
  for (const promptText of suggested_prompts) {
    const chip = promptTemplate.content.firstElementChild.cloneNode(true);
    chip.textContent = promptText;
    chip.addEventListener("click", () => {
      promptInput.value = promptText;
      promptInput.focus();
    });
    promptStrip.appendChild(chip);
  }
}

async function loadProfile() {
  const response = await fetch("/api/profile");
  if (!response.ok) {
    throw new Error("Could not load profile context.");
  }
  return response.json();
}

async function loadHealth() {
  const response = await fetch("/api/health");
  if (!response.ok) {
    throw new Error("Could not load health status.");
  }
  return response.json();
}

function syncStatus(health) {
  engineBadge.textContent = health.apiConfigured ? `${health.model}` : "Profile-grounded";
  statusCopy.textContent = health.apiConfigured
    ? `Live ${health.provider} AI reasoning is available. If the API is unreachable, the app will fall back to profile-grounded answers.`
    : "API key is not configured, so the assistant is running in profile-grounded reasoning mode.";
}

function messageMetaFromResponse(meta) {
  const labels = [meta.engine, meta.intent];
  if (meta.project) {
    labels.push(meta.project);
  } else if (meta.role) {
    labels.push(meta.role);
  } else if (Array.isArray(meta.topics) && meta.topics.length > 0) {
    labels.push(meta.topics.join(" + "));
  }
  return labels.filter(Boolean).join(" / ");
}

async function sendMessage(message, priorHistory) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      message,
      audience: audienceInput.value,
      mode: modeInput.value,
      depth: depthInput.value,
      language: languageInput.value,
      answerFormat: answerFormatInput.value,
      psychologyMode: psychologyModeInput.checked,
      includeObjections: objectionsModeInput.checked,
      researchMode: researchModeInput.checked,
      history: priorHistory,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}

async function clearConversation() {
  await fetch("/api/clear", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = promptInput.value.trim();
  if (!message) {
    return;
  }

  const priorHistory = history.map(({ role, content }) => ({ role, content }));
  addMessage("user", message, "You");
  promptInput.value = "";
  sendButton.disabled = true;
  sendButton.textContent = "Thinking...";
  renderConversationMeta([
    { label: audienceInput.value },
    { label: modeInput.value },
    { label: depthInput.value },
    { label: languageInput.value },
    { label: answerFormatInput.value },
    { label: psychologyModeInput.checked ? "psychology on" : "psychology off" },
    { label: researchModeInput.checked ? "research on" : "research off" },
  ]);

  try {
    const result = await sendMessage(message, priorHistory);
    addMessage("assistant", result.reply, messageMetaFromResponse(result.meta));

    const metaItems = [
      { label: `engine: ${result.meta.engine}` },
      { label: `intent: ${result.meta.intent}` },
    ];
    if (result.meta.role) {
      metaItems.push({ label: `role: ${result.meta.role}` });
    }
    if (result.meta.project) {
      metaItems.push({ label: `project: ${result.meta.project}` });
    }
    if (result.meta.resolvedLanguage) {
      metaItems.push({ label: `language: ${result.meta.resolvedLanguage}` });
    }
    if (result.meta.confidence) {
      metaItems.push({ label: `confidence: ${result.meta.confidence}` });
    }
    if (Array.isArray(result.meta.sources) && result.meta.sources.length > 0) {
      metaItems.push({ label: `sources: ${result.meta.sources.join(", ")}` });
    }
    if (result.meta.fallbackReason) {
      metaItems.push({ label: "AI fallback used", error: true });
    }
    renderConversationMeta(metaItems);
  } catch (error) {
    addMessage("assistant", `Error: ${error.message}`, "System error");
    renderConversationMeta([{ label: "Request failed", error: true }]);
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = "Send";
    promptInput.focus();
  }
});

clearButton.addEventListener("click", async () => {
  history = [];
  persistHistory();
  await clearConversation();
  restoreHistory();
  renderConversationMeta([{ label: "Conversation cleared" }]);
  promptInput.focus();
});

promptInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

for (const input of [
  audienceInput,
  modeInput,
  depthInput,
  languageInput,
  answerFormatInput,
  psychologyModeInput,
  objectionsModeInput,
  researchModeInput,
]) {
  input.addEventListener("change", persistSettings);
}

async function init() {
  const settings = loadSettings();
  audienceInput.value = settings.audience || audienceInput.value;
  modeInput.value = settings.mode || modeInput.value;
  depthInput.value = settings.depth || depthInput.value;
  languageInput.value = settings.language || languageInput.value;
  answerFormatInput.value = settings.answerFormat || answerFormatInput.value;
  psychologyModeInput.checked =
    settings.psychologyMode !== undefined ? settings.psychologyMode : psychologyModeInput.checked;
  objectionsModeInput.checked =
    settings.objectionsMode !== undefined ? settings.objectionsMode : objectionsModeInput.checked;
  researchModeInput.checked =
    settings.researchMode !== undefined ? settings.researchMode : researchModeInput.checked;

  restoreHistory();

  try {
    const [profilePayload, health] = await Promise.all([loadProfile(), loadHealth()]);
    renderProfile(profilePayload);
    syncStatus(health);
  } catch (error) {
    addMessage("assistant", `Startup error: ${error.message}`, "System error", false);
    renderConversationMeta([{ label: "Startup issue", error: true }]);
  }
}

init();
