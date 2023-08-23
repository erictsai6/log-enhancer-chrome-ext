<template>  
    <div class="log-profile-container">
        <button
            v-on:click="_onSelect">Select</button>
        <span>{{logProfile.name}}</span>
        <button
            v-on:click="_onDelete">Remove</button>
    </div>  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogProfile',
  props: {
    logProfile: Object,
    index: Number,
    onSelect: Function,
    onDelete: Function,
  },  
  methods: {   
    _onSelect() {
        this.$props.onSelect(this.$props.index);
    },
    _onDelete() {
        this.$props.onDelete(this.$props.index);
    }
  }
})
</script>

<style>
.log-profile-container {
    display: flex;
    flex-direction: row;

}
</style>