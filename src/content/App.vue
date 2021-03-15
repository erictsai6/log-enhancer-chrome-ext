<template>
  <div v-for="(log, index) in logs" :key="index">
    <div :class="log.class" :style="log.style">{{ log.text }}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  props: {
    logs: Array,
  },
  mounted: function () {},
  methods: {},
});
</script>

<style></style>
