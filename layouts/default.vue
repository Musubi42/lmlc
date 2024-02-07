<template>
  <div @click="closeMenuIfOpen" ref="enfant">
    <Header :dynamicStyle="headerStyle" />
    <NuxtPage />
    <Footer />
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
  data() {
    return {
      headerStyle: {
        opacity: 1,
      },
      pastYPosition: 0,
    };
  },
  setup() {
    const enfant = ref(null);
  },
  methods: {
    handleScroll() {
      const actualYPosition = window.scrollY || window.pageYOffset;
      // this.headerStyle.opacity = this.pastYPosition < actualYPosition ? 0 : 1;
      // this.pastYPosition = actualYPosition;
    },
    closeMenuIfOpen(event) {
      console.log("hey");
      console.log(this.$refs.menu);
      // Vérifiez si le clic a eu lieu à l'intérieur du menu
      if (this.$refs.menu && this.$refs.menu.contains(event.target)) {
        return;
      }

      // Fermez le menu si il est ouvert
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // if (this.$refs.enfant) {
    //   console.log("he");
    //   this.$refs.enfant.addEventListener('click', this.closeMenuIfOpen);
    // }
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
