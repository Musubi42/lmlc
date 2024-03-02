<template>
  <div @click="closeMenuIfOpen">
    <!-- <div class="bg-white h-15 w-full fixed"> -->
      <Header :dynamicStyle="headerStyle" />
    <!-- </div> -->
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
      // console.log("oui");
      // console.log(event.target);
      // if (this.moreThanOnce > 0 && this.isMenuOpen) {
      //   this.isMenuOpen = !this.isMenuOpen;
      // }
      // this.moreThanOnce++;
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
