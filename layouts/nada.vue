<template>
  <div @click="closeMenuIfOpen" >
    <HeaderAbout v-if="showHeader" :dynamicStyle="headerStyle" />
    <NuxtPage />
    <!-- <div
      class="fixed w-screen bottom-0 bg-white mix-blend-difference border-t-2 border-gray-200"
    >
      <Music />
    </div> -->
    <CustomCursor />
  </div>
</template>


<script>
export default {
  setup() {
    const isMenuOpen = stateMenuOpen();

    const isMobile = stateIsMobile();

    const isTalents = talents();

    return {
      isMenuOpen,
      isMobile,
      isTalents,
    };
  },
  data() {
    return {
      headerStyle: 1,
      pastYPosition: 0,
      moreThanOnce: 0,
      showHeader: ref(false),
    };
  },
  methods: {
    handleScroll() {
      this.headerStyle = this.pastYPosition < (window.scrollY || window.pageYOffset) ? 0 : 1;
      this.pastYPosition = (window.scrollY || window.pageYOffset);
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

    headerToBlack() {
      if (window.scrollY === 0) {
        this.isTalents = false;
      } 
    },

    headerToBlackMobile() {
      if (window.scrollY === 0) {
        this.isTalents = false;
      } 
    },
  },
  beforeMount() {
    const width = window.innerWidth;
    this.isMobile = width <= 768; // Si la width est inférieur à 768px, c'est un mobile
    // prefetchImages(isMobile.value);
  },
  mounted() {
    window.addEventListener('scroll', this.headerToBlack);
    // window.addEventListener('touchmove', this.headerToBlackMobile, { passive: true });


    setTimeout(() => {
      this.showHeader = true;
    }, 700);
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
