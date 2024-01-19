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
                >TUNED</span
              >
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

      <!-- <div
          ref="languageSelectors" class="flex-1" data-footer-element>
        <span
          data-footer-element
          class="hidden md:flex flex-row font-montserrat font-medium text-sm w-fit ml-auto"
        >
          <span class="mr-4 hover:italic cursor-pointer" @click="changeLanguage('fr')" id="fr-footer">FR</span>
          <span class="mr-4 hover:italic cursor-pointer" @click="changeLanguage('en')" id="en-footer">EN</span>
          <span class="hover:italic cursor-pointer" @click="changeLanguage('it')" id="it-footer">IT</span>
        </span>
      </div> -->
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
  data() {
    return {
      language: "FR",
    };
  },
  created() {
    // Lorsque le composant est créé, vérifiez si un cookie de langue existe
    const savedLang = Cookies.get("i18n_language");

    if (savedLang) {
      // Si un cookie existe, utilisez-le pour définir la langue
      this.$i18n.locale = savedLang;
    } else {
      // Sinon, utilisez la langue par défaut de votre application
      this.$i18n.locale = "fr"; // Mettez la langue par défaut de votre choix
    }
  },
  methods: {
    changeLanguage(locale) {
      const languageSelectors = this.$refs.languageSelectors;
      const allLanguageSelectors = languageSelectors.querySelectorAll("span");
      allLanguageSelectors.forEach((languageSelector) => {
        languageSelector.classList.remove("font-semibold");
      });
      this.language = locale.toUpperCase();
      const languageSelector = document.getElementById(locale);
      document.getElementById(`${locale}-footer`).classList.add("font-semibold");

      Cookies.set("i18n_language", locale);
      this.$i18n.locale = locale;
    },
  },
};
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
