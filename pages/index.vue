<template>
  <div class="">
    <div class="h-[60vh]"></div>
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
        "Nous sommes une équipe de communiquants, de créatifs, de developpeurs et de réalisateurs, tous experts dans leurs domaines. Passionnés, nous sommes constamment à la recherche de tendances créatives et d’innovations technologiques.",
      secondParagraphText:
        "Nous croyons à la synergie entre le savoir-faire, l&#8216importance de linnovation et le pouvoir des émotions pour créer des projets uniques.",
      thirdPararaphText:
        "Avec nos clients, ce sont des histoires sur le long terme que nous écrivons.",
      firstParagraphHeight: 0,
      secondParagraphHeight: 0,
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
    window.addEventListener("scroll", this.handleScroll);
    // document.getElementById("first-paragraph").;
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll(event) {
      // console.log(event);
      // Capter la taille du texte, pour savoir quel texte est affiché sur quelle ligne
      // Maper le tout dans un tableau
      // Calculer la position du scroll
      // Afficher le texte correspondant
      this.firstParagraphHeight =
        document.getElementById("first-paragraph").offsetHeight;
      console.log(this.firstParagraphHeight);
      this.secondParagraphHeight =
        document.getElementById("second-paragraph").offsetHeight;
      this.scrollPos = window.scrollY;
    },
    getOpacityFirstParagraph(index) {
      const opacityChangeStart = index * 10;
      const opacityChangeEnd = opacityChangeStart + 50;

      if (this.scrollPos < opacityChangeStart) {
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        return 1;
      }
      // else {
      //   const progress =
      //     (this.scrollPos - opacityChangeStart) /
      //     (opacityChangeEnd - opacityChangeStart);
      //   return 0.2 + progress * 0.8;
      // }
    },
    getOpacitySecondParagraph(index) {
      const opacityChangeStart = index * 10;
      const opacityChangeEnd = opacityChangeStart + 50;

      if (this.scrollPos - this.firstParagraphHeight < opacityChangeStart) {
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        return 1;
      }
      // else {
      //   const progress =
      //     (this.scrollPos - opacityChangeStart) /
      //     (opacityChangeEnd - opacityChangeStart);
      //   return 0.2 + progress * 0.8;
      // }
    },
    getOpacityThirdParagraph(index) {
      const opacityChangeStart = index * 10;
      const opacityChangeEnd = opacityChangeStart + 50;

      if (
        this.scrollPos -
          (this.secondParagraphHeight + this.firstParagraphHeight) <
        opacityChangeStart
      ) {
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        return 1;
      }
      // else {
      //   const progress =
      //     (this.scrollPos - opacityChangeStart) /
      //     (opacityChangeEnd - opacityChangeStart);
      //   return 0.2 + progress * 0.8;
      // }
    },
  },
};
</script>

<script setup>
import contactSVG from "assets/icons/contact.svg";
</script>
