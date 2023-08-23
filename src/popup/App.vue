<template>
  <template v-if="route === 'HOME'">
    <HomePage 
      :selectedProfile="appState.selectedProfile"
      :onApplyChanges="applyChanges"
      :onNewLogProfile="newLogProfile"
      :onNavigateToAddLogProfilePage="navigateToAddLogProfilePage"
      :onNavigateToLogProfilesPage="navigateToLogProfilesPage" />
  </template>
  <template v-if="route === 'LOG_PROFILES_PAGE'">
    <LogProfilesPage 
      :savedLogProfiles="appState.savedLogProfiles"
      :onSelect="selectLogProfile"
      :onDelete="deleteLogProfile"
      :onGoBack="navigateToHome"
    />
  </template>
  <template v-if="route === 'ADD_LOG_PROFILE_PAGE'">
    <AddLogProfilePage 
      :onAddLogProfile="saveLogProfile"
      :onGoBack="navigateToHome"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomePage from "./components/HomePage.vue";
import LogProfilesPage from "./components/LogProfilesPage.vue";
import AddLogProfilePage from "./components/AddLogProfilePage.vue";

import { storage } from "./storage";

import { AppState } from './models/app-state';
import { LogProfile } from "./models/log-profile";

export default defineComponent({
  name: "App",
  components: {
    HomePage,
    LogProfilesPage,
    AddLogProfilePage
  },
  data() {
    return {
      appState: new AppState(LogProfile.emptyLogProfile(), []),
      logs: [],
      route: 'HOME'
    };
  },
  mounted: function () {
    // Load in the data
    storage.getData().then((value) => {
      if (!value) {
        return;
      }
      this.appState = AppState.fromStorage(value);      
    });
  },
  methods: {
    navigateToLogProfilesPage() {
      this.route = 'LOG_PROFILES_PAGE';
    },
    navigateToAddLogProfilePage() {
      this.route = 'ADD_LOG_PROFILE_PAGE';
    },
    navigateToHome() {
      this.route = 'HOME';
    },  
    newLogProfile() {
      this.appState.selectedProfile = LogProfile.emptyLogProfile();
    },
    saveLogProfile(name: string) {
      this.appState.saveLogProfile(name);
      storage.saveData(this.appState);
      this.navigateToHome();
    },
    selectLogProfile(index: number) {
      this.appState.selectedProfile = this.appState.savedLogProfiles[index];
      this.navigateToHome();
    },
    deleteLogProfile(index: number) {
      if (this.appState.selectedProfile.name === this.appState.savedLogProfiles[index].name) {
        this.newLogProfile();
      }
      this.appState.deleteLogProfile(index); 
      
      storage.saveData(this.appState);     
    },    
    applyChanges() {
      const highlights = this.appState.selectedProfile.highlights.filter((x) => !!x);
      const removes = this.appState.selectedProfile.removes.filter((x) => !!x);

      chrome.runtime.sendMessage({
        highlights,
        removes,
      });
      storage.saveData(this.appState);
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
