<template>  
  <div class="header-container">
      <div>Add Log Profile</div>
      <button v-on:click="_onGoBack">Go back</button>
  </div>
  <div>
    <input name="name" type="text" placeholder="enter unique log profile name" v-model="name" @change="onNameUpdate">
    <button class="primary-btn" v-on:click="_onAddLogProfile">Save</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AddLogProfilePage',
  data() {
    return {
      name: ''
    }
  },
  props: {
    onAddLogProfile: Function,
    onGoBack: Function,
  },  
  methods: {
    onNameUpdate(e) {            
      this.$emit('update:name', e.target.value);      
    },    
    _onGoBack() {
      this.$props.onGoBack();
    },
    _onAddLogProfile() {
      this.$props.onAddLogProfile(this.name);
    }
  }
})
</script>

<style>
</style>