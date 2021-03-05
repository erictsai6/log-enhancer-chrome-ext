<template>
  <h1>Log Enhancer Tool</h1>
  <button v-on:click="applyChanges">Apply</button>
  <button v-on:click="addHighlight">Add Highlight</button>
  <div v-for="(highlight, index) in highlights" :key="index">
    <HighlightInput :index="index" 
      v-model:text.sync="highlight.text" :onDelete="deleteHighlight" />
  </div>
  <button v-on:click="addRemove">Add Remove</button>
  <div v-for="(remove, index) in removes" :key="index">
    <RemoveInput :index="index" 
      v-model:text.sync="remove.text" :onDelete="deleteRemove" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HighlightInput from './components/HighlightInput.vue';
import RemoveInput from './components/RemoveInput.vue';

export default defineComponent({
  name: 'App',
  components: {
    HighlightInput,
    RemoveInput
  },
  data() {
    return { 
      count: 1 ,
      highlights: [],
      removes: []
    }
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
        text: 'hello',        
      });
    },
    addRemove() {
      this.removes.push({
        text: 'remove'
      })
    },
    applyChanges() {
      console.log(this.highlights);
      console.log(this.removes);
    }
  }
})
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
</style>