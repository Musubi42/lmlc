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
      headerStyle: 1,
      pastYPosition: 0,
    };
  },
  methods: {
    handleScroll() {
      this.headerStyle = this.pastYPosition < (window.scrollY || window.pageYOffset) ? 0 : 1;
      this.pastYPosition = (window.scrollY || window.pageYOffset);
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
