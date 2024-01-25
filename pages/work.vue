<template>
  <div class=" bg-cover bg-center bg-fixed bg-interactive-whiteboard">
    <div id="carousel-container" class="relative w-full h-screen ">
      <!-- Background Image -->
      <div class="absolute top-0 left-0 w-full h-full z-0 opacity-100 transition-opacity"
        :class="{ 'opacity-0': hideCarousel }"
        :style="{ 'transform': `scale(${imageScale})`, 'transition': 'left 0.5s ease-in-out, top 1s ease-in-out', 'left': imageLeft + 'vw', 'top': imageTop + 'vh' }">
        <img :src="slides[currentSlide].image" class="object-cover w-full h-full transition-transform transform"
          alt="{{slides[currentSlide].alt}}">
      </div>

      <!-- Carousel Text -->
      <div id="carousel-text" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <h2 class="text-9xl font-bold">{{ slides[currentSlide].title }}</h2>
        <p class="text-2xl">{{ slides[currentSlide].description }}</p>
      </div>

      <!-- controle -->
      <button type="button"
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev @click="prevSlide">
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 1 1 5l4 4" />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button type="button"
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next @click="nextSlide">
        <span
          class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m1 9 4-4-4-4" />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
    </div>

    <div class="fixed-background bg-cover bg-center h-screen bg-fixed flex items-center justify-center bg-interactive-whiteboard mt-96">
  <div class="container fixed-background-content relative z-10">
    <div class="flex flex-row">
      <div class="basis-1/2">
        <div id="monElement" class="flotter-container ">
          <img src="/assets/images/sac-bleu.png" alt="Image à flotter" class="flotter-image">
        </div>
      </div>
      <div class="basis-1/4"></div>
      <div class="basis-1/2"></div>
    </div>

    <div class="flex sticky text-container text-black text-4xl font-bold z-1">
      <p class="text-black">
        La quête infinie de l'humanité pour comprendre l'univers trouve son expression la plus audacieuse dans
        l'exploration spatiale. Des sondes qui parcourent les confins du système solaire aux télescopes puissants qui
        scrutent les mystères des étoiles lointaines, chaque mission spatiale élargit notre compréhension de l'espace
        et de notre place en son sein.
      </p>
    </div>

    <div class="flex flex-row">
      <div class="basis-1/2"></div>
      <div class="basis-1/4"></div>
      <div class="basis-1/2"></div>
    </div>

    <div class="text-container text-black text-4xl font-bold my-52">
      <p class="text-black">
        Dans un monde confronté à des défis environnementaux croissants, la durabilité est devenue un impératif. De la
        réduction des émissions de carbone à la préservation de la biodiversité, les efforts pour créer un avenir plus
        durable s'étendent à tous les domaines de la société. Les choix que nous faisons aujourd'hui façonnent la
        qualité de vie des générations futures.
      </p>
    </div>

    <div class="flex flex-row">
      <div class="basis-1/2"></div>
      <div class="basis-1/4">
        <div id="monElement" class="flotter-container ">
          <img src="/assets/images/sac-bleu.png" alt="Image à flotter" class="flotter-image">
        </div>
      </div>
      <div class="basis-1/2"></div>
    </div>

    <div class="text-container text-black text-4xl font-bold mb-96">
      <p class="text-black texts">
        L'exploration spatiale a captivé l'imagination de l'humanité depuis des décennies. Des premiers pas de l'homme
        sur la Lune aux missions robotiques qui explorent les confins de notre système solaire, l'aventure spatiale
        continue de repousser les limites de notre compréhension. Chaque découverte, chaque cliché de planètes
        lointaines, nous offre un aperçu fascinant de l'univers infini qui nous entoure.
      </p>
    </div>

    <div class="flex flex-row">
      <div class="basis-1/2">
        <div id="monElement" class="flotter-container">
          <img src="/assets/images/sac-bleu.png" alt="Image à flotter" class="flotter-image">
        </div>
      </div>
      <div class="basis-1/4"></div>
      <div class="basis-1/2"></div>
    </div>

    <div class="h-96"></div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      hideCarousel: false,
      imageScale: 1,
      imageLeft: 0,
      imageTop: 0,
      slides: [
        { image: "/services.png", title: "Titre 1", description: "Description 1", alt: "truc" },
        { image: "/talents.png", title: "Titre 2", description: "Description 2", alt: "truc" },
      ],
    };
  },
  methods: {
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    handleScroll() {
      const threshold = 50;
      const scrollY = window.scrollY;

      if (scrollY > threshold && !this.hideCarousel) {
        this.hideCarousel = true;
        this.imageScale = 0.3;
        this.imageLeft = -35;
        this.imageTop = -10;
      } else if (scrollY <= threshold && this.hideCarousel) {
        this.hideCarousel = false;
        this.imageScale = 1;
        this.imageLeft = 0;
        this.imageTop = 0;
      }
    },
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
.text-container {
  z-index: 100;
  position: relative;
}

.flotter-container {
  position: absolute;
  animation: flotterAnimation 2s ease-in-out infinite alternate;
  z-index: 0; /* Ajustez cette valeur si nécessaire */
}

.flotter-image {
  width: 50%;
  height: 50%;
}

.texts{
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
