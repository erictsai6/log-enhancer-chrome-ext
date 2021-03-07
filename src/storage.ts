const KEY = "savedState";

class Storage {
  constructor(private isPluginMode: boolean) {}

  getData() {
    return new Promise((resolve, reject) => {
      if (this.isPluginMode) {
        chrome.storage.local.get(KEY, function (value) {
          const result = value[KEY];          
          resolve(result);
        });
      } else {
        resolve(JSON.parse(localStorage.getItem(KEY)));
      }
    });
  }
  saveData(value: any) {
    return new Promise((resolve, reject) => {
      if (this.isPluginMode) {
        chrome.storage.local.set({ [KEY]: value }, function () {
          resolve();
        });
      } else {
        resolve(localStorage.setItem(KEY, JSON.stringify(value)));
      }
    });
  }
}

export const storage = new Storage(!!chrome.storage);
