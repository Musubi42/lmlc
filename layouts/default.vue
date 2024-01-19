<template>
  <div>
    <Header />
    <NuxtPage />
    <Footer />
    <div
      class="fixed w-screen bottom-0 opacity-70 backdrop-blur-3xl bg-white mix-blend-difference"
    >
      <!-- <Spotify /> -->
      <Music />
    </div>
    <CustomCursor />
  </div>
</template>

// <script>
// import CustomCursor from '~/components/CustomCursor.vue';

// export default {
//   components: {
//     CustomCursor
//   },
//   mounted() {
//     this.$nuxt.config.globalProperties.$customCursor = this.$refs.customCursor;
//   }
// };
// </script> 
