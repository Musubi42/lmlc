<template>
  <div
    class="h-screen bg-rose-neon flex flex-row fixed z-[100] right-0 w-full md:w-1/2 transform translate-x-full"
    id="bg"
  >
    <!-- Titre -->
    <div class="my-auto flex flex-col place-content-between h-3/6 ml-16">
      <ImageMenuOnHover
        class="onHover w-fit"
        imageSrc="/menu-work-small.png"
        @mouseover="color"
        id="work"
      >
        <div
          class="font-black z-10 relative text-[42px] md:text-[85px] text-white hover:cursor-pointer leading-[78%]"
        >
          <span
            data-color="#ffff00"
            class="md:hover:ml-32 menu-text-overlay opacity-50 hover:opacity-100"
            >WORK</span
          >
        </div>
      </ImageMenuOnHover>
      <ImageMenuOnHover
        class="onHover w-fit mb-30"
        imageSrc="/menu-services-small.png"
        @mouseover="color"
        id="services"
      >
        <div
          class="text-[42px] md:text-[85px] text-white font-black z-10 relative"
        >
          <span
            data-color="#974dff"
            class="md:hover:ml-32 menu-text-overlay hover:cursor-pointer leading-[78%] opacity-50 hover:opacity-100"
            >SERVICES</span
          >
        </div>
      </ImageMenuOnHover>
      <ImageMenuOnHover
        class="onHover w-fit"
        imageSrc="/menu-talents-small.png"
        @mouseover="color"
        id="talents"
      >
        <div class="text-white font-black z-10 relative">
          <span
            data-color="#99deff"
            class="md:hover:ml-32 leading-[78%] text-[42px] md:text-[85px] menu-text-overlay hover:cursor-pointer opacity-50 hover:opacity-100"
            >TALENTS</span
          >
        </div>
      </ImageMenuOnHover>
    </div>
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
    <!-- Reaseaux sociaux -->
    <div id="social-network" class="absolute right-0 bottom-0 mr-8 mb-3">
      <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
        <linkedin class="text-[30px] w-auto text-white" />
      </a>

      <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
        <instagram class="text-[30px] w-auto" />
      </a>
    </div>
  </div>
  <!-- </div> -->
</template>

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

  // TODO : Navigation provisoire pour demo la transition
  // setTimeout(function () {
  //   window.location.href = "http://pre-prod.lmlccommunication.fr/";
  // }, 1500);
}

function color(value) {
  console.log(value);
  if (typeof value === "string") {
    document.getElementById("bg").style.backgroundColor = value;
  } else {
    document.getElementById("bg").style.backgroundColor =
      value.target.attributes["data-color"].value;
  }
}
function mouseup(event) {
  console.log(event);
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
