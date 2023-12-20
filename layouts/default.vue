<template>
  <div>
    <div 
      class="relative w-screen top-0 z-[1000]"
      :style="offsetTop"
    >
      <Spotify />
    </div>
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script>
  export default {
  data() {
    return {
      scrollPos: 0,
    };
  },
  computed: {
    offsetTop() {
      return {
        top: `${this.scrollPos}px`,
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollPos = window.scrollY;
    },
  }
}
</script>
