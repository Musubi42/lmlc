<template>
  <div class="h-screen bg-rose-neon flex flex-row">
    <!-- Titre -->
    <div class="my-auto flex flex-col place-content-between h-3/6 ml-16">
      <div class="">
        <ImageMenuOnHover class="onHover w-fit" imageSrc="/menu-work-small.png">
          <div class="font-black z-10 relative text-8xl text-white">WORK</div>
        </ImageMenuOnHover>
      </div>
      <div class="mb-30">
        <ImageMenuOnHover
          class="onHover w-fit"
          imageSrc="/menu-services-small.png"
        >
          <div class="text-8xl text-white font-black z-10 relative">
            SERVICES
          </div>
        </ImageMenuOnHover>
      </div>
      <ImageMenuOnHover
        class="onHover w-fit"
        imageSrc="/menu-talents-small.png"
      >
        <div class="text-8xl text-white font-black z-10 relative">TALENTS</div>
      </ImageMenuOnHover>
    </div>
    <!-- Sidebar -->
    <div class="flex flex-col place-content-between ml-auto mr-10 mb-10 mt-6">
      <div id="menu-burger" class="ml-auto flex flex-row">
        <div
          class="menu__burger__sides__open h-[25px] w-[10px] mr-[4px] rounded-full bg-white transition ease transform duration-300"
        ></div>
        <div
          class="menu__burger__middle__open h-[50px] w-[10px] mr-[4px] rounded-full bg-white transition ease transform duration-300"
        ></div>
        <div
          class="menu__burger__sides__open h-[50px] w-[10px] rounded-full bg-white transition ease transform duration-300"
        ></div>
      </div>
      <!-- Reaseaux sociaux -->
      <div>
        <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
          <tiktok class="text-[65px] w-auto text-white opacity-50" />
        </a>

        <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
          <linkedin class="text-[65px] w-auto text-white" />
        </a>

        <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
          <instagram class="text-[65px] w-auto" />
        </a>
        <button @mouseover="mouseup">Greet</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import tiktok from "assets/icons/tiktok.svg";
import instagram from "assets/icons/instagram.svg";
import linkedin from "assets/icons/linkedin.svg";
const name = ref("Vue.js");

function mouseup(event) {
  console.log(event);
}
definePageMeta({
  layout: "menu",
});
</script>

<style scoped>
.onHover:hover {
  transition: ease 0.2s all;
  color: black;
  cursor: default;
}
</style>
