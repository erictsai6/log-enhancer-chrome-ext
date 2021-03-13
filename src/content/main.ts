let initialized = false;

chrome.runtime.onMessage.addListener(function (
  request: { highlights: any[]; removes: any[] },
  sender,
  sendResponse
) {
  ready(request.highlights, request.removes);
});

function ready(highlights: any[], removes: any[]) {
  if (highlights.length === 0 && removes.length === 0) {
    console.error("Nothing to highlight or remove, noop");
    return;
  }

  if (!initialized) {
    const logContainers = document.getElementsByTagName("pre");
    if (logContainers.length === 0) {
      return;
    }
    const logContainer = logContainers[0];
    const logs = (logContainer as HTMLPreElement).textContent.split("\n");
    logContainer.innerHTML = "";

    for (const log of logs) {
      const logDiv = document.createElement("div");
      const logContent = document.createTextNode(log);

      logDiv.appendChild(logContent);
      logContainer.appendChild(logDiv);
    }
    initializeStyle();

    initialized = true;
  }

  const logContainer = document.getElementsByTagName("pre")[0];
  const logDivs = logContainer.children;

  for (const logDiv of logDivs) {
    let modified = false;

    // Prioritize highlighting over removal
    for (let i = 0; i < highlights.length; i++) {
      const { text, color } = highlights[i];
      const highlightRegex = new RegExp(text, "i");
      if (highlightRegex.test(logDiv.textContent)) {
        console.log(color);
        logDiv.style.backgroundColor = `#${color}`;
        modified = true;
        break;
      }
    }

    if (!modified) {
      for (let i = 0; i < removes.length; i++) {
        const { text } = removes[i];
        const removeRegex = new RegExp(text, "i");
        if (removeRegex.test(logDiv.textContent)) {
          logDiv.classList.add(`hidden`);
          break;
        }
      }
    }
  }
}

// document.addEventListener("DOMContentLoaded", ready, false);

function initializeStyle() {
  var css = "pre > .hidden { display: none; }",
    head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");

  head.appendChild(style);

  style.appendChild(document.createTextNode(css));
}
