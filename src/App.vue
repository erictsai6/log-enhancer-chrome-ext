<template>
  <h1>Log Enhancer Tool</h1>
  <div>
    <button v-on:click="addHighlight">Add Highlight</button>
    <div v-for="(highlight, index) in highlights" :key="index">
      <HighlightInput :index="index" 
        v-model:text="highlight.text" 
        v-model:color="highlight.color"
        :onDelete="deleteHighlight" />
    </div>
  </div>
  <div>
    <button v-on:click="addRemove">Add Remove</button>
    <div v-for="(remove, index) in removes" :key="index">
      <RemoveInput :index="index" 
        v-model:text.sync="remove.text" :onDelete="deleteRemove" />
    </div>
  </div>
  <div>
  <button class="primary-btn" v-on:click="applyChanges">Apply</button>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HighlightInput from './components/HighlightInput.vue';
import RemoveInput from './components/RemoveInput.vue';
import { storage } from './storage';
import { getRandomColor } from './colors';

export default defineComponent({
  name: 'App',
  components: {
    HighlightInput,
    RemoveInput
  },
  data() {
    return { 
      highlights: [],
      removes: []
    }
  },
  mounted: function() {
    console.log('bootstrapped');
    // Load in the data 
    storage.getData().then((value) => {
      if (value.highlights) {
        this.highlights = value.highlights;
      }
      if (value.removes) {
        this.removes = value.removes;
      }
    });

  },
  methods: {
    deleteHighlight(i: number) {
      this.highlights.splice(i, 1);
    },
    deleteRemove(i: number) {
      this.removes.splice(i, 1);
    },
    addHighlight() {
      this.highlights.push({
        text: '', 
        color: getRandomColor()
      });
    },
    addRemove() {
      this.removes.push({
        text: ''
      });
    },
    applyChanges() {
      const highlights = this.highlights.filter((x) => !!x);
      const removes = this.removes.filter((x) => !!x);
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {
          highlights,
          removes,
        });
        storage.saveData({highlights, removes});
      });
 
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.primary-btn {
  background-color: rgb(65, 134, 0);
  color: white;

}
</style>