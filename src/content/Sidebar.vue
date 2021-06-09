<template>
  <canvas ref="sidebarCanvas" style="position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 8px;
    background-color: #f0f0f0;"></canvas>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Sidebar",
  components: {},
  props: {
    logs: Array,
  },
  mounted: function () {
    this.renderCanvas();
       
    this.$watch(
      () => this.logs,
      (first, second) => {
        this.renderCanvas();
      }
    );
  },
  methods: {
    resetCanvas() {
      const canvas = this.$refs.sidebarCanvas;
      const height = canvas.clientHeight;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = 8;
      canvas.height = height;

    },
    renderCanvas() {
      this.resetCanvas();

      const canvas = this.$refs.sidebarCanvas;
      const height = canvas.clientHeight;
      const ctx = canvas.getContext("2d");
      for (let i = 0; i < this.logs.length; i++) {
        
        const log = this.$props.logs[i];        
        if (log.style.backgroundColor) {
          const nodeHeight = i / this.$props.logs.length * height;
          ctx.strokeStyle = log.style.backgroundColor;
          ctx.moveTo(0, nodeHeight);
          ctx.lineTo(8, nodeHeight);  
          ctx.stroke();        
        }
      }
    },    
  },
});
</script>

<style>
</style>
