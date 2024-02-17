<template>
  <!-- <button
    class="fixed z-50 w-12 h-12 text-center rounded-full select-none text-a_bg right-24 top-3 border-black border-[1px]"
    @click="changeLanguage"
  >
    <div class="absolute text-xs top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-[#000]" >   
      {{ currentLanguage }}
    </div>
  </button> -->
  <span
    class="hidden relative mt-[6px] md:flex flex-row text-xs font-medium right-24 bottom-[-1px] duration-300 transition-opacity"
    ref="languageSelectors"
    :style="languageStyle"
  >
    <div class="fixed">
      <span @click="changeLanguage('fr')" class="mr-4" id="fr" v-cursorAnimation>FR</span>
      <span @click="changeLanguage('en')" class="mr-4" id="en" v-cursorAnimation>EN</span>
      <span @click="changeLanguage('it')" class="" id="it" v-cursorAnimation>IT</span>
    </div>
  </span>

  <span
    class="absolute left-0 top-0 ml-6 z-[1000] mt-[6px] md:hidden block flex-row text-xs font-medium right-24 bottom-[-1px] duration-300 transition-opacity"
    ref="languageSelectorsMobile"
    v-if="isMenuOpen"
  >
    <div class="fixed">
      <span @click="changeLanguageMobile('frMobile')" class="mr-4 " id="frMobile" v-cursorAnimation>FR</span>
      <span @click="changeLanguageMobile('enMobile')" class="mr-4" id="enMobile" v-cursorAnimation>EN</span>
      <span @click="changeLanguageMobile('itMobile')" class="" id="itMobile" v-cursorAnimation>IT</span>
    </div>
  </span>
</template>

<script>
import Cookies from "js-cookie";

export default {
  props: {
    languageStyle: {
      type: Object,
      required: false,
    },
  },
  setup() {
    const isMenuOpen = ref(false);
    const MenuOpen = stateMenuOpen();

    watch(MenuOpen, (newValue, oldValue) => {
      setTimeout(() => {
        isMenuOpen.value = newValue;
      }, 200);
    });

    return { 
      isMenuOpen,
      };
  },
  data() {
    return {
      currentLanguage: "fr",
      languages: ["fr", "en", "it"],
      language: "FR",
    };
  },
  created() {
    const savedLang = Cookies.get("i18n_language");

    if (savedLang) {
      this.$i18n.locale = savedLang;
    } else {
      this.$i18n.locale = "fr";
    }
  },
  mounted() {
    this.changeLanguage(this.$i18n.locale.toString());
  },
  computed: {
    flag() {
      return this.flags[this.currentLanguage];
    },
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
      languageSelector.classList.add("font-semibold");

      Cookies.set("i18n_language", locale);
      this.$i18n.locale = locale;
    },

    changeLanguageMobile(locale) {
      const languageSelectors = this.$refs.languageSelectorsMobile;
      const allLanguageSelectors = languageSelectors.querySelectorAll("span");
      allLanguageSelectors.forEach((languageSelector) => {
        languageSelector.classList.remove("font-semibold");
      });
      this.language = locale.toUpperCase();
      const languageSelector = document.getElementById(locale);
      languageSelector.classList.add("font-semibold");

      Cookies.set("i18n_language", locale);
      this.$i18n.locale = locale;
    },
  },
};
</script>
