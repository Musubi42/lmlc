<template>
  <div>
    <Header :dynamicStyle="headerStyle" class="fixed" />
    <NuxtPage />
    <Footer />
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
  methods: {
    handleScroll() {
      const actualYPosition = window.scrollY || window.pageYOffset;
      this.headerStyle.opacity = this.pastYPosition < actualYPosition ? 0 : 1;
      this.pastYPosition = actualYPosition;
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
