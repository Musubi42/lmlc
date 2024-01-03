<template>
  <div class="spotify-wrapper" @mousedown="handleMouseDown">
    <div v-show="isDragging" class="overlay"></div>
    <iframe style="border-radius:12px" :src="playlistSrc" width="100%" height="152" frameBorder="0" allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false
    };
  },
  computed: {
    playlistSrc() {
      return "https://open.spotify.com/embed/playlist/7xrj3s4Ttxru6BYGQKWo1J?utm_source=generator&theme=0";
    }
  },
  methods: {
    handleMouseDown(event) {
      this.isDragging = true;
      this.$emit('mousedown', event);
    },
    handleMouseUp() {
      this.isDragging = false;
    }
  }
};
</script>

<style scoped>
.spotify-wrapper {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 10;
}
</style>
