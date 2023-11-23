<template>
  <!-- <div> -->
  <!--  -->
  <div @mousemove="moveImage" @mouseenter="showImage" @mouseleave="hideImage">
    <slot name="title"></slot>
    <img
      v-if="isVisible"
      :src="imageSrc"
      :style="imageStyle"
      class="image-on-hover"
    />
    <br />
    <div class="ml-[-10px] px-[10px] py-[6px]">
      <slot name="content"></slot>
    </div>
  </div>
  <!-- </div> -->
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
      const elementHeight =
        event.srcElement.parentElement.offsetParent.clientHeight;
      const pageHeight = event.view.innerHeight;

      const componentHeight = pageHeight - elementHeight;

      this.imageX = event.clientX;
      this.imageY = event.clientY - componentHeight;
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
    contentStyleOnHover() {
      if (this.isVisible) {
        return {
          borderRadius: "20px",
          backgroundColor: "white",
          fontWeight: "500",
        };
      } else {
        return {};
      }
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

/* .content-slot:hover ::v-deep {
  border-radius: 20px;
  background-color: white;
  padding: 2px 6px;
  font-weight: 500;
} */
</style>
