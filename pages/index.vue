<template>
  <div class="">
    <div class="h-[80vh] mt-60 mb-20">
      <tableau />
    </div>
    <div class="font-medium text-6xl mx-[10%] mb-80">
      <div
        id="first-paragraph"
        class="flex flex-row flex-wrap whitespace-pre-wrap"
      >
        <p
          v-for="(word, index) in firstParagraphWords"
          :key="index"
          :style="{ opacity: getOpacityFirstParagraph(index) }"
          class="whitespace-pre-line mr-4 mb-4"
          v-html="word"
        ></p>
      </div>
      <br />
      <br />
      <div
        id="second-paragraph"
        class="flex flex-row flex-wrap whitespace-pre-wrap"
      >
        <p
          v-for="(word, index) in secondParagraphWords"
          :key="index"
          :style="{ opacity: getOpacitySecondParagraph(index) }"
          class="whitespace-pre-line mr-4 mb-4"
          v-html="word"
        ></p>
      </div>
      <br />
      <br />
      <div class="flex flex-row flex-wrap whitespace-pre-wrap">
        <p
          v-for="(word, index) in thirdParagraphWords"
          :key="index"
          :style="{ opacity: getOpacityThirdParagraph(index) }"
          class="whitespace-pre-line mr-4 mb-4"
          v-html="word"
        ></p>
      </div>
    </div>
    <contactSVG
      class="text-[65px] w-auto fixed left-4 bg-transparent bottom-0 animate-spin-slow color-white"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPos: 0,
      firstParagraphText:
        "Nous sommes une équipe de communicants, de créatifs, de développeurs et de réalisateurs, tous experts dans leurs domaines. Passionnés, nous sommes constamment à la recherche de tendances créatives et d’innovations technologiques.",
      secondParagraphText:
        "Nous croyons à la synergie entre le savoir-faire, l’importance de l’innovation et le pouvoir des émotions pour créer des projets uniques.",
      thirdPararaphText:
        "Avec nos clients, ce sont des histoires sur le long terme que nous écrivons.",
      firstParagraphHeight: 0,
      secondParagraphHeight: 0,
      scrollSpeed: 20,
      adjustByDevice: 160,
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
    adjustHeightByDevice() {
      // Trouver le moyen d'ajuster le moment ou le texte apparait en fonction de la taille de l'écran
      return 0;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    // document.getElementById("first-paragraph").;
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      this.firstParagraphHeight =
        document.getElementById("first-paragraph").offsetHeight;
      this.secondParagraphHeight =
        document.getElementById("second-paragraph").offsetHeight;
      this.scrollPos = window.scrollY;
    },
  getMiddleOfScreen() {
    // return window.innerHeight /2;
  },
  getOpacityFirstParagraph(index) {
    const middleOfScreen = this.getMiddleOfScreen();
    const opacityChangeStart = index * this.scrollSpeed + middleOfScreen - this.adjustByDevice;
    const opacityChangeEnd = opacityChangeStart + 50;

    if (this.scrollPos < opacityChangeStart) {
      return 0.2;
    } else if (this.scrollPos >= opacityChangeStart && this.scrollPos <= opacityChangeEnd) {
      return (this.scrollPos - opacityChangeStart) / (opacityChangeEnd - opacityChangeStart);
    } else {
      return 1;
    }
  },
  getOpacitySecondParagraph(index) {
    const middleOfScreen = this.getMiddleOfScreen();
    // Calculate where the second paragraph starts on the page
    const paragraphStart = this.firstParagraphHeight + this.adjustByDevice;
    // Calculate the points where the opacity will start and end changing
    const opacityChangeStart = paragraphStart + (index * this.scrollSpeed) - middleOfScreen;
    const opacityChangeEnd = opacityChangeStart + 50;

    // Adjust opacity based on the scroll position
    if (this.scrollPos < opacityChangeStart) {
      return 0.2;
    } else if (this.scrollPos >= opacityChangeStart && this.scrollPos <= opacityChangeEnd) {
      // Linearly interpolate the opacity
      return 0.2 + (0.8 * (this.scrollPos - opacityChangeStart) / (opacityChangeEnd - opacityChangeStart));
    } else {
      return 1;
    }
  },
  getOpacityThirdParagraph(index) {
    const middleOfScreen = this.getMiddleOfScreen();
    // Calculate where the third paragraph starts on the page
    const paragraphStart = this.firstParagraphHeight + this.secondParagraphHeight + this.adjustByDevice + 50; // added 50 as per your note
    // Calculate the points where the opacity will start and end changing
    const opacityChangeStart = paragraphStart + (index * this.scrollSpeed) - middleOfScreen;
    const opacityChangeEnd = opacityChangeStart + 50;

    // Adjust opacity based on the scroll position
    if (this.scrollPos < opacityChangeStart) {
      return 0.2;
    } else if (this.scrollPos >= opacityChangeStart && this.scrollPos <= opacityChangeEnd) {
      // Linearly interpolate the opacity
      return 0.2 + (0.8 * (this.scrollPos - opacityChangeStart) / (opacityChangeEnd - opacityChangeStart));
    } else {
      return 1;
    }
  }
},
};
</script>

<script setup>
import contactSVG from "assets/icons/contact.svg";
</script>
