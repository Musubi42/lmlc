<template>
  <div @click="closeMenuIfOpen" >
    <Header :dynamicStyle="headerStyle" />
    <NuxtPage />
    <div
      class="fixed w-screen bottom-0 bg-white mix-blend-difference border-t-2 border-gray-200"
    >
      <Music />
    </div>
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
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
