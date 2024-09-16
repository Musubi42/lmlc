<template>
  <div>
    <NuxtLayout class="bg-black" />
    <div
      class="fixed w-screen bottom-0 bg-white mix-blend-difference border-t-2 border-gray-200"
      :style="{ 'mix-blend-mode': isPageMentionsLegales ? 'normal' : '' }"
    >
      <!-- <Music /> -->
    </div>
  </div>
</template>

<script>

export default {
  setup() {
    const isFirstInterraction = firstInterraction();

    const isMusicPlaying = musicPlaying();

    const isMobile = stateIsMobile();

    const isPageMentionsLegales = pageMentionsLegales();

    return {
      isFirstInterraction,
      isMusicPlaying,
      isMobile,
      isPageMentionsLegales,
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
    if (this.isMobile) {
      window.addEventListener('touchstart', this.detectFirstInterraction);
    } else {
      window.addEventListener('click', this.detectFirstInterraction);
    }
  },
}
</script>