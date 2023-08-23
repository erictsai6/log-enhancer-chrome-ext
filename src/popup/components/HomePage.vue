<template> 
    <div class="header-container">
        <div>Log Enhancer Tool</div>
        <button
          v-on:click="newLogProfile"
        >New</button>
        <button 
            v-on:click="navigateToLogProfilesPage">            
            Log Profiles &#8594;</button>  
         <button 
            v-if="!selectedProfile.name"
            v-on:click="navigateToAddLogProfilePage">            
            Add Log Profile &#8594;</button>   
    </div>    
    <div v-if="selectedProfile.name">{{selectedProfile.name}}</div>
    <div class="input-container">
        <button v-on:click="addHighlight">Add Highlight</button>
        <div v-for="(highlight, index) in selectedProfile.highlights" :key="index">
        <HighlightInput
            :index="index"
            v-model:text="highlight.text"
            v-model:color="highlight.color"
            :onDelete="deleteHighlight"
        />
        </div>
    </div>
    <div class="input-container">
        <button v-on:click="addRemove">Add Remove</button>
        <div v-for="(remove, index) in selectedProfile.removes" :key="index">
        <RemoveInput
            :index="index"
            v-model:text.sync="remove.text"
            :onDelete="deleteRemove"
        />
        </div>
    </div>
    <div>
        <button class="primary-btn" v-on:click="onApplyChanges">Apply</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HighlightInput from "./HighlightInput.vue";
import RemoveInput from "./RemoveInput.vue";

export default defineComponent({
  name: 'HomePage',
  components: {
    HighlightInput,
    RemoveInput
  },
  props: {
    selectedProfile: Object,
    onNewLogProfile: Function,
    onNavigateToAddLogProfilePage: Function, 
    onNavigateToLogProfilesPage: Function,
    onApplyChanges: Function
  },  
  methods: {
    deleteHighlight(i: number) {
      this.$props.selectedProfile.deleteHighlight(i);
    },
    deleteRemove(i: number) {
      this.$props.selectedProfile.deleteRemove(i);
    },
    addHighlight() {
      this.$props.selectedProfile.addHighlight();      
    },
    addRemove() {
      this.$props.selectedProfile.addRemove();     
    },
    newLogProfile() {
      this.$props.onNewLogProfile();
    },
    navigateToAddLogProfilePage() {
      this.$props.onNavigateToAddLogProfilePage();
    },
    navigateToLogProfilesPage() {
      this.$props.onNavigateToLogProfilesPage();
    }
  }
})
</script>
<style>
.header-container {
    display: flex;
    flex-direction: row;    
    justify-content: space-between;
}
.input-container {
    border: 1px solid gray;
    padding: 8px;
    margin: 8px;
}
.primary-btn {
  background-color: rgb(65, 134, 0);
  color: white;
}
</style>