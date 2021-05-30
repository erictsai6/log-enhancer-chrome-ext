chrome.runtime.onMessage.addListener((request, sender) => {
  let tab;

  return chrome.tabs
    .query({ active: true })
    .then(function (tabs) {
      if (tabs.length === 0) {
        console.warn('No active tabs found, no operation');
        return;
      }      
      tab = tabs[0];
      return chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["main.js"],
      });
    })
    .then(function () {
      return chrome.tabs.sendMessage(tab.id, request);
    });
});
