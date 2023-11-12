<template>
  <div class="container" @mousemove="moveImage" @mouseenter="showImage" @mouseleave="hideImage">
    <slot></slot>
    <img v-if="isVisible" :src="imageSrc" :style="imageStyle" class="image-on-hover" />
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isVisible: false,
      imageX: 0,
      imageY: 0,
    };
  },
  methods: {
    showImage() {
      this.isVisible = true;
    },
    hideImage() {
      this.isVisible = false;
    },
    moveImage(event) {
      this.imageX = event.pageX;
      this.imageY = event.pageY;
    },
  },
  computed: {
    imageStyle() {
      return {
        position: 'fixed', 
        left: `${this.imageX}px`,
        top: `${this.imageY}px`,
        transform: 'translate(-50%, -50%)', 
        pointerEvents: 'none', 
        zIndex: 9, 
      };
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 5%;
  margin-bottom: 15%;
}
.image-on-hover {
  transition: transform 0.1s;
  width: auto;
  max-width: 100%; 
  width: fit-content;
  z-index: 1;
}


</style>
