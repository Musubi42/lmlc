<template>
  <!-- TODO: Pour faire l'effet d'image qui follow sur le hover -->
  <!-- https://codepen.io/coreDeiv/pen/YzqzRKK -->
  <footer
    class="bottom-0 bg-black text-white w-full h-auto mt-80"
    data-footer-element
  >
    <div class="flex flex-row px-[10%] py-[5%]" data-footer-element>
      <div class="flex-1" data-footer-element>
        <div class="mb-8" data-footer-element>
          <div class="font-bold w-fit" data-footer-element>
            <ImageFooterOnHover
              class="onHover w-fit"
              imageSrc="/footer-questions-small.png"
              data-footer-element
            >
              <span class="font-bold z-10 relative" data-footer-element
                >QUESTION &</span
              >
              <br />
              <span
                class="font-bold z-10 relative leading-3"
                data-footer-element
                >NEW BUISINESS</span
              >
            </ImageFooterOnHover>
          </div>
          <span class="font-extralight z-10 relative" data-footer-element
            >contact@lmlccommunication.fr</span
          >
        </div>

        <div class="mb-8 w-fit" data-footer-element>
          <ImageFooterOnHover
            data-footer-element
            class="onHover w-fit"
            imageSrc="/footer-job-small.png"
          >
            <span class="font-bold z-10 relative leading-3" data-footer-element
              >JOB</span
            >
            <!-- transition: ease .5s all padding-left: 1rem; color: #ccc; text-shadow: 3px 5px 10px rgba(0,0,0,1); -->
          </ImageFooterOnHover>
          <span class="font-extralight z-10 relative" data-footer-element
            >talents@lmlccommunication.fr</span
          >
        </div>

        <div class="mb-8 w-fit" data-footer-element>
          <ImageFooterOnHover
            data-footer-element
            class="onHover w-fit"
            imageSrc="/footer-tuned-small.png"
          >
            <span class="font-bold z-10 relative leading-3" data-footer-element
              >STAY TUNED</span
            >
          </ImageFooterOnHover>
          <!-- opacity: 0; width: 100%; height: auto; max-width: 400px; box-sizing:
          border-box; transition: ease .2s; position: absolute; transform:
          translate(-50%, -50%); z-index: -1; object-fit: cover; -->
          <!-- TODO: Faire un input pour récupérer email en contact -->
        </div>
        <div class="z-10 relative" data-footer-element>PARIS, FR</div>
      </div>

      <div class="flex-1" data-footer-element>
        <div
          data-footer-element
          class="flex flex-row font-montserrat font-medium text-sm w-fit ml-auto"
        >
          <span class="mr-4" data-footer-element>FR</span>
          <span class="mr-4" data-footer-element>EN</span>
          <span data-footer-element>IT</span>
        </div>
      </div>
    </div>
    <div class="relative w-full" data-footer-element>
      <div
        data-footer-element
        class="absolute flex flex-col justify-content items-center bottom-0 w-full"
      >
        <a
          href="https://www.instagram.com/lmlc_communication/"
          target="_blank"
          data-footer-element
        >
          <instagram
            class="text-[30px] w-auto text-white"
            data-footer-element
          />
        </a>
        <!-- TODO : Ajouter le lien vers mentions-legales une fois la page crée -->
        <NuxtLink
          data-footer-element
          to="/"
          class="font-monteserrat font-extralight text-sm mt-4 mb-6"
          >mentions légales</NuxtLink
        >
      </div>
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
.email-text {
  z-index: 100; /* ou une autre valeur suffisamment élevée */
}
</style>
