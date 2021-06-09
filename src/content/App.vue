<template>
  <Sidebar :logs="logs" />
  <LogContainer :logs="logs" />
</template>

<script>
import { defineComponent } from "vue";
import LogContainer from './LogContainer.vue';
import Sidebar from './Sidebar.vue';

export default defineComponent({
  name: "App",
  components: {
    LogContainer,
    Sidebar
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
