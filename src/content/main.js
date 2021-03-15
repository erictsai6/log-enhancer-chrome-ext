import { createApp } from "vue";
import App from "./App.vue";

let initialized = false;
let app;

chrome.runtime.onMessage.addListener(function ({ highlights, removes }) {
  if (!initialized) {
    initializeStyle();
  }

  const logs = retrieveLogs();

  applyHighlightsAndRemoves(logs, highlights, removes);

  app = createApp(App, {
    logs,
  }).mount("pre");
});

function retrieveLogs() {
  const logContainers = document.getElementsByTagName("pre");
  if (logContainers.length === 0) {
    return;
  }
  const logContainer = logContainers[0];
  return logContainer.textContent.split("\n").map((text) => {
    return {
      text,
      style: {},
      class: {},
    };
  });
}

function applyHighlightsAndRemoves(logs, highlights, removes) {
  for (const log of logs) {
    let modified = false;

    // Prioritize highlighting over removal
    for (let i = 0; i < highlights.length; i++) {
      const { text, color } = highlights[i];
      const highlightRegex = new RegExp(text, "i");
      if (highlightRegex.test(log.text)) {
        log.style.backgroundColor = `#${color}`;
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
  var css = "pre .hidden { display: none; }",
    head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");

  head.appendChild(style);

  style.appendChild(document.createTextNode(css));
}
