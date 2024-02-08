<template>
  <div class="cursor-none">
    <div
      class="h-full bg-rose-neon w-10 md:w-80 right-0 fixed z-[200] transform translate-x-full"
      :class="{ animate: !isMenuOpen }"
      id="separation"
    ></div>
    <div
      class="bg-close h-screen bg-rose-neon flex flex-row items-center fixed z-[20] right-0 w-full md:w-1/2 transform translate-x-full"
      
      id="bg"
    >
      <div
        class="absolute right-0 z-auto transform translate-x-full"
        id="title"
        :class="{ animate: !isMenuOpen }"
        @mousemove="titleOffset"
      >
        <!-- Titre -->
        <!-- Capturer cet élémént et for each sur chacun de ses enfants -->
        <div
          class="text-[40px] md:text-[60px] xl:text-[70px] 2xl:text-[80px] my-auto flex flex-col place-content-between h-3/6 ml-16"
        >
          <ImageMenuOnHover
            ref="work"
            class="w-fit"
            imageSrc="/menu-work.png"
            @mouseover="titleAnimation"
            @mouseleave="defaultBGColor"
            :offsetParent="offsetElement"
            id="work"
            v-cursorAnimation
          >
            <div class="text-white font-black z-10 relative">
              <NuxtLink
                to="/work"
                data-color="#ffff00"
                class="md:hover:transform md:hover:translate-x-32 block opacity-50 hover:opacity-100 cursor-none"
                id="workTitle"
                @click="goToPage"
                >WORK</NuxtLink
              >
            </div>
          </ImageMenuOnHover>
          <ImageMenuOnHover
            ref="about"
            class="w-fit"
            imageSrc="/menu-services.png"
            :offsetParent="offsetElement"
            id="about"
            v-cursorAnimation
          >
            <div class="text-white font-black z-10 relative">
              <!-- TODO: Quand on quitte le title effet epileptique voir la menu-text-overlay -->
              <NuxtLink
                to="/about"
                data-color="#974dff"
                class="md:hover:transform md:hover:translate-x-32 block opacity-50 hover:opacity-100 cursor-none"
                id="aboutTitle"
                @click="goToPage"
                >ABOUT</NuxtLink
              >
            </div>
          </ImageMenuOnHover>
          <!-- <div
            ref="contact"
            class="w-fit"
            @click="goToContact"
            @mouseover="titleAnimation"
            @mouseleave="defaultBGColor"
            :offsetParent="offsetElement"
            id="contact"
          > -->
          <div
            ref="contact"
            class="w-fit"
            @click="goToContact"
            id="contact"
          >
            <div class="text-white font-black z-10 relative">
              <span
                data-color="#99deff"
                class="md:hover:transform md:hover:translate-x-32 block opacity-50 hover:opacity-100"
                id="contactTitle"
          v-cursorAnimation
                >CONTACT</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reaseaux sociaux -->
    <!-- TODO: les faire disparaitre -->
    <div 
      id="social-network" 
      class="fixed right-0 bottom-0 mr-8 mb-3 z-[1000]"
      v-show="isMenuOpen">
      <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
        <linkedin class="text-[30px] w-auto text-white" />
      </a>

      <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
        <instagram class="text-[30px] w-auto text-blue-500" />
      </a>
    </div>
  </div>
</template>

<style scoped>
#separation {
  transition: all 0.1s ease-in-out;
}

#separation.animate {
  transform: translateX(100%);
}

#title {
  transition: all 0.5s ease-in-out;
}

#title.animate {
  transform: translateX(100%);
}

#bg {
  transition: all 0.5s cubic-bezier(.89,.06,.45,.97);
}

#bg.animate {
  transform: translateX(100%);
}

.eparation-open {
  transform: translateX(100%);
}

.eparation-close {
  transform: translateX(0px);
}

.title-open {
  transform: translateX(100%);
}

.title-close {
  transform: translateX(0px);
}

.bg-close {
  transform: translateX(100%);
}

.bg-open {
  transform: translateX(0px);
}

.part1-close {
  animation: part1-close-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part1-close-animation {
  0% {
    transform: translate(0px, 0px);
    width: 10px;
    height: 25px;
    fill: white;
  }

  35% {
    transform: translate(0px, 7px);
    width: 10px;
    height: 6px;
    fill: white;
  }
}
</style>

<script>
export default {
  props: ["isMenuOpen"],
  data() {
    return {
      offsetElement: 0,
      defaultBG: "#ff0066",
      menuTitles: ["work", "about"],
      animateSeparation: false,
      animateTitle: false,
      animateBg: false,
    };
  },
  setup() {
    const isMenuOpen = stateMenuOpen();

    return {
      isMenuOpen,
    };
  },
  watch: {
    isMenuOpen() {
      // console.log(this.isMenuOpen, !this.isMenuOpen);
      this.isMenuOpen ? this.openMenu() : this.closeMenu();
    },
  },
  mounted() {
  },
  methods: {
    titleAnimation(value) {
      // console.log(value.target.attributes["data-color"].value);
      // Changement de couleur du Background
      // if (value.target.innerHTML !== "CONTACT") {
      if (typeof value === "string") {
        document.getElementById("bg").style.backgroundColor = value;
      } else {
        document.getElementById("bg").style.transition = "none";
        document.getElementById("bg").style.backgroundColor =
          value.target.attributes["data-color"].value;
        setTimeout(() => {
          document.getElementById("bg").style.transition =
            "all 0.5s cubic-bezier(.89,.06,.45,.97)";
        }, 0);
      }
      // }

      const workTitle = document.getElementById("workTitle");
      const aboutTitle = document.getElementById("aboutTitle");
      const contactTitle = document.getElementById("contactTitle");

      workTitle.classList.add("menu-text-overlay");
      aboutTitle.classList.add("menu-text-overlay");
      contactTitle.classList.add("menu-text-overlay");
    },
    titleOffset(event) {
      this.offsetElement = parseInt(
        window.getComputedStyle(event.srcElement.offsetParent.offsetParent.offsetParent)
          .left
      );
    },
    defaultBGColor() {
      // Retirer le before puis le translate pour éviter la boucle infinie
      const workTitle = document.getElementById("workTitle");
      const aboutTitle = document.getElementById("aboutTitle");
      const contactTitle = document.getElementById("contactTitle");

      workTitle.classList.remove("menu-text-overlay");
      aboutTitle.classList.remove("menu-text-overlay");
      contactTitle.classList.remove("menu-text-overlay");

      // workTitle.style.transform = "translateX(0px)";
      // servicesTitle.style.transform = "translateX(0px)";
      // talentsTitle.style.transform = "translateX(0px)";
      // const work = this.$refs.work.$el;
      // const services = this.$refs.services.$el;
      // const talents = this.$refs.talents.$el;

      // work.style.transform = "translateX(0px)";
      // services.style.transform = "translateX(0px)";
      // talents.style.transform = "translateX(0px)";

      document.getElementById("bg").style.transition = "none";
      document.getElementById("bg").style.backgroundColor = this.defaultBG;
      setTimeout(() => {
        document.getElementById("bg").style.transition =
          "all 0.5s cubic-bezier(.89,.06,.45,.97)";
      }, 0);

    },
    goToContact() {
      this.$nextTick(() => {
        document.body.style.overflow = "auto";

        const footerElement = document.querySelector("footer");
        footerElement.scrollIntoView({ behavior: "smooth" });
      });
    },
    goToPage(page) {
      // this.closeMenu();
      // this.$emit('update:isMenuOpen', !this.isMenuOpen);
    },
    toggleMenuBurger() {
      const menuBurger = document.getElementById("menu-burger");
      const rectElements = menuBurger.querySelectorAll("rect");

      const rect1 = rectElements[0];
      const rect2 = rectElements[1];
      const rect3 = rectElements[2];

      // Add to rect1 the CSS property "fill: black"

      rect1.classList.remove("part1-open");
      rect2.classList.remove("part2-open");
      rect3.classList.remove("part3-open");

      rect1.classList.add("part1-close");
      rect2.classList.add("part2-close");
      rect3.classList.add("part3-close");
    },
    openMenu() {
      const separationWidth = (window.innerWidth / 2) * 0.2;
      document.getElementById("separation").style.width = `${separationWidth}px`;

      // separation
      document.getElementById("separation").style.transform = "translateX(0)";
      document.getElementById("separation").style.transition = "all 0.1s ease-in-out";

      // Title
      setTimeout(function () {
        // TODO: Calculer un translateX et width pour separation dynamique en fonction de la taille de l'écran

        // document.getElementById("title").style.transform = "translateX(-50%)"; // Pour petit écran
        document.getElementById(
          "title"
        ).style.transform = `translateX(-${separationWidth}px)`; // Pour grand écran
        document.getElementById("title").style.transition = "all 0.5s ease-in-out";
      }, 0);

      // BG
      // document.getElementById("bg").style.transform = "translateX(0)";
      // document.getElementById("bg").classList.toggle("bg-close");
      // document.getElementById("bg").classList.toggle("bg-open");

      document.getElementById("bg").classList.remove("bg-close");
      document.getElementById("bg").classList.add("bg-open");
      document.getElementById("bg").style.transition =
        "all 0.5s cubic-bezier(0, 0.75, 0.83, 0.67)";

      //  A la fin de l'animation faire disparaitre la séparation, pour que le changement de couleur soit fluide
      // setTimeout(function () {
      //   document.getElementById("separation").style.display = "none";
      // }, 500);
    },
    closeMenu() {
      
      // document.getElementById("title").style.transform = "translateX(100%)";

      // this.animateSeparation = true;
      // this.animateTitle = true;
      // this.animateBg = !this.animateBg;
      // console.log(this.animateBg);
      // console.log("oui");
      // Faire reaparaitre la separation pour faire disparaitre le texte derriere
      document.getElementById("separation").style.display = "block";

      // separation
      setTimeout(function () {
        document.getElementById("separation").style.transform = "translateX(100%)";
        document.getElementById("separation").style.transition = "all 0.1s ease-in-out";
      }, 400);

      // Title
      document.getElementById("title").style.transform = "translateX(100%)";
      document.getElementById("title").style.transition = "all 0.5s ease-in-out";

      // BG
      setTimeout(function () {
        console.log("iciciciccici");
        document.getElementById("bg").classList.remove("bg-open");
        document.getElementById("bg").classList.add("bg-close");
        // document.getElementById("bg").style.transition =
        //   "all 0.5s cubic-bezier(.89,.06,.45,.97)";
        // document.getElementById("bg").style.transform = "translateX(100%)";
      }, 100);


      this.defaultBGColor();
    },
  },
};
</script>

<script setup>
import tiktok from "assets/icons/tiktok.svg";
import instagram from "assets/icons/instagram-opacity.svg";
import linkedin from "assets/icons/linkedin.svg";

// definePageMeta({
//   layout: "menu",
// });
</script>
