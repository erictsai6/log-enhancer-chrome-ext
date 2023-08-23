<template>  
  <div class="header-container">
      <div>Log Profiles</div>
      <button v-on:click="_onGoBack">Go back</button>
  </div>
  <div class="log-profiles-container">
    <div v-if="savedLogProfiles.length === 0">No saved log profiles found.</div>
    <div v-for="(logProfile, index) in savedLogProfiles" :key="logProfile.name">
      <LogProfile
          :index="index"
          :logProfile="logProfile"
          :onSelect="_onSelect"
          :onDelete="_onDelete"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LogProfile from './LogProfile.vue';

export default defineComponent({
  name: 'LogProfilesPage',
  components: {
    LogProfile
  },
  props: {
    savedLogProfiles: Array,
    onGoBack: Function,
    onSelect: Function,
    onDelete: Function
  },  
  methods: {    
    _onSelect(index) {
      this.$props.onSelect(index);
    },
    _onDelete(index) {
      this.$props.onDelete(index);
    },
    _onGoBack() {
      this.$props.onGoBack();
    }
  }
})
</script>

<style>
.log-profiles-container {
  padding: 10px;
  padding-top: 25px;
}
</style>