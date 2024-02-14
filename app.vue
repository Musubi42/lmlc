<template>
  <div>
    <NuxtLayout />
    <div
      class="fixed w-screen bottom-0 bg-white mix-blend-difference border-t-2 border-gray-200"
    >
      <Music />
    </div>
  </div>
</template>

<script>

export default {
  setup() {
    // definePageMeta({
    //   layout: "default",
    // });
  },
  mounted() {
  },
}
</script>