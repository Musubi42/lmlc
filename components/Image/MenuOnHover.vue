<template>
  <div
    class="container"
    @mousemove="moveImage"
    @mouseenter="showImage"
    @mouseleave="hideImage"
  >
    <slot></slot>
    <img
      v-if="isVisible"
      :src="imageSrc"
      :style="imageStyle"
      class="image-on-hover hidden md:block"
    />
  </div>
</template>

<script>
export default {
  props: ["imageSrc", "offsetParent"],
  watch: {
    offsetParent(newVal, oldVal) {
      this.decalageX = newVal;
      console.log("offsetParent changed from", oldVal, "to", newVal);
    },
  },
  data() {
    return {
      isVisible: false,
      imageX: 0,
      decalageX: 0,
      imageY: 0,
      scrollPos: 0,
      right: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollPos = window.scrollY;
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    showImage() {
      this.isVisible = true;
    },
    hideImage() {
      this.isVisible = false;
    },
    moveImage(event) {
      this.right =
        event.pageX - window.innerWidth / 2 + (window.innerWidth / 2) * 0.2;

      this.imageY = event.pageY;
    },
    handleScroll(event) {
      this.scrollPos = window.scrollY;
    },
  },
  computed: {
    imageStyle() {
      return {
        position: "fixed",
        left: `${this.right - this.decalageX}px`,
        top: `${this.imageY - this.scrollPos}px`,
        transform: "translate(-50%, -120%)",
        pointerEvents: "none",
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
  /* margin: 5%;
  margin-bottom: 15%; */
}
/* .image-on-hover {
  transition: transform 0.3s;
  width: auto;
  max-width: 100%;
  width: fit-content;
  z-index: 1;
} */
</style>
