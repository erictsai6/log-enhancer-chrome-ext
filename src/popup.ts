import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')


console.log("popup js");

const KEY = "savedState";

// function loadData() {
//   chrome.storage.local.get(KEY, function (value) {
//     const result = value[KEY];
//     if (!result || !result.filters || !result.removes) {
//       console.error("No saved state found");
//       return;
//     }
//     for (let i = 0; i < result.filters.length; i++) {
//       const filter = document.querySelectorAll(
//         `input[name="filter${i + 1}"]`
//       )[0];
//       filter.value = result.filters[i];
//     }
//     for (let i = 0; i < result.removes.length; i++) {
//       const remove = document.querySelectorAll(
//         `input[name="remove${i + 1}"]`
//       )[0];
//       remove.value = result.removes[i];
//     }
//   });
// }

// function saveData(filters, removes) {
//   chrome.storage.local.set({ [KEY]: { filters, removes } }, function () {
//     console.log("Saving content");
//   });
// }

// function applyFilters() {
//   const filter1 = document.querySelectorAll('input[name="filter1"]')[0].value;
//   const filter2 = document.querySelectorAll('input[name="filter2"]')[0].value;
//   const filter3 = document.querySelectorAll('input[name="filter3"]')[0].value;

//   const filters = [filter1, filter2, filter3].filter((x) => !!x);

//   const remove1 = document.querySelectorAll('input[name="remove1"]')[0].value;
//   const remove2 = document.querySelectorAll('input[name="remove2"]')[0].value;
//   const remove3 = document.querySelectorAll('input[name="remove3"]')[0].value;

//   const removes = [remove1, remove2, remove3].filter((x) => !!x);

//   chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {
//       filters,
//       removes,
//     });
//     saveData(filters, removes);
//   });
// }

// function ready() {
//   bootstrap();
//   loadData();
//   const btn = document.getElementById("apply-filter-btn");
//   btn.addEventListener("click", applyFilters);
// }

// document.addEventListener("DOMContentLoaded", ready, false);
