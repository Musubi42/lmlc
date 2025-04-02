<template>
  <iframe src="https://wp.musubi.dev/" frameborder="0"></iframe>
</template>


<script>
export default {
  setup() {
    definePageMeta({
      layout: "about",
    });
    useSeoMeta({
      title: 'LMLC COMMUNICATION',
      ogTitle: 'My Amazing Site',
      description: 'This is my amazing site, let me tell you all about it.',
      ogDescription: 'This is my amazing site, let me tell you all about it.',
      ogImage: 'https://example.com/image.png',
      twitterCard: 'summary_large_image',
    });
    const ScrollHorizontal = isScrollHorizontal();
    const isMenuOpen = stateMenuOpen();

    const isMobile = stateIsMobile();

    const isTalents = talents();

    return {
      ScrollHorizontal,
      isMenuOpen,
      isMobile,
      isTalents,
    };
  },
  data() {
    return {
      scroll: { deltaY: 0, deltaX: 0 },
      isScroll: true,
      body: null,
      sectionMetierHeight: 0,
      scrollY: 0,
      mouseY: 0,
      mouseAbsolutePositionY: 0,
      bgColor: "white",
      showServicesAnimation: false,
    };
  },
};
</script>
