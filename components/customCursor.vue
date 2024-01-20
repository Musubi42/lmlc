<template>
  <div
    ref="cursor"
    class="cursor-container z-50"
    :class="{ hovered: isHovered }"
    :style="{ top: `${cursorPosition.y}px`, left: `${cursorPosition.x}px` }"
  ></div>
</template>

<script>
import { hoverState } from "../plugins/cursor-state";

export default {
  setup() {
    // const hoverState = inject('$hoverState');

    return { hoverState };
  },
  data() {
    return {
      cursorPosition: { x: 0, y: 0 },
    };
  },
  computed: {
    isHovered() {
      return this.hoverState.isHovered;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.updateCursorPosition);
    window.addEventListener("scroll", this.updateScrollPosition);
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.updateCursorPosition);
    window.removeEventListener("scroll", this.updateScrollPosition);
  },
  methods: {
    updateCursorPosition(e) {
      this.cursorPosition = { x: e.pageX, y: e.clientY };
    },
    updateScrollPosition(e) {
      this.cursorPosition = {  ...this.cursorPosition };
    },
  },
};
</script>

<style scoped>
.cursor-container {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 0, 0.5);
  background: rgba(255, 0, 102, 0.5);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.6s cubic-bezier(0.79, 0.14, 0.15, 0.86),
    height 0.6s cubic-bezier(0.79, 0.14, 0.15, 0.86);
}

.hovered {
  width: 50px;
  height: 50px;
}
</style>
