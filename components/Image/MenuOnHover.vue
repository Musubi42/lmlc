<template>
  <div>
    <!--  -->
    <div @mousemove="moveImage" @mouseenter="showImage" @mouseleave="hideImage">
      <slot></slot>
      <img
        v-if="isVisible"
        :src="imageSrc"
        :style="imageStyle"
        class="image-on-hover"
      />
    </div>
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
      isVisible: true,
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
      // const elementHeight =
      //   event.srcElement.parentElement.offsetParent.clientHeight;
      // const pageHeight = event.view.innerHeight;

      // const componentHeight = pageHeight - elementHeight;

      this.imageX = event.clientX;
      this.imageY = event.clientY;
    },
  },
  computed: {
    imageStyle() {
      return {
        position: "absolute",
        left: this.imageX + "px",
        top: this.imageY + "px",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      };
    },
  },
};
</script>

<style scoped>
.image-on-hover {
  transition: transform 0.1s;
  width: fit-content;
  z-index: 1;
}
</style>
