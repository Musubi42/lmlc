<template>
  <div id="home" class="bg-white">
    <div class="h-[80vh]">
      <div
        class=" w-full h-[85%] md:h-[100%]"
      >
        <tableauTest class="cursor-pointer" v-cursorAnimation />
      </div>
    </div>
    <div
      id="container"
      class=" font-medium mt-8 md:max-w-[75%] text-[1.5rem] md:text-[2rem] xl:text-[3.2rem] leading-[1] mx-[5%] md:mx-[10%] pb-20 md:pb-80"
    >
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
import Typewriter from "typewriter-effect/dist/core";
import { defineAsyncComponent } from "vue";
import Music from "../components/Music.vue";

export default {
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

  watch: {
    "$i18n.locale": "setLanguageTexts",
  },

  mounted() {
    this.setLanguageTexts();
    // this.typeWriteText();
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
    typeWriteText() {
      const app = document.getElementById("text-intro");

      var customNodeCreator = function (character) {
        return document.createTextNode(character);
      };

      var typewriter = new Typewriter(app, {
        loop: false,
        delay: 35,
        cursor: "",
        onCreateTextNode: customNodeCreator,
      });

      typewriter.typeString(this.textIntro).pauseFor(300).start();

      // TODO : Supprimer le typewriter quand il a fini d'écrire et replace par le text en dur pour avoir la traduction qui fonctionne
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

<script setup>
import contactSVG from "assets/icons/contact.svg";
</script>
