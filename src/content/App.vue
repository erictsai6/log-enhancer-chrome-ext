<template>
  <LogContainer :logs="logs" />
</template>

<script>
import { defineComponent } from "vue";
import LogContainer from './LogContainer.vue';

export default defineComponent({
  name: "App",
  components: {
    LogContainer
  },
  data() {
    return { 
      logs: []
    }
  },
  methods: {
    setLogs(logs) {
      this.logs = logs;      
    }
  },
});
</script>

<style></style>
