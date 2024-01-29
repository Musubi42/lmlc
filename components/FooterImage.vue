<template>
  <!-- TODO: Pour faire l'effet d'image qui follow sur le hover -->
  <!-- https://codepen.io/coreDeiv/pen/YzqzRKK -->
  <footer class="bottom-0 bg-black text-white w-full h-auto pb-14" data-footer-element>
    <div class="flex flex-row px-[10%] py-[5%]" data-footer-element>
      <div class="flex-1 mb-24 md:mb-0" data-footer-element>
        <div class="mb-3 md:mb-8 w-fit" data-footer-element>
          <ImageFooterOnHover
            data-footer-element
            class="onHover w-fit"
            imageSrc="/footer-questions-small.png"
          >
            <template #title>
              <span
                class="font-bold text-sm md:text-lg z-10 relative bg-black mix-blend-difference text-white"
                data-footer-element
                >QUESTION &</span
              >
              <br />
              <span
                class="font-bold text-sm md:text-lg z-10 relative leading-3 bg-black mix-blend-difference text-white"
                data-footer-element
                >NEW BUISINESS</span
              >
            </template>
            <template #content>
              <span
                class="font-extralight z-10 relative bg-black mix-blend-difference text-white"
                data-footer-element
              >
                contact@lmlccommunication.fr
              </span>
            </template>
          </ImageFooterOnHover>
        </div>

        <div class="mb-3 md:mb-8 w-fit" data-footer-element>
          <ImageFooterOnHover
            data-footer-element
            class="onHover w-fit"
            imageSrc="/footer-job-small.png"
          >
            <template #title>
              <span
                class="font-bold text-sm md:text-lg z-10 relative leading-3 bg-black mix-blend-difference text-white"
                data-footer-element
                >JOB</span
              >
            </template>
            <template #content>
              <span
                class="font-extralight z-10 relative bg-black mix-blend-difference text-white"
                data-footer-element
              >
                talents@lmlccommunication.fr
              </span>
            </template>
          </ImageFooterOnHover>
        </div>

        <div class="mb-3 md:mb-8 w-fit" data-footer-element>
          <ImageFooterOnHover
            data-footer-element
            class="onHover w-fit"
            imageSrc="/footer-tuned-small.png"
          >
            <template #title>
              <span
                class="font-bold text-sm md:text-lg z-10 relative leading-3 bg-black mix-blend-difference text-white"
                data-footer-element
                >TUNED !</span>
                <div class="flex items-center">
                  <input type="email" v-model="email" placeholder="contact@gmail.com" class="rounded-full placeholder:italic placeholder:text-gray-400 block bg-white w-full border border-gray-300 shadow-sm focus:outline-none focus:border-rose-neon focus:ring-rose-neon text-gray-700 py-2 px-4 leading-tight focus:ring-1" v-cursorAnimation />
                  <button 
                    class="bg-rose-neon text-white rounded-full p-2 ml-2 active:bg-rose-neon/50" 
                    v-cursorAnimation
                    @click="sendDataToMake" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
            </template>
            <template #content>
              <span
                class="font-extralight z-10 relative bg-black mix-blend-difference text-white"
                data-footer-element
              >
                Ajouter champs pour récupérer email
              </span>
            </template>
          </ImageFooterOnHover>
          <!-- opacity: 0; width: 100%; height: auto; max-width: 400px; box-sizing:
          border-box; transition: ease .2s; position: absolute; transform:
          translate(-50%, -50%); z-index: -1; object-fit: cover; -->
          <!-- TODO: Faire un input pour récupérer email en contact -->
        </div>
        <div class="z-10 relative" data-footer-element>PARIS, FR</div>
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
          <instagram class="text-[30px] w-auto text-white" data-footer-element />
        </a>
        <!-- TODO : Ajouter le lien vers mentions-legales une fois la page crée -->
        <NuxtLink
          data-footer-element
          to="/"
          class="font-monteserrat font-extralight text-sm mt-4 mb-6"
          v-cursorAnimation
          >mentions légales</NuxtLink
        >
      </div>
    </div>
  </footer>
</template>

<script>
import instagram from "assets/icons/instagram.svg";
import Cookies from "js-cookie";

export default {
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async sendDataToMake() {
      const webhookUrl = 'https://hook.eu1.make.com/nmc2x125sl91njkej8t2wx6c75d4n1ti'; // Remplacez avec l'URL de votre webhook Make.com

      const { data, pending, error } = await useFetch(webhookUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email: this.email,
        },
      });

      console.log(data.value);
      console.log(pending.value);
      console.log(error.value);
    }
  },
}

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
