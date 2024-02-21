<template>
  <div @click="closeMenuIfOpen" >
    <Intro v-if="IntroAnimation && firstVisit" class="fixed z-10000" />
    <!-- <Intro v-if="true" class="fixed z-10" /> -->
    <Header :dynamicStyle="headerStyle" />
    <NuxtPage />
    <div
      class="fixed w-screen bottom-0 bg-white mix-blend-difference border-t-2 border-gray-200"
    >
      <Music />
    </div>
    <Footer />
    <CustomCursor />
  </div>
</template>

<script>
export default {
  setup() {
    // const isIntroAnimation = ref(true);
    const IntroAnimation = stateIntroAnimation();

    watch(IntroAnimation, (newValue, oldValue) => {
      IntroAnimation.value = newValue;
    });

    const firstVisit = stateFirstVisit();

    const isMenuOpen = stateMenuOpen();

    const isMobile = stateIsMobile();

    return {
      isMenuOpen,
      IntroAnimation,
      firstVisit,
      isMobile,
    };
  },
  data() {
    return {
      headerStyle: {
        opacity: 1,
      },
      pastYPosition: 0,
      moreThanOnce: 0,
    };
  },
  methods: {
    handleScroll() {
      const actualYPosition = window.scrollY || window.pageYOffset;
      this.headerStyle.opacity = this.pastYPosition < actualYPosition ? 0 : 1;
      this.pastYPosition = actualYPosition;
    },
    // TODO: Il ne faut pas que ça se trigger si je clique sur le menu
    closeMenuIfOpen(event) {
      // console.log("oui");
      // console.log(event.target);
      // if (this.moreThanOnce > 0 && this.isMenuOpen) {
      //   this.isMenuOpen = !this.isMenuOpen;
      // }
      // this.moreThanOnce++;
    },
  },
  beforeMount() {
    const width = window.innerWidth;
    this.isMobile = width <= 768; // Si la width est inférieur à 768px, c'est un mobile
    // prefetchImages(isMobile.value);
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
