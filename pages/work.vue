<template>
  <div id="caroussel" class="bg-cover bg-center bg-fixed bg-black">
    <div class="relative slide w-full h-screen ">
      <div class="carousel-inner relative overflow-hidden h-screen z-1">
        <div 
          class="carousel-item inset-0 relative h-screen ">
            <div id="carousel-text"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
              <h2 id="typewriter-title" class="text-7xl font-bold text-white text-left"></h2>
              <p id="typewriter-description" class="text-2xl text-white"></p>
            </div>
        </div>
      </div>
    </div>

    <button type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
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
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
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
import Typewriter from 'typewriter-effect/dist/core';

export default {
  data() {
    return {
      active: 0,
      data: [
        { title: "MONIN", description: "mixologie" },
        { title: "CAPITALE EUROPEENNE DE LA CULTURE", description: "culture" },
        { title: "RESSOURCE CORPS-MENTAL", description: "beauté" },
        { title: "MAISON BOUILLON", description: "food" }
      ],
      titleTypewriter: null,
      descriptionTypewriter: null,
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
        cursor: "|"
      });
      this.descriptionTypewriter = new Typewriter(document.getElementById('typewriter-description'), {
        loop: false,
        delay: 100,
        cursor: "|"
      });

      this.titleTypewriter.typeString(this.data[this.active].title).start();
      this.descriptionTypewriter.typeString(this.data[this.active].description).start();
    },
    goPrev() {
      this.active = this.active > 0 ? this.active - 1 : this.data.length - 1;
      this.initTypewriter();
    },
    goNext() {
      this.active = this.active < this.data.length - 1 ? this.active + 1 : 0;
      this.initTypewriter();
    }
  },
  watch: {
    active() {
      this.$nextTick(() => {
        this.initTypewriter();
      });
    }
  },
  mounted() {
    this.initTypewriter();
  },
  beforeDestroy() {
    if (this.titleTypewriter) {
      this.titleTypewriter.stop();
    }
    if (this.descriptionTypewriter) {
      this.descriptionTypewriter.stop();
    }
  }
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
