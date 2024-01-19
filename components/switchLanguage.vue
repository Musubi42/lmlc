<template>
  <button
    class="w-12 h-12 rounded-full flex items-center justify-center"
    @click="changeLanguage"
  >
    <IconsFlagsFr class="text-[50px] rounded-full" v-if="currentLanguage === 'fr'" />
    <IconsFlagsEng class="text-[50px] rounded-full" v-if="currentLanguage === 'en'" />
    <IconsFlagsIt class="text-[50px] rounded-full" v-if="currentLanguage === 'it'" />
  </button>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      currentLanguage: 'fr',
      languages: ['fr', 'en', 'it'],
      flags: {
        fr: 'path/to/france-flag.png',
        en: 'path/to/england-flag.png',
        it: 'path/to/italy-flag.png',
      },
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
  computed: {
    flag() {
      return this.flags[this.currentLanguage];
    },
  },
  methods: {
    changeLanguage() {
      const currentIndex = this.languages.indexOf(this.currentLanguage);
      const nextIndex = (currentIndex + 1) % this.languages.length;
      this.currentLanguage = this.languages[nextIndex];
      console.log(this.currentLanguage);
      // Call your function to change the language in your app
      this.$i18n.locale = this.currentLanguage;
      Cookies.set("i18n_language", locale);
    },

    // changeLanguage(locale) {
    //   const languageSelectors = this.$refs.languageSelectors;
    //   const allLanguageSelectors = languageSelectors.querySelectorAll("span");
    //   allLanguageSelectors.forEach((languageSelector) => {
    //     languageSelector.classList.remove("font-semibold");
    //   });
    //   this.language = locale.toUpperCase();
    //   const languageSelector = document.getElementById(locale);
    //   languageSelector.classList.add("font-semibold");

    //   Cookies.set("i18n_language", locale);
    //   this.$i18n.locale = locale;
    // },
  },
};
</script>