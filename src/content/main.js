import { createApp } from "vue";
import App from "./App.vue";

const LOG_ENHANCER_LOCK = "log-enhancer-lock";
let cachedLogs;
let app;

function initialize() {
  const lockQuery = document.head.querySelectorAll(`[${LOG_ENHANCER_LOCK}]`);

  if (lockQuery.length > 0) {
    const dateTime = lockQuery[0].getAttribute(LOG_ENHANCER_LOCK);
    console.warn(
      `${LOG_ENHANCER_LOCK} found, app already initialized at ${dateTime}. No operation`
    );
    return;
  }

  const lockElement = document.createElement("meta");
  lockElement.setAttribute(LOG_ENHANCER_LOCK, new Date().toISOString());
  document.head.appendChild(lockElement);

  initializeStyle();
  // Warm the cachedLogs
  retrieveLogs();

  app = createApp(App).mount("pre");

  chrome.runtime.onMessage.addListener((request) => {
    const { highlights, removes } = request || {
      highlights: [],
      removes: [],
    };
    const logs = retrieveLogs();

    resetLogs(logs);

    applyHighlightsAndRemoves(logs, highlights, removes);

    app.setLogs(logs);
  });
}

function retrieveLogs() {
  if (cachedLogs) {
    return cachedLogs.slice();
  }
  const logContainers = document.getElementsByTagName("pre");
  if (logContainers.length === 0) {
    const errorMessage = "No pre element found, throwing error";
    throw new Error(errorMessage);
  }
  const logContainer = logContainers[0];
  cachedLogs = logContainer.textContent.split("\n").map((text) => {
    return {
      text,
      style: {},
      class: {},
    };
  });
  return cachedLogs;
}

function resetLogs(logs) {
  logs.forEach((x) => resetLog(x));
}

function resetLog(log) {
  log.style = {};
  log.class = {};
}

function applyHighlightsAndRemoves(logs, highlights, removes) {
  for (const log of logs) {
    let modified = false;

    // Prioritize highlighting over removal
    for (let i = 0; i < highlights.length; i++) {
      const { text, color } = highlights[i];
      const highlightRegex = new RegExp(text, "i");
      if (highlightRegex.test(log.text)) {
        log.style.backgroundColor = color;
        modified = true;
        break;
      }
    }

    if (!modified) {
      for (let i = 0; i < removes.length; i++) {
        const { text } = removes[i];
        const removeRegex = new RegExp(text, "i");
        if (removeRegex.test(log.text)) {
          log.class.hidden = true;
          break;
        }
      }
    }
  }
}

function initializeStyle() {
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");

  head.appendChild(style);

  var css = "pre .hidden { display: none; }";
  css += "pre div { mix-blend-mode: difference; }";

  style.appendChild(document.createTextNode(css));
}

initialize();
