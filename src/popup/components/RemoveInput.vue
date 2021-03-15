<template>
  <input type="text" v-model="text" @change="onTextUpdate">
  <button v-on:click="_onDelete">-</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RemoveInput',
  props: {
    index: Number,
    text: String,
    onDelete: Function,    
  },
  methods: {
    onTextUpdate(e) {            
      this.$emit('update:text', e.target.value);      
    },
    _onDelete() {
      this.$props.onDelete(this.$props.i);
    }
  }
})
</script>

<style>

</style>