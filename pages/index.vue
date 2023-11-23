<template>
  <div id="home" class="">
    <div class="h-screen">
      <div class="absolute top-[250px] w-full">
        <p class="text-[2.5rem] font-black mx-auto w-[65%] z-50">
          AGENCE DE COMMUNICATION 360, DIGITAL NATIVE, ALLIANT CREATIVITE ET
          TECHNOLOGIE
        </p>
      </div>
      <div class="absolute w-full h-[65%] bottom-0 shadow-sm tableau-shadow">
        <tableau />
      </div>
    </div>
    <!-- <div class="h-[60vh] mt-60 mb-20">
      Ajoute au-dessus du tableau le texte et le faire descendre 
      <div class="absolute top-[250px] w-full">
        <p class="text-[2.5rem] font-black mx-auto w-[65%]">
          AGENCE DE COMMUNICATION 360, DIGITAL NATIVE, ALLIANT CREATIVITE ET
          TECHNOLOGIE
        </p>
      </div>
      <tableau />
    </div> -->
    <div class="font-medium text-6xl mx-[10%]">
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
      id="contact"
      class="text-[65px] text-blue w-auto fixed left-4 bg-transparent bottom-0 contact-spin color-white"
    />
  </div>
</template>

<style scoped>
/* @supports (-webkit-appearance: none) { */
.blend-mode {
  mix-blend-mode: difference;
}
/* } */
.contact-spin {
  animation-name: spin;
  animation-duration: 7000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.tableau-shadow {
  box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.1),
    0px -5px 10px 1px rgba(0, 0, 0, 0.1);
}
</style>

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
    this.supportBlendMode();
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.handleContact);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.handleContact);
  },
  methods: {
    supportBlendMode() {
      console.log(navigator.userAgent);
      if (
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
      ) {
        document.getElementById("contact").classList.add("blend-mode");
        // document.body.classList.add("safari");
      }
    },
    handleScroll(event) {
      this.firstParagraphHeight =
        document.getElementById("first-paragraph").offsetHeight;
      this.secondParagraphHeight =
        document.getElementById("second-paragraph").offsetHeight;
      this.scrollPos = window.scrollY;
    },
    handleContact() {
      const fixedElement = document.querySelector("#contact");

      var bottomElement = document.elementFromPoint(
        window.innerWidth / 2,
        window.innerHeight - 1
      );

      if (bottomElement?.hasAttribute("data-footer-element")) {
        // fixedElement.style.backgroundColor = "black";
      } else {
        // fixedElement.style.backgroundColor = "white";
      }
    },
    getOpacityFirstParagraph(index) {
      const opacityChangeStart = index * this.scrollSpeed;
      const opacityChangeEnd = opacityChangeStart + 50;

      if (this.scrollPos - this.adjustByDevice < opacityChangeStart) {
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        return 1;
      }
    },
    getOpacitySecondParagraph(index) {
      const opacityChangeStart = index * this.scrollSpeed;
      const opacityChangeEnd = opacityChangeStart + 50;

      if (
        this.scrollPos - this.firstParagraphHeight - this.adjustByDevice <
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

      // Pour une raison que j'ignore, je dois rajouter plus de height pour que le texte se mette à apparaitre au bon moment
      const heightPlus = 50;

      if (
        this.scrollPos -
          (this.secondParagraphHeight + this.firstParagraphHeight) -
          this.adjustByDevice -
          heightPlus <
        opacityChangeStart
      ) {
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        return 1;
      }
    },
  },
  getOpacityFirstParagraph(index) {
    const middleOfScreen = this.getMiddleOfScreen();
    const opacityChangeStart =
      index * this.scrollSpeed + middleOfScreen - this.adjustByDevice;
    const opacityChangeEnd = opacityChangeStart + 50;

    if (this.scrollPos < opacityChangeStart) {
      return 0.2;
    } else if (
      this.scrollPos >= opacityChangeStart &&
      this.scrollPos <= opacityChangeEnd
    ) {
      return (
        (this.scrollPos - opacityChangeStart) /
        (opacityChangeEnd - opacityChangeStart)
      );
    } else {
      return 1;
    }
  },
  getOpacitySecondParagraph(index) {
    const middleOfScreen = this.getMiddleOfScreen();
    // Calculate where the second paragraph starts on the page
    const paragraphStart = this.firstParagraphHeight + this.adjustByDevice;
    // Calculate the points where the opacity will start and end changing
    const opacityChangeStart =
      paragraphStart + index * this.scrollSpeed - middleOfScreen;
    const opacityChangeEnd = opacityChangeStart + 50;

    // Adjust opacity based on the scroll position
    if (this.scrollPos < opacityChangeStart) {
      return 0.2;
    } else if (
      this.scrollPos >= opacityChangeStart &&
      this.scrollPos <= opacityChangeEnd
    ) {
      // Linearly interpolate the opacity
      return (
        0.2 +
        (0.8 * (this.scrollPos - opacityChangeStart)) /
          (opacityChangeEnd - opacityChangeStart)
      );
    } else {
      return 1;
    }
  },
  getOpacityThirdParagraph(index) {
    const middleOfScreen = this.getMiddleOfScreen();
    // Calculate where the third paragraph starts on the page
    const paragraphStart =
      this.firstParagraphHeight +
      this.secondParagraphHeight +
      this.adjustByDevice +
      50; // added 50 as per your note
    // Calculate the points where the opacity will start and end changing
    const opacityChangeStart =
      paragraphStart + index * this.scrollSpeed - middleOfScreen;
    const opacityChangeEnd = opacityChangeStart + 50;

    // Adjust opacity based on the scroll position
    if (this.scrollPos < opacityChangeStart) {
      return 0.2;
    } else if (
      this.scrollPos >= opacityChangeStart &&
      this.scrollPos <= opacityChangeEnd
    ) {
      // Linearly interpolate the opacity
      return (
        0.2 +
        (0.8 * (this.scrollPos - opacityChangeStart)) /
          (opacityChangeEnd - opacityChangeStart)
      );
    } else {
      return 1;
    }
  },
};
</script>

<script setup>
import contactSVG from "assets/icons/contact.svg";
</script>
