<template>
  <div>
    <Header :dynamicStyle="headerStyle" class="fixed" />
    <NuxtPage />
    <Footer class="z-100000" />
    <CustomCursor />
  </div>
</template>

<style>
@import url("/public/css/custom.css");
</style>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: '/public/css/custom.css', // Path to your CSS file
        },
      ],
    }
  },
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
