<template>
  <div id="home" class="bg-white" @touchstart="isScrolling" ref="home">
  <!-- <div class="absolute h-screen w-screen bg-black z-50">
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/qBFDGnBjxNU?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
    <video autoplay loop width="100%" height="auto">
    <source src="/A-Tribute-To-Carrie-Fisher.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
  </div> -->
    <div class="h-[92vh]">
    <!-- TODO: Au format mobile ajouter un indicateur de scroll, chevron vers le bas -->
    <!-- Une fois le premier scroll faire disparaitre le chevron -->
      <div
        class=" w-full h-full"
      >
        <div id="tableau" class="w-screen font-extralight h-[95%] md:h-full">
        <!-- TODO: Cette façon de faire fait pété le tout -->
          <tableauTest v-if="!IntroAnimation && !isTableauPreFetchImagesLoading" v-cursorAnimation  />
          <!-- <tableauTest v-if="true" v-cursorAnimation :key="componentKey" /> -->
        </div>
        <!-- TODO : Changer où je trigger la fnc isScrolling -->
        <div 
          class="absolute bottom-14 flex md:hidden w-screen items-center justify-center appear-after-a-moment"
          v-if="isMobile && !hasScrolled"
        >
         <!--  :style="{ display: isMobile && !hasScrolled ? 'flex' : 'none' }" -->
         <!-- TODO: Pour Safari monter largement plus le chevron, tester sur Iphone -->
          <button type="" name="You can scroll from this section" class="absolute top-0" >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" class="bounce">
              <path fill="currentColor" fill-rule="evenodd" d="M2.22 5.22a.75.75 0 0 0 0 1.06l5.252 5.252a.75.75 0 0 0 1.06 0l5.252-5.252a.75.75 0 1 0-1.06-1.06L8.001 9.94L3.28 5.22a.75.75 0 0 0-1.06 0" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- TODO: Padding footer pour l'effet scroll : pb-20 md:pb-80 -->
    <div
      id="container"
      class=" font-medium mt-14 md:mt-32 md:max-w-[75%] text-[1.5rem] md:text-[2rem] xl:text-[3.2rem] leading-[1] mx-[5%] md:mx-[10%] pb-10 ">
      <div
        id="first-paragraph"
        class="flex flex-row flex-wrap whitespace-pre-wrap"
      >
        <p
          v-for="(word, index) in firstParagraphWords"
          :key="index"
          :style="{ opacity: getOpacityFirstParagraph(index) }"
          class="whitespace-pre-line mr-1 mb-2 md:mr-4 md:mb-4"
          v-html="word"
        ></p>
      </div>
      <br />
      <div
        id="second-paragraph"
        class="flex flex-row flex-wrap whitespace-pre-wrap"
      >
        <p
          v-for="(word, index) in secondParagraphWords"
          :key="index"
          :style="{ opacity: getOpacitySecondParagraph(index) }"
          class="whitespace-pre-line mr-1 mb-2 md:mr-4 md:mb-4"
          v-html="word"
        ></p>
      </div>
      <br />
      <div
        :ref="`container`"
        class="flex flex-row flex-wrap whitespace-pre-wrap"
      >
        <p
          v-for="(word, index) in thirdParagraphWords"
          :key="index"
          :style="{ opacity: getOpacityThirdParagraph(index) }"
          :ref="`pTag${index}`"
          class="whitespace-pre-line mr-1 mb-2 md:mr-4 md:mb-4"
          v-html="word"
        ></p>
      </div>
    </div>
    <!-- <contactSVG
      id="contact"
      class="text-[90px] font-medium text-blue w-auto fixed left-4 bg-transparent bottom-0 contact-spin color-white mix-blend-difference"
    /> -->
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.bounce {
  animation: bounce 2s infinite;
}

.appear-after-a-moment {
  /* opacity: 0; */
  animation: appear 2s;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "accueil",
      middleware: ["session"]
    });
    useSeoMeta({
      title: 'LMLC COMMUNICATION',
      ogTitle: 'My Amazing Site',
      description: 'This is my amazing site, let me tell you all about it.',
      ogDescription: 'This is my amazing site, let me tell you all about it.',
      ogImage: 'https://example.com/image.png',
      twitterCard: 'summary_large_image',
    });
    
    const isIntroAnimation = ref(true);
    const IntroAnimation = stateIntroAnimation();

    watch(IntroAnimation, (newValue, oldValue) => {
      isIntroAnimation.value = newValue;
      IntroAnimation.value = newValue;
    });

    const isFirstVisit = ref(true);
    const firstVisit = stateFirstVisit();

    watch(firstVisit, (newValue, oldValue) => {
      isFirstVisit.value = newValue;
      firstVisit.value = newValue;

      if (!firstVisit.value) {
      isIntroAnimation.value = false;
      IntroAnimation.value = false;
    }
    });

    // Des fois, si je met un clg le if s'exec bien
    if (!firstVisit.value) {
      // this.componentKey++;
      isIntroAnimation.value = false;
      IntroAnimation.value = false;
    }

    const isMobile = stateIsMobile();

    const isTableauPreFetchImagesLoading = tableauPreFetchImagesLoading();

    // console.log(isTableauPreFetchImagesLoading.value);

    return {
      IntroAnimation,
      isIntroAnimation,
      isFirstVisit,
      firstVisit,
      isMobile,
      isTableauPreFetchImagesLoading,
    }
  },
  data() {
    return {
      scrollPos: 0,
      firstParagraphText: this.$t("firstParagraph"),
      secondParagraphText: this.$t("secondParagraph"),
      thirdPararaphText: this.$t("thirdParagraph"),
      textIntro: this.$t("intro"),
      firstParagraphHeight: 0,
      secondParagraphHeight: 0,
      scrollSpeed: this.calculateScrollSpeed(),
      windowHeight: 0,
      paragraphSpacing: 0,
      oui: null,
      componentKey: ref(1),
      hasScrolled: ref(false),
      totalScrolledDistance : 0,
      startY : 0,
    };
  },
  computed: {
    firstParagraphWords() {
      return this.firstParagraphText.split(" ");
    },
    secondParagraphWords() {
      return this.secondParagraphText.split(" ");
    },
    thirdParagraphWords() {
      return this.thirdPararaphText.split(" ");
    },
  },
  mounted() {
    this.componentKey++;
    // Get the language change of SwitchLanguage component
    watch(() => this.$i18n.locale, () => {
      this.setLanguageTexts();
    });
    
    this.setLanguageTexts();
    
    this.$nextTick(() => {
      window.addEventListener("scroll", this.handleScroll);
      this.paragraphSpacing = document.getElementById("paragraphSpacing");
      this.windowHeight = window.innerHeight / 2 + 100;

      let pTag = this.$refs.pTag0[0];
      let style = window.getComputedStyle(pTag);
      let brHeight = style.getPropertyValue("line-height");
      const ratio = 1.21;
      this.paragraphSpacing = parseInt(brHeight) * ratio * 0.5;

      this.scrollSpeed = this.calculateScrollSpeed(window.innerWidth);

      window.addEventListener("resize", () => {
        this.scrollSpeed = this.calculateScrollSpeed(window.innerWidth);
        this.windowHeight = window.innerHeight / 2 + 100;
      });
    });

    window.addEventListener("scroll", this.handleScroll);

    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove, { passive: true });
  },
  
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);

    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
  },

  methods: {
    handleTouchStart(event){
      this.startY = event.touches[0].clientY;
    },

    handleTouchMove(event){
      const currentY = event.touches[0].clientY;
      this.totalScrolledDistance += Math.abs(currentY - this.startY);
      this.startY = currentY;

      if (this.totalScrolledDistance >= 50 && !this.hasScrolled.value) {
        this.hasScrolled = true;
      }
    },

    calculateScrollSpeed(width) {
      if (width <= 350) {
        return 8;
      } else if (width <= 521) {
        return 10;
      } else if (width <= 670) {
        return 5;
      } else if (width <= 780) {
        return 9;
      } else if (width <= 1024) {
        return 8.5;
      } else if (width <= 1280) {
        return 6;
      } else if (width <= 1440) {
        return 15;
      } else if (width <= 1920) {
        return 13;
      } else {
        return 10;
      }
    },

    // calculate the answer with web worker create from /assets/workers/worker.js
    sumNumWorkerVite() {
      return new Promise((resolve, reject) => {
          const worker = new MyWorker()
          worker.postMessage(numToSum.value);
          worker.addEventListener('message', (e) => {
              if (e.data) {
                  resolve(e.data)
                  worker.terminate()
              }
          }, false);
      })
    },

    handleScroll(event) {
      this.firstParagraphHeight =
        document.getElementById("first-paragraph").offsetHeight;
      this.secondParagraphHeight =
        document.getElementById("second-paragraph").offsetHeight;
      this.scrollPos = window.scrollY;
    },

    getOpacityFirstParagraph(index) {
      const opacityChangeStart = index * this.scrollSpeed;
      const opacityChangeEnd = opacityChangeStart + 50;
      let adjustFirstParagrah = 40;

      if (
        this.scrollPos - this.windowHeight + adjustFirstParagrah <
        opacityChangeStart
      ) {
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        return 1;
      }
    },

    getOpacitySecondParagraph(index) {
      const opacityChangeStart = index * this.scrollSpeed;
      const opacityChangeEnd = opacityChangeStart + 50;

      let adjustSecondParagraph = 20;
      if (
        this.scrollPos -
          this.firstParagraphHeight -
          this.windowHeight +
          adjustSecondParagraph <
        opacityChangeStart
      ) {
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        return 1;
      }
    },

    getOpacityThirdParagraph(index) {
      const opacityChangeStart = index * this.scrollSpeed;
      const opacityChangeEnd = opacityChangeStart + 50;
      let adjustThirdParagraph = 40;

      if (
        this.scrollPos -
          (this.secondParagraphHeight + this.firstParagraphHeight) -
          this.windowHeight -
          adjustThirdParagraph <
        opacityChangeStart
      ) {
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        return 1;
      }
    },

    setLanguageTexts() {
      this.firstParagraphText = this.$t("firstParagraph");
      this.secondParagraphText = this.$t("secondParagraph");
      this.thirdPararaphText = this.$t("thirdParagraph");
    },
  },


};
</script>
