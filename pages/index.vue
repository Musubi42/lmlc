<template>
  <div id="home" class="bg-white">
  <!-- <div class="absolute h-screen w-screen bg-black z-50">
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/qBFDGnBjxNU?autoplay=1&mute=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
    <video autoplay loop width="100%" height="auto">
    <source src="/A-Tribute-To-Carrie-Fisher.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>
  </div> -->
    <div class="h-[92vh]">
      <div
        class=" w-full h-[100%] md:h-[100%]"
      >
        <tableauTest v-if="!IntroAnimation" v-cursorAnimation :key="componentKey" />
      </div>
    </div>
    <!-- TODO: Padding footer pour l'effet scroll : pb-20 md:pb-80 -->
    <div
      id="container"
      class=" font-medium mt-16 md:max-w-[75%] text-[1.5rem] md:text-[2rem] xl:text-[3.2rem] leading-[1] mx-[5%] md:mx-[10%] pb-10 ">
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
.tableau-shadow {
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.1),
    0px -5px 10px 1px rgba(0, 0, 0, 0.1);
}
</style>

<script>
export default {
  // props: ["isIntroAnimation"],
  setup() {
    definePageMeta({
      layout: "accueil",
      middleware: ["first-visit"]
    });
    
    const isIntroAnimation = ref(true);
    const IntroAnimation = stateIntroAnimation();

    watch(IntroAnimation, (newValue, oldValue) => {
      isIntroAnimation.value = newValue;
      IntroAnimation.value = newValue;
    });

   

    return {
      IntroAnimation,
      isIntroAnimation
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
  },
  
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
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
