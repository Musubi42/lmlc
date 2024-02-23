<template>
  <div>
    <NuxtLayout class="bg-black" />
    <div
      class="fixed w-screen bottom-0 bg-white mix-blend-difference border-t-2 border-gray-200"
    >
      <Music />
    </div>
  </div>
</template>

<script>

export default {
  setup() {
    const isFirstInterraction = firstInterraction();

    const isMusicPlaying = musicPlaying();

    return {
      isFirstInterraction,
      isMusicPlaying,
    };
  },
  methods: {
    detectFirstInterraction() {
      if (!this.isMusicPlaying) {
        setTimeout(() => {
          if (!this.isMusicPlaying) {
            this.isFirstInterraction++;
          }
        }, 1000);
      } else {
        window.removeEventListener('click', this.detectFirstInterraction);
        window.removeEventListener('touchstart', this.detectFirstInterraction);
      }
    },
  },
  mounted() {
    // window.addEventListener('click', this.detectFirstInterraction);
    window.addEventListener('touchstart', this.detectFirstInterraction);
  },
}
</script>