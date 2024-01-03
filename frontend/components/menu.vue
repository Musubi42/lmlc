<template>
  <div>
    <!--  -->
    <div
      class="h-full bg-rose-neon w-10 md:w-80 right-0 fixed z-[100] transform translate-x-full"
      id="separation"
    ></div>
    <div
      class="h-screen bg-rose-neon flex flex-row items-center fixed z-[20] right-0 w-full md:w-1/2 transform translate-x-full"
      id="bg"
    >
      <!-- Sidebar -->
      <!-- <div class="flex flex-col place-content-between ml-auto mr-10 mb-10 mt-6"> -->
      <!-- <div
        id="menu-burger"
        class="ml-auto flex flex-row hover:cursor-pointer relative h-[50px] w-[38px]"
        @click="toggleMenu"
      >
        <div class="menu-burger-open-first absolute left-0"></div>
        <div class="menu-burger-open-second absolute left-[12px]"></div>
        <div class="menu-burger-open-third absolute right-0"></div>
      </div> -->
      <div
        class="absolute right-0 z-auto transform translate-x-full"
        id="title"
        @mousemove="titleOffset"
      >
        <!-- Titre -->
        <!-- Capturer cet élémént et for each sur chacun de ses enfants -->
        <div class="text-[50px] md:text-[70px] xl:text-[80px] 2xl:text-[90px] my-auto flex flex-col place-content-between h-3/6 ml-16">
          <ImageMenuOnHover
            ref="work"
            class="onHover w-fit"
            imageSrc="/menu-work-small.png"
            @mouseover="titleAnimation"
            @mouseleave="defaultBGColor"
            :offsetParent="offsetElement"
            id="work"
          >
            <div
              class=" text-white font-black z-10 relative"
            >
              <span
                data-color="#ffff00"
                class="md:hover:transform md:hover:translate-x-32 block opacity-50 hover:opacity-100 w-fit"
                id="workTitle"
                >WORK</span
              >
            </div>
          </ImageMenuOnHover>
          <ImageMenuOnHover
            ref="services"
            class="onHover w-fit"
            imageSrc="/menu-services-small.png"
            @mouseover="titleAnimation"
            @mouseleave="defaultBGColor"
            :offsetParent="offsetElement"
            id="services"
          >
            <div
              class=" text-white font-black z-10 relative"
            >
              <!-- TODO: Quand on quitte le title effet epileptique voir la menu-text-overlay -->
              <span
                data-color="#974dff"
                class="md:hover:transform md:hover:translate-x-32 block menu-text-overlay opacity-50 hover:opacity-100"
                id="servicesTitle"
                >SERVICES</span
              >
            </div>
          </ImageMenuOnHover>
          <ImageMenuOnHover
            ref="talents"
            class="onHover w-fit"
            imageSrc="/menu-talents-small.png"
            @mouseover="titleAnimation"
            @mouseleave="defaultBGColor"
            :menuOpen="toggleMenu"
            :offsetParent="offsetElement"
            id="talents"
          >
            <!-- TODO : On hover de cette div, animer le texte -->
            <div
              class="text-white font-black z-10 relative"
            >
              <span
                data-color="#99deff"
                class="md:hover:transform md:hover:translate-x-32 block menu-text-overlay opacity-50 hover:opacity-100"
                id="talentsTitle"
                >TALENTS</span
              >
            </div>
          </ImageMenuOnHover>
        </div>
      </div>
    </div>

    <!-- Reaseaux sociaux -->
    <!-- TODO: les faire disparaitre -->
    <div id="social-network" class="hidden fixed right-0 bottom-0 mr-8 mb-3 z-[1000]">
      <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
        <linkedin class="text-[30px] w-auto text-white" />
      </a>

      <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
        <instagram class="text-[30px] w-auto" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isMenuOpen"],
  watch: {
    isMenuOpen() {
        // toggle la class hidden sur les réseaux sociaux
        document.getElementById("social-network").classList.toggle("hidden");
      if (this.isMenuOpen) {
        // En 3 parties
        // Faire apparaitre l'élément à droite
        // Faire défiler le background
        // Faire apparaitre le texte


        const separationWidth = (window.innerWidth / 2) * 0.2;
        document.getElementById(
          "separation"
        ).style.width = `${separationWidth}px`;

        // separation
        document.getElementById("separation").style.transform = "translateX(0)";
        document.getElementById("separation").style.transition =
          "all 0.1s ease-in-out";

        // Title
        setTimeout(function () {
          // TODO: Calculer un translateX et width pour separation dynamique en fonction de la taille de l'écran

          // document.getElementById("title").style.transform = "translateX(-50%)"; // Pour petit écran
          document.getElementById(
            "title"
          ).style.transform = `translateX(-${separationWidth}px)`; // Pour grand écran
          document.getElementById("title").style.transition =
            "all 0.5s ease-in-out";
        }, 0);

        // BG
        document.getElementById("bg").style.transform = "translateX(0)";
        document.getElementById("bg").style.transition =
          "all 0.5s cubic-bezier(0, 0.75, 0.83, 0.67)";

        //  A la fin de l'animation faire disparaitre la séparation, pour que le changement de couleur soit fluide
        setTimeout(function () {
          document.getElementById("separation").style.display = "none";
        }, 500);
      } else {
        // Faire reaparaitre la separation pour faire disparaitre le texte derriere
        document.getElementById("separation").style.display = "block";

        // separation
        setTimeout(function () {
          document.getElementById("separation").style.transform =
            "translateX(100%)";
          document.getElementById("separation").style.transition =
            "all 0.1s ease-in-out";
        }, 400);

        // Title
        document.getElementById("title").style.transform = "translateX(100%)";
        document.getElementById("title").style.transition =
          "all 0.5s ease-in-out";

        // BG
        setTimeout(function () {
          document.getElementById("bg").style.transform = "translateX(100%)";
          document.getElementById("bg").style.transition =
            "all 0.5s cubic-bezier(.89,.06,.45,.97)";
        }, 100);
      }
    },
  },
  data() {
    return {
      offsetElement: 0,
      defaultBG: "#ff0066",
      menuTitles: ["work", "services", "talents"],
    };
  },
  mounted() {},
  methods: {
    titleAnimation(value) {
      // Changement de couleur du Background

      if (typeof value === "string") {
        document.getElementById("bg").style.backgroundColor = value;
      } else {
        document.getElementById("bg").style.transition = "none";
        document.getElementById("bg").style.backgroundColor =
          value.target.attributes["data-color"].value;
      }

      const workTitle = document.getElementById("workTitle");
      const servicesTitle = document.getElementById("servicesTitle");
      const talentsTitle = document.getElementById("talentsTitle");

      workTitle.classList.add("menu-text-overlay");
      servicesTitle.classList.add("menu-text-overlay");
      talentsTitle.classList.add("menu-text-overlay");
      // Décaler la div du title pour faire l'effet de pagination
      // tout le temps remttre le titre sur la gauche
      const newElementID = value.target.outerText.toLowerCase();

      // document.getElementById(
      //   `${newElementID}Title`
      // ).style.transform = `translateX(128px)`;
    },
    titleOffset(event) {
      this.offsetElement = parseInt(
        window.getComputedStyle(
          event.srcElement.offsetParent.offsetParent.offsetParent
        ).left
      );
    },
    defaultBGColor() {
      // Retirer le before puis le translate pour éviter la boucle infinie
      const workTitle = document.getElementById("workTitle");
      const servicesTitle = document.getElementById("servicesTitle");
      const talentsTitle = document.getElementById("talentsTitle");

      workTitle.classList.remove("menu-text-overlay");
      servicesTitle.classList.remove("menu-text-overlay");
      talentsTitle.classList.remove("menu-text-overlay");

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
    },
  },
};
</script>

<script setup>
import tiktok from "assets/icons/tiktok.svg";
import instagram from "assets/icons/instagram-opacity.svg";
import linkedin from "assets/icons/linkedin.svg";
const name = ref("Vue.js");

function toggleMenu(event) {
  if (event.target.id === "menu-burger") {
    var menuBurgerFirst = event.target.children[0];
    var menuBurgerSecond = event.target.children[1];
    var menuBurgerThird = event.target.children[2];
  } else {
    // Le coup ou on clique pas sur le burger, mais sur les barres
    var menuBurgerFirst = event.srcElement.offsetParent.children[0];
    var menuBurgerSecond = event.srcElement.offsetParent.children[1];
    var menuBurgerThird = event.srcElement.offsetParent.children[2];
  }

  menuBurgerFirst.style.height = "6px";
  menuBurgerFirst.style.width = "6px";
  menuBurgerFirst.style.transition =
    "height 0.5s cubic-bezier(.47,1.64,.41,.8)";

  menuBurgerSecond.style.height = "6px";
  menuBurgerSecond.style.width = "6px";
  menuBurgerSecond.style.transform = "translateY(20px)";
  menuBurgerSecond.style.transition = "all 0.5s cubic-bezier(.47,1.64,.41,.8)";
  menuBurgerThird.style.height = "6px";
  menuBurgerThird.style.width = "6px";
  menuBurgerThird.style.transform = "translateY(40px)";
  menuBurgerThird.style.transition = "all 0.5s cubic-bezier(.47,1.64,.41,.8)";

  setTimeout(function () {
    menuBurgerFirst.style.backgroundColor = "black";
    menuBurgerFirst.style.width = "35px";
    menuBurgerFirst.style.transition = "width 0.3s ease-in-out";

    menuBurgerSecond.style.backgroundColor = "black";
    menuBurgerSecond.style.width = "35px";
    menuBurgerSecond.style.transform = "translate(-12px, 8px)";

    menuBurgerThird.style.backgroundColor = "black";
    menuBurgerThird.style.width = "35px";
    menuBurgerThird.style.transform = "translate(1px, 16px)";
  }, 500);

  // Make the elements disapear
  // Menu burger
  // setTimeout(function () {
  //   menuBurgerFirst.style.opacity = "0";
  //   menuBurgerSecond.style.opacity = "0";
  //   menuBurgerThird.style.opacity = "0";
  // }, 1000);

  // Social Networks
  setTimeout(function () {
    document.getElementById("social-network").style.transform =
      "translateX(120px)";
    document.getElementById("social-network").style.transition =
      "all 0.5s ease-in-out";
  }, 1000);

  // Link
  // Work
  setTimeout(function () {
    document.getElementById("work").style.transform = "translateX(-400px)";
    document.getElementById("work").style.transition = "all 0.5s ease-in-out";
  }, 1000);

  // Services
  setTimeout(function () {
    document.getElementById("services").style.transform = "translateY(-600px)";
    document.getElementById("services").style.transition =
      "all 0.5s ease-in-out";
  }, 1000);

  // Talents
  setTimeout(function () {
    document.getElementById("talents").style.transform = "translateY(600px)";
    document.getElementById("talents").style.transition =
      "all 0.5s ease-in-out";
  }, 1000);
}
definePageMeta({
  layout: "menu",
});
</script>

<style scoped>
.onHover:hover {
  /* transition: ease 0.2s all; */
  color: black;
  cursor: default;
}
</style>
