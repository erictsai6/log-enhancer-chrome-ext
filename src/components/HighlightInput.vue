<template>
  <input type="text" v-model="text" @change="onTextUpdate">
  <span>Color picker</span>
  <button v-on:click="onDelete">-</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HighlightInput',
  props: {
    index: Number,
    text: String,
    onDelete: Function,    
  },
  methods: {
    onTextUpdate(e) {            
      this.$emit('update:text', e.target.value);      
    },
    onDelete() {
      this.$props.onDelete(this.$props.i);
    }
  }
})
</script>

<style>

</style>