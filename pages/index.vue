<template>
  <div id="home" class="bg-white">
    <div class="h-screen">
      <div class="absolute top-[100px] md:top-[200px] w-full z-10">
        <p
          class="text-[1rem] md:text-[2rem] xl:text-[3.2rem] font-black mx-auto w-[90%] md:w-[65%]"
        >
          {{ title }}
        </p>
      </div>
      <div
        class="absolute w-full h-[85%] md:h-[65%] bottom-0 shadow-sm tableau-shadow"
      >
        <tableau />
      </div>
    </div>
    <div
      id="container"
      class="font-medium md:max-w-[75%] text-[1.5rem] md:text-[2rem] xl:text-[3.2rem] leading-[1] mx-[5%] md:mx-[10%] pb-20 md:pb-80"
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
    <contactSVG
      id="contact"
      class="text-[90px] font-medium text-blue w-auto fixed left-4 bg-transparent bottom-0 contact-spin color-white mix-blend-difference"
    />
    <!-- <div class="fixed top-1/2 left-0 transform -translate-y-1/2">
      <div class="h-1 w-2 bg-black"></div>
    </div> -->
  </div>
</template>

<style scoped>
.blend-mode {
  mix-blend-mode: difference;
}

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
import Cookies from "js-cookie";
export default {
  data() {
    return {
      scrollPos: 0,
      title:
        "AGENCE DE COMMUNICATION 360, DIGITAL NATIVE, ALLIANT CREATIVITE ET TECHNOLOGIE",
      firstParagraphText:
        "Nous sommes une équipe de communicants, de créatifs, de développeurs et de réalisateurs, tous experts dans leurs domaines. Passionnés, nous sommes constamment à la recherche de tendances créatives et d’innovations technologiques.",
      secondParagraphText:
        "Nous croyons à la synergie entre le savoir-faire, l’importance de l’innovation et le pouvoir des émotions pour créer des projets uniques.",
      thirdPararaphText:
        "Avec nos clients, ce sont des histoires sur le long terme que nous écrivons.",
      firstParagraphHeight: 0,
      secondParagraphHeight: 0,
      scrollSpeed: this.calculateScrollSpeed(),
      windowHeight: 0,
      paragraphSpacing: 0,
    };
  },
  // scrollSpeed: 9, for big screens

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
    this.$nextTick(() => {
      // Wait for the DOM to be updated
      // this.supportBlendMode();
      window.addEventListener("scroll", this.handleScroll);
      // Paragraph spacing
      this.paragraphSpacing = document.getElementById("paragraphSpacing");

      this.windowHeight = window.innerHeight / 2 + 100;

      let pTag = this.$refs.pTag0[0]; // get the first <p> element
      let style = window.getComputedStyle(pTag);
      let brHeight = style.getPropertyValue("line-height");
      const ratio = 1.21;
      this.paragraphSpacing = parseInt(brHeight) * ratio * 0.5;
      // this.paragraphSpacing = parseInt(brHeight) * ratio * nbBR;
      // console.log(this.paragraphSpacing);

      // Get the perfect scroll speed depending on the number of words per line
      // let mediumWordWidth = this.$refs.pTag6[0];
      // let oui = parseInt(
      //   window.getComputedStyle(mediumWordWidth).getPropertyValue("width")
      // );
      // let containerWidth = this.$refs.container.getBoundingClientRect().width;
      // this.scrollSpeed = Math.floor(containerWidth / oui);
      // console.log("scrollSpeed : " + this.scrollSpeed);
      this.scrollSpeed = this.calculateScrollSpeed(window.innerWidth);

      window.addEventListener("resize", () => {
        this.scrollSpeed = this.calculateScrollSpeed(window.innerWidth);

        this.windowHeight = window.innerHeight / 2 + 100;
        console.log("scrollSpeed : " + this.scrollSpeed);
      });
    });
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.handleContact);
    const language = Cookies.get("i18n_language") || "fr";
    this.setLanguageTexts(language);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.handleContact);

    window.removeEventListener("resize", () => {
      this.scrollSpeed = this.calculateScrollSpeed();
    });
  },
  methods: {
    calculateScrollSpeed(width) {
      console.log("width : " + width);
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
        return 9;
      } else if (width <= 1920) {
        return 13;
      } else {
        return 10;
      }
    },
    setLanguageTexts(language) {
      switch (language) {
        case "fr":
          this.title =
            "AGENCE DE COMMUNICATION 360, DIGITAL NATIVE, ALLIANT CREATIVITE ET TECHNOLOGIE";
          this.firstParagraph =
            "Nous sommes une équipe de communicants, de créatifs, de développeurs et de réalisateurs, tous experts dans leurs domaines. Passionnés, nous sommes constamment à la recherche de tendances créatives et d’innovations technologiques.";
          this.secondParagraph =
            "Nous croyons à la synergie entre le savoir-faire, l’importance de l’innovation et le pouvoir des émotions pour créer des projets uniques.";
          this.thirdParagraph =
            "Avec nos clients, ce sont des histoires sur le long terme que nous écrivons.";
          break;
        case "en":
          this.title =
            "360 COMMUNICATION AGENCY, DIGITAL NATIVE, COMBINING CREATIVITY AND TECHNOLOGY";
          this.firstParagraph =
            "we are a team of communicators, creatives, developers, and directors, all experts in their fields. Passionate, we are constantly on the search of creative trends and technological innovations.";
          this.secondParagraph =
            "we believe in the synergy of know-how, the importance of the innovation and the power of emotions to create unique projects.";
          this.thirdParagraph = "with our clients we write long-term stories.";
          break;
        case "it":
          this.title =
            "AGENZIA DI COMUNICAZIONE 360,  DIGITAL NATIVE, CHE UNISCE CREATIVITÀ E TECNOLOGIA";
          this.firstParagraph =
            "siamo un team di comunicatori, designer, sviluppatori e produttori, tutti esperti nei loro settori. Siamo appassionati di ciò che facciamo e siamo costantemente alla ricerca di tendenze creative e innovazioni tecnologiche.";
          this.secondParagraph =
            "crediamo nella sinergia tra il know-how, l'importanza dell'innovazione e il potere dell'emozione per creare progetti unici.";
          this.thirdParagraph =
            "con i nostri clienti, scriviamo storie a lungo termine.";
          break;
        default:
          this.title =
            "AGENCE DE COMMUNICATION 360, DIGITAL NATIVE, ALLIANT CREATIVITE ET TECHNOLOGIE";
          this.firstParagraph =
            "Nous sommes une équipe de communicants, de créatifs, de développeurs et de réalisateurs, tous experts dans leurs domaines. Passionnés, nous sommes constamment à la recherche de tendances créatives et d’innovations technologiques.";
          this.secondParagraph =
            "Nous croyons à la synergie entre le savoir-faire, l’importance de l’innovation et le pouvoir des émotions pour créer des projets uniques.";
          this.thirdParagraph =
            "Avec nos clients, ce sont des histoires sur le long terme que nous écrivons.";
      }
    },
    setLanguageTexts(language) {
      switch (language) {
        case "fr":
          this.title =
            "AGENCE DE COMMUNICATION 360, DIGITAL NATIVE, ALLIANT CREATIVITE ET TECHNOLOGIE";
          this.firstParagraph =
            "Nous sommes une équipe de communicants, de créatifs, de développeurs et de réalisateurs, tous experts dans leurs domaines. Passionnés, nous sommes constamment à la recherche de tendances créatives et d’innovations technologiques.";
          this.secondParagraph =
            "Nous croyons à la synergie entre le savoir-faire, l’importance de l’innovation et le pouvoir des émotions pour créer des projets uniques.";
          this.thirdParagraph =
            "Avec nos clients, ce sont des histoires sur le long terme que nous écrivons.";
          break;
        case "en":
          this.title =
            "360 COMMUNICATION AGENCY, DIGITAL NATIVE, COMBINING CREATIVITY AND TECHNOLOGY";
          this.firstParagraph =
            "we are a team of communicators, creatives, developers, and directors, all experts in their fields. Passionate, we are constantly on the search of creative trends and technological innovations.";
          this.secondParagraph =
            "we believe in the synergy of know-how, the importance of the innovation and the power of emotions to create unique projects.";
          this.thirdParagraph = "with our clients we write long-term stories.";
          break;
        case "it":
          this.title =
            "AGENZIA DI COMUNICAZIONE 360,  DIGITAL NATIVE, CHE UNISCE CREATIVITÀ E TECNOLOGIA";
          this.firstParagraph =
            "siamo un team di comunicatori, designer, sviluppatori e produttori, tutti esperti nei loro settori. Siamo appassionati di ciò che facciamo e siamo costantemente alla ricerca di tendenze creative e innovazioni tecnologiche.";
          this.secondParagraph =
            "crediamo nella sinergia tra il know-how, l'importanza dell'innovazione e il potere dell'emozione per creare progetti unici.";
          this.thirdParagraph =
            "con i nostri clienti, scriviamo storie a lungo termine.";
          break;
        default:
          this.title =
            "AGENCE DE COMMUNICATION 360, DIGITAL NATIVE, ALLIANT CREATIVITE ET TECHNOLOGIE";
          this.firstParagraph =
            "Nous sommes une équipe de communicants, de créatifs, de développeurs et de réalisateurs, tous experts dans leurs domaines. Passionnés, nous sommes constamment à la recherche de tendances créatives et d’innovations technologiques.";
          this.secondParagraph =
            "Nous croyons à la synergie entre le savoir-faire, l’importance de l’innovation et le pouvoir des émotions pour créer des projets uniques.";
          this.thirdParagraph =
            "Avec nos clients, ce sont des histoires sur le long terme que nous écrivons.";
      }
    },
    handleScroll(event) {
      this.firstParagraphHeight =
        document.getElementById("first-paragraph").offsetHeight;
      this.secondParagraphHeight =
        document.getElementById("second-paragraph").offsetHeight;
      this.scrollPos = window.scrollY;

      console.log("scrollSpeed : " + this.scrollSpeed);
    },
    getOpacityFirstParagraph(index) {
      const opacityChangeStart = index * this.scrollSpeed;
      const opacityChangeEnd = opacityChangeStart + 50;
      let adjustFirstParagrah = 40;

      if (
        this.scrollPos - this.windowHeight + adjustFirstParagrah <
        opacityChangeStart
      ) {
        // console.log("droite : " + (this.scrollPos - this.adjustByDevice));
        // console.log("gauche : " + opacityChangeStart);
        return 0.2;
      } else if (this.scrollPos > opacityChangeEnd) {
        // console.log("opacityChangeEnd : " + opacityChangeEnd);
        // console.log("scrollPos : " + this.scrollPos);

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

      // Pour une raison que j'ignore, je dois rajouter plus de height pour que le texte se mette à apparaitre au bon moment
      // const heightPlus = 50;

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
  },
};
</script>

<script setup>
import contactSVG from "assets/icons/contact.svg";
</script>
