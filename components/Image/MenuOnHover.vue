<template>
  <div @mouseover="mouseHover">
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
      isVisible: false,
      imageX: 0,
      imageY: 0,
    };
  },
  methods: {
    mouseHover(event) {
      // Récupérer la couleur à afficher selon l'élément survolé
      const elementAttributes = event.target.attributes;
      const color = elementAttributes["data-color"].value;
      this.$emit("mouseover", color);
    },
    showImage() {
      this.isVisible = true;
    },
    hideImage() {
      this.isVisible = false;

      this.$emit("mouseover", "#ff0066");
    },
    moveImage(event) {
      // const elementHeight =
      //   event.srcElement.parentElement.offsetParent.clientHeight;
      // const pageHeight = event.view.innerHeight;

      // const componentHeight = pageHeight - elementHeight;

      // Le placement de l'image étant absolu par rapport à l'écran, il faut soustraire la largeur qui n'est pas celle du menu, donc la taille du menu, car il prend la moitié de l'écran
      const menuWidth = event.srcElement.offsetParent.clientWidth;

      this.imageX = event.clientX - menuWidth;
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
