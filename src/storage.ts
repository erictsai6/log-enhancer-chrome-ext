const KEY = "savedState";

export class Storage {
  getData() {
    chrome.storage.local.get(KEY, function (value) {
      const result = value[KEY];
      if (!result || !result.filters || !result.removes) {
        console.error("No saved state found");
        return;
      }
      for (let i = 0; i < result.filters.length; i++) {
        const filter = document.querySelectorAll(
          `input[name="filter${i + 1}"]`
        )[0];
        filter.value = result.filters[i];
      }
      for (let i = 0; i < result.removes.length; i++) {
        const remove = document.querySelectorAll(
          `input[name="remove${i + 1}"]`
        )[0];
        remove.value = result.removes[i];
      }
    });
  }
  saveData(filters, removes) {
    chrome.storage.local.set({ [KEY]: { filters, removes } }, function () {
      console.log("Saving content");
    });
  }
}