<template>
  <div class="bg-white" dir="ltr">
    <div id="slide0" class="  bg-cover bg-center bg-fixed bg-black">
      <div class="relative slide w-full h-screen ">
        <div class="carousel-inner relative overflow-hidden h-screen z-1">
          <div class="carousel-item inset-0 relative h-screen ">
            <div id="carousel-text" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
              <h2 id="typewriter-title" class="lg:text-7xl text-4xl font-bold text-white text-left"></h2>
              <p id="typewriter-description" class="lg:text-2xl text-white"></p>
            </div>
          </div>
        </div>
      </div>

      <button type="button"
        class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
        data-carousel-prev @click="goPrev">
        <span class="border-0 text-white rounded-full p-2 ml-2 active:bg-rose-neon/50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path transform="scale(-1, 1) translate(-24, 0)" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="sr-only">Previous</span>
        </span>
      </button>
      <button type="button"
        class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
        data-carousel-next @click="goNext">
        <span class="border-0 text-white rounded-full p-2 ml-2 active:bg-rose-neon/50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          <span class="sr-only">Next</span>
        </span>
      </button>
      <button
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center px-4 group focus:outline-none 2xl:mb-20 mb-20"
        @click="goSlide" v-if="showButton">
        <span class="border-0 text-white rounded-full p-2 active:bg-rose-neon/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" class="bounce">
            <path fill="currentColor" fill-rule="evenodd"
              d="M2.22 5.22a.75.75 0 0 0 0 1.06l5.252 5.252a.75.75 0 0 0 1.06 0l5.252-5.252a.75.75 0 1 0-1.06-1.06L8.001 9.94L3.28 5.22a.75.75 0 0 0-1.06 0"
              clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </div>


    <div v-if="active == 0">
      <Monin />
    </div>
    <div v-if="active == 1">
      <Bourges2028 />
    </div>
  </div>
</template>

<script>
import Typewriter from 'typewriter-effect/dist/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Cookies from "js-cookie";

gsap.registerPlugin(ScrollToPlugin);
export default {
  setup() {
    definePageMeta({
      layout: "work",
    });
  },
  data() {
    return {
      active: 0,
      data: [
        { title: "MONIN", description: "mixologie", slide: 3 },
        { title: "CAPITALE EUROPEENNE DE LA CULTURE", description: "culture", slide: 4 },
        { title: "RESSOURCE CORPS-MENTAL", description: "beauté", slide: 0 },
        { title: "MAISON BOUILLON", description: "food", slide: 0 }
      ],
      titleTypewriter: null,
      descriptionTypewriter: null,
      slide: 0,
      showButton: false,
      intentObserver : null

    };
  },
  methods: {
    initTypewriter() {
      // Destroy existing instances if they exist
      if (this.titleTypewriter) {
        this.titleTypewriter.stop();
      }
      if (this.descriptionTypewriter) {
        this.descriptionTypewriter.stop();
      }

      // Create new typewriter instances
      this.titleTypewriter = new Typewriter(document.getElementById('typewriter-title'), {
        loop: false,
        delay: 50,
        cursor: null
      });

      this.descriptionTypewriter = new Typewriter(document.getElementById('typewriter-description'), {
        loop: false,
        delay: 100,
        cursor: null
      });

      this.titleTypewriter.typeString(this.data[this.active].title).start();
      setTimeout(() => {
        this.descriptionTypewriter.typeString(this.data[this.active].description).start();
      }, 1000);
    },
    goPrev() {
      this.showButton = false;
      this.active = this.active > 0 ? this.active - 1 : this.data.length - 1;
      this.slide = 0
      this.initTypewriter();
      if(this.data[this.active].slide > 0){
      setTimeout(() => {
      this.showButton = true;
    }, 2500);
    }
    },
    goNext() {
      this.showButton = false;
      this.active = this.active < this.data.length - 1 ? this.active + 1 : 0;
      this.slide = 0
      this.initTypewriter();
      if(this.data[this.active].slide > 0){
      setTimeout(() => {
      this.showButton = true;
    }, 2500);
    }
    },
    goSlide() {
      this.slide = 1
      gsap.to(window, { duration: 2, scrollTo: "#slide1" });
    }
  },

  mounted() {
    this.initTypewriter();
    // this.autoScrollInterval = setInterval(this.goNext, 10000);
    if(this.data[this.active].slide > 0){
      setTimeout(() => {
      this.showButton = true;
    }, 2500);
    }
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
    this.intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => {
        // Vérifiez si le slide n'est pas le premier
        if (this.slide > 0) {
          this.slide--; // Décrémentez le slide
          gsap.to(window, { duration: 2, scrollTo: "#slide" + this.slide });
        }
      },
      onDown: () => {
        console.log("test")
        if (this.slide < this.data[this.active].slide - 1) {
          this.slide++; // Incrémentez le slide
          gsap.to(window, { duration: 2, scrollTo: "#slide" + this.slide });
        } else {
          this.slide++;
          gsap.to(window, { duration: 2, scrollTo: "#footer" });
        }
      },
      tolerance: 100,
      preventDefault: true,
    });

  }
},
  unmounted() {
    if (this.titleTypewriter) {
      this.titleTypewriter.stop();
    }
    if (this.descriptionTypewriter) {
      this.descriptionTypewriter.stop();
    }
    if (this.intentObserver) {
      this.intentObserver.kill(); // ou la méthode appropriée pour désactiver
      this.intentObserver = null;
    }
  }, created() {
    // Lorsque le composant est créé, vérifiez si un cookie de langue existe
    const savedLang = Cookies.get("i18n_language");

    if (savedLang) {
      // Si un cookie existe, utilisez-le pour définir la langue
      this.$i18n.locale = savedLang;
    } else {
      // Sinon, utilisez la langue par défaut de votre application
      this.$i18n.locale = "fr"; // Mettez la langue par défaut de votre choix
    }
  },
};
</script>

<style>
.y.mandatory-scroll-snapping {
  scroll-snap-type: y mandatory;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }
}

.bounce {
  animation: bounce 2s infinite;
}
</style>