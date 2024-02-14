<template>
  <section ref="metier" class="h-screen pt-40 scrollbar-hide border w-full">
    <ServicesAnimation :metierHeight="sectionMetierHeight" :mousePositionY="mouseAbsolutePositionY" class="relative z-0 pointer-events-none" />

    <transition name="fade">
      <div v-if="showContent" class="absolute z-10 w-full box-border px-8">
        <div class="relative flex flex-row gap-2 justify-around">
          <div class="flex-1 z-10">
            <h3 class="font-semibold text-xl">stratégie</h3>
            <ul>
              <li>stratégie et plan de communication</li>
              <li>stratégie marketing</li>
              <li>stratégie de marque</li>
            </ul>
          </div>

          <div class="flex-1">
            <h3 class="font-semibold text-xl">branding</h3>
            <ul>
              <li>direction artistique</li>
              <li>identité visuelle</li>
              <li>plateforme de marque</li>
              <li>logo &#x26; charte graphique</li>
              <li>storytelling</li>
            </ul>
          </div>

          <div class="flex-1">
            <h3 class="font-semibold text-xl">digital</h3>
            <ul>
              <li>social media</li>
              <li>community management</li>
              <li>développement web &#x26; design</li>
              <li>UX/UI</li>
              <li>apps</li>
            </ul>
          </div>

          <div class="min-w-[200px]">
            <h3 class="font-semibold text-xl">brandcontent</h3>
            <ul>
              <li>production audiovisuelle</li>
              <li>shooting photo</li>
              <li>packshot</li>
              <li>motion design &#x26; 3D</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showContent: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showContent = true;
    }, 1000); // adjust delay as needed
  },
  // ... rest of your script ...
};
</script>

<style scoped>
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter {
  opacity: 0;
}

h3 {
  animation: slideDown 1s forwards;
}

ul li {
  animation: slideFromLeft 1s forwards;
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideFromLeft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>