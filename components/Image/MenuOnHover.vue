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
      scrollPos: 0,
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
    changeSeparationColor() {
      // this.$emit("mouseover");
    },
    showImage() {
      this.isVisible = true;
      // Changer la couleur rose-neon
    },
    hideImage() {
      this.isVisible = false;
      // Remettre la couleur rose-neon
      // this.$emit("mouseout");
    },
    moveImage(event) {
      // this.imageX = event.pageX;
      this.imageX = event.pageX - window.innerWidth / 2;
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
        left: `${this.imageX}px`,
        top: `${this.imageY - this.scrollPos}px`,
        transform: "translate(-50%, -50%)",
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
.image-on-hover {
  transition: transform 0.3s;
  width: auto;
  max-width: 100%;
  width: fit-content;
  z-index: 1;
}
</style>
