<template>
  <!-- TODO: Pour faire l'effet d'image qui follow sur le hover -->
  <!-- https://codepen.io/coreDeiv/pen/YzqzRKK -->
  <footer class="fixed bottom-0 bg-black text-white w-full h-auto">
    <div class="flex flex-row px-[10%] py-[8%]">
      <div class="flex-1">
        <div class="mb-8">
          <div class="font-bold w-fit">
            <ImageOnHover
              class="onHover w-fit"
              imageSrc="/footer-questions-small.png"
            >
              <span class="font-bold z-10 relative">QUESTION &</span>
              <br />
              <span class="font-bold z-10 relative leading-3"
                >NEW BUISINESS</span
              >
            </ImageOnHover>
          </div>
          <span class="font-extralight">contact@lmlccommunication.fr</span>
        </div>

        <div class="mb-8 w-fit">
          <ImageOnHover class="onHover w-fit" imageSrc="/footer-job-small.png">
            <span class="font-bold z-10 relative leading-3">JOB</span>
            <!-- transition: ease .5s all padding-left: 1rem; color: #ccc; text-shadow: 3px 5px 10px rgba(0,0,0,1); -->
          </ImageOnHover>
          <br />
          <span class="font-extralight">talents@lmlccommunication.fr</span>
        </div>

        <div class="mb-8 w-fit">
          <ImageOnHover
            class="onHover w-fit"
            imageSrc="/footer-tuned-small.png"
          >
            <span class="font-bold z-10 relative leading-3">STAY TUNED</span>
          </ImageOnHover>
          <!-- opacity: 0; width: 100%; height: auto; max-width: 400px; box-sizing:
          border-box; transition: ease .2s; position: absolute; transform:
          translate(-50%, -50%); z-index: -1; object-fit: cover; -->
          <!-- TODO: Faire un input pour récupérer email en contact -->
        </div>
        <div class="">PARIS, FR</div>
      </div>

      <div class="flex-1">
        <div
          class="flex flex-row font-montserrat font-medium text-sm w-fit ml-auto"
        >
          <span class="mr-4">FR</span>
          <span class="mr-4">EN</span>
          <span>IT</span>
        </div>
      </div>
    </div>
    <div
      class="fixed flex flex-col justify-content items-center bottom-0 h-20 w-full"
    >
      <a href="https://www.instagram.com/lmlc_communication/" target="_blank">
        <instagram class="text-[35px] w-auto" />
      </a>
      <NuxtLink to="/mentions-legales" class="font-monteserrat font-extralight"
        >Mentions légales</NuxtLink
      >
    </div>
  </footer>
</template>

<script setup>
import instagram from "assets/icons/instagram.svg";
</script>

<style scoped>
.onHover:hover {
  transition: ease 0.2s all;
  color: black;
  cursor: default;
}
</style>
