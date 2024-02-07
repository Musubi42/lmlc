<template>
  <div id="caroussel" class="bg-cover bg-center bg-fixed bg-black">
    <div class="relative slide w-full h-screen ">
      <div class="carousel-inner relative overflow-hidden h-screen z-1">
        <div v-for="(img, i) in images" :id="`slide-${i}`" :key="i" :class="`${active === i ? 'active' : 'left-full'}`"
          class="carousel-item inset-0 relative h-screen transform transition-all duration-1000 ease-in bg-black">

          <div id="carousel-text"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <h2 class="text-8xl font-bold text-white text-left">{{ img.title }}</h2>
            <p class="text-2xl text-white ">{{ img.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <button type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-prev @click="goPrev">
      <span class="border-0 text-white rounded-full p-2 ml-2 active:bg-rose-neon/50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path transform="scale(-1, 1) translate(-24, 0)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5l7 7-7 7" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
    <button type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      data-carousel-next @click="goNext">
      <span class="border-0 text-white rounded-full p-2 ml-2 active:bg-rose-neon/50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>

  <div v-if="active == 0">
    <Monin />
  </div>
  <div v-if="active == 1">
    <Bourges2028 />
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: 0,
      currentSlide: 0,
      hideCarousel: false,
      imageScale: 1,
      imageLeft: 0,
      imageTop: 0,
      active: 0,
      images: [
        { title: "MONIN", description: "mixologie", alt: "truc", backgroundColor: "#974dff" },
        { title: "CAPITALE EUROPEENNE DE LA CULTURE", description: "culture", alt: "truc", backgroundColor: "#974dff" },
        { title: "Titre 3", description: "Description 3", alt: "truc", backgroundColor: "#974dff" },
        { title: "Titre 4", description: "Description 4", alt: "truc", backgroundColor: "#974dff" },
      ],
      test: 0
    };
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY;

      // Check if the user has scrolled to a certain position to trigger the scroll to the client section
      const clientSectionOffset = document.getElementById("client").offsetTop;
      if (this.scrollPosition >= clientSectionOffset - window.innerHeight / 2) {
        this.scrollToClientSection();

        // Remove the scroll event listener after triggering the scroll
        window.removeEventListener("scroll", this.handleScroll);
      }
    },

    scrollToClientSection() {
      const clientSection = document.getElementById("client");

      // Use smooth scrolling to scroll to the client section
      clientSection.scrollIntoView({ behavior: "smooth" });
    },

    goPrev() {
      console.log("test");
      this.test--;

      if (this.test < 0) {
        this.test = this.images.length - 1;
      }

      this.active = this.test;
    },
    goNext() {
      console.log("test")
      this.test++;

      if (this.test > this.images.length - 1) {
        this.test = 0;
      }
      this.active = this.test;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
.left-full {
  left: -100%;
}

.carousel-item {
  float: left;
  position: relative;
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}

.text-container {
  z-index: 100;
  position: relative;
}

.flotter-container {
  position: absolute;
  animation: flotterAnimation 2s ease-in-out infinite alternate;
  z-index: 0;
  /* Ajustez cette valeur si nécessaire */
}

.flotter-image {
  width: 50%;
  height: 50%;
}

.texts {
  position: absolute;
}

@keyframes flotterAnimation {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10px);
  }
}
</style>
