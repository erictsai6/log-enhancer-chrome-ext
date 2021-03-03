let initialized = false;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  ready(request.filters, request.removes);
});

function start(request) {
  alert("started", request);
}

function ready(filters, removes) {
  if (filters.length === 0 && removes.length === 0) {
    console.error("Nothing to filter or remove, noop");
    return;
  }

  if (!initialized) {
    const logContainer = document.getElementsByTagName("pre")[0];
    const logs = logContainer.textContent.split("\n");
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
    for (let i = 0; i < filters.length; i++) {
      const filterRegex = new RegExp(filters[i], "i");
      if (filterRegex.test(logDiv.textContent)) {
        logDiv.classList.add(`filter${i}`);
        modified = true;
        break;
      }
    }

    if (!modified) {
      for (let i = 0; i < removes.length; i++) {
        const removeRegex = new RegExp(removes[i], "i");
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
  var css =
      "pre > .filter0 { background: #6dd187; } pre > .filter1 { background: #eb86b8; } pre > .filter2 { background: #fadb9d; } pre > .hidden { display: none; }",
    head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");

  head.appendChild(style);

  style.appendChild(document.createTextNode(css));
}
