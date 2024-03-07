<template>
  <div @click="closeMenuIfOpen">
    <Header :dynamicStyle="headerStyle" :callToggleMenu="closeMenu" />
    <NuxtPage />
    <Footer />
    <CustomCursor />
  </div>
</template>

<script>
export default {
  setup() {
    const isMenuOpen = stateMenuOpen();

    return {
      isMenuOpen,
    };
  },
  data() {
    return {
      headerStyle: 1,
      pastYPosition: 0,
      moreThanOnce: 0,
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
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
