<template>  
  <input name="pattern" type="text" placeholder="enter pattern to highlight" v-model="text" @change="onTextUpdate">
  <input name="color" type="color" placeholder="enter background color hex" v-model="color" @change="onColorUpdate">
  <button v-on:click="_onDelete"> - </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HighlightInput',
  props: {
    index: Number,
    text: String,
    color: String,
    onDelete: Function,    
  },  
  methods: {
    onTextUpdate(e) {            
      this.$emit('update:text', e.target.value);      
    },
    onColorUpdate(e) {
      this.$emit('update:color', e.target.value);      
    },
    _onDelete() {
      this.$props.onDelete(this.$props.index);
    }
  }
})
</script>

<style>
</style>