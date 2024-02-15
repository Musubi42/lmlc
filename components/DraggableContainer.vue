<template>
  <div
    class="draggable-container"
    @mousedown="startDrag"
    @mousemove="dragElement"
    @mouseup="stopDrag"
    ref="container"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      startX: 0,
      startY: 0,
    };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.startX = event.clientX - this.$refs.container.offsetLeft;
      this.startY = event.clientY - this.$refs.container.offsetTop;
    },
    dragElement(event) {
      if (this.isDragging) {
        const newX = event.clientX - this.startX;
        const newY = event.clientY - this.startY;
        const containerRect = this.$el.parentElement.getBoundingClientRect();
        this.$refs.container.style.left = newX + "px";
        this.$refs.container.style.top = newY + "px";

        if(this.$refs.container.style.left <= containerRect.left + "px" || this.$refs.container.style.top <= containerRect.top + "px"){
          this.stopDrag()
      }
      }
    },
    stopDrag() {
      this.isDragging = false;
    },
  },
};
</script>

<style scoped>
.draggable-container {
  position: absolute;
  border: 1px solid #000;
  width: 300px;
  height: 200px;
  background-color: #f0f0f0;
  overflow: hidden;
}
</style>
