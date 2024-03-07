<template>
  <div @click="closeMenuIfOpen" >
    <HeaderAbout v-if="showHeader" :dynamicStyle="headerStyle" :callToggleMenu="closeMenu" />
    <NuxtPage />
    <OrientationWarning />
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
      closeMenu: false,
    };
  },
  methods: {
    handleScroll() {
      if (window.scrollY || window.pageYOffset === 0) {
        this.headerStyle = 1;
      } else {
        this.headerStyle = this.pastYPosition < (window.scrollY || window.pageYOffset) ? 0 : 1;
        this.pastYPosition = (window.scrollY || window.pageYOffset);
      }
    },
    // TODO: Il ne faut pas que ça se trigger si je clique sur le menu
    closeMenuIfOpen(event) {
      let ariaLabelMenu = event.target.getAttribute('aria-label');

      if (ariaLabelMenu === "menu") {
        return;
      }

      if (ariaLabelMenu == "menuBurger") {
        return;
      }

      if (this.isMenuOpen) {
        this.closeMenu = true;
        setTimeout(() => {
          this.closeMenu = false;
        }, 500);
        this.moreThanOnce = 0;
      }
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
    }, 100);
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
