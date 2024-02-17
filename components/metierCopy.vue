<template>
  <section ref="metier" class="h-screen flex items-center scrollbar-hide w-full bg-black" :class="{ 'bg-transparent': !showOverlay }">
    <ServicesAnimation :metierHeight="sectionMetierHeight" :mousePositionY="mouseAbsolutePositionY" class="relative z-0 pointer-events-none" />
      <!-- <div v-if="showOverlay" class="absolute inset-0 bg-black transition-colors duration-1000" ></div> -->
      <div class="absolute my-auto z-10 w-full box-border px-8">
        <div class="relative flex flex-col md:flex-row gap-9 md:gap-2 mt-20 md:mt-0 md:mx-20 justify-around section-content font-extralight">
          <div class="flex-1 z-10">
            <h3 class="font-semibold text-2xl">stratégie</h3>
            <ul class="">
              <li>stratégie de communication</li>
              <li>stratégie marketing</li>
              <li>stratégie de marque</li>
            </ul>
          </div>

          <div class="flex-1">
            <h3 class="font-semibold text-2xl">branding</h3>
            <ul>
              <li>direction artistique</li>
              <li>identité visuelle</li>
              <li>plateforme de marque</li>
              <li>logo &#x26; charte graphique</li>
              <li>storytelling</li>
            </ul>
          </div>

          <div class="flex-1">
            <h3 class="font-semibold text-2xl">digital</h3>
            <ul>
              <li>social media</li>
              <li>community management</li>
              <li>développement web &#x26; design</li>
              <li>UX/UI</li>
              <li>apps</li>
            </ul>
          </div>

          <div class="min-w-[200px]">
            <h3 class="font-semibold text-2xl">brandcontent</h3>
            <ul>
              <li>production audiovisuelle</li>
              <li>shooting photo</li>
              <li>packshot</li>
              <li>motion design &#x26; 3D</li>
            </ul>
          </div>
        </div>
      </div>
  </section>
</template>

<style scoped>
@keyframes slideDown {
  from {
    transform: translateY(-500px);
  }
  to {
    transform: translateY(0);
  }
}

.section-content {
  transition: color 2s ease;
}

.section-content h3 {
  color: white;
  transition: color 2s ease;
}

.section-content ul {
  transform: translateY(-500px);
  color: white;
  animation: slideDown 2s ease forwards;
  animation-delay: 0.7s;
}

.bg-transparent .section-content h3,
.bg-transparent .section-content ul {
  color: black;
}
</style>


<script>
export default {
  data() {
    return {
      showOverlay: true,
      showContent: false,
      sectionMetierHeight: 0,
      mouseY: 0,
      mouseAbsolutePositionY: 0,
      scrollY: 0,
    };
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
      this.mouseAbsolutePositionY = this.mouseY + this.scrollY;
    },
    handleMouseMove(event) {
      this.mouseY = event.clientY;
      this.mouseAbsolutePositionY = this.mouseY + this.scrollY;
      // console.log(this.mouseAbsolutePositionY);
    },
  },
  mounted() {
    setTimeout(() => {
      this.showOverlay = false;
    }, 2000); // adjust delay as needed

    window.addEventListener("mousemove", this.handleScroll);
    window.addEventListener("mousemove", this.handleMouseMove);
    this.sectionMetierHeight = this.$refs.metier.offsetHeight;
  },
};
</script>


