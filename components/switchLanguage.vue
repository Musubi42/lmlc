<template>
  <span
    class="hidden relative mt-[6px] md:flex flex-row text-xs font-medium right-36 bottom-[-1px] duration-300 transition-opacity"
    ref="languageSelectors"
    :style="{ 'opacity': languageStyle}"
  >
    <div class="fixed text-white">
      <span @click="changeLanguage('fr')" :class="isTalents ? 'invert' : ''" class="mr-4" id="fr" v-cursorAnimation>FR</span>
      <span @click="changeLanguage('en')" :class="isTalents ? 'invert' : ''" class="mr-4" id="en" v-cursorAnimation>EN</span>
      <span @click="changeLanguage('it')" :class="isTalents ? 'invert' : ''" class="" id="it" v-cursorAnimation>IT</span>
    </div>
  </span>

  <span
    class="absolute left-0 top-0 ml-6 z-[1000] mt-[6px] md:hidden block flex-row text-base font-medium right-24 bottom-[-1px] duration-300 transition-opacity"
    ref="languageSelectorsMobile"
    id="languageSelectorsMobile"
    v-if="isMenuOpen"
  >
    <div class="fixed">
      <span @click="changeLanguageMobile('fr')" class="mr-4 " id="frMobile" v-cursorAnimation>FR</span>
      <span @click="changeLanguageMobile('en')" class="mr-4" id="enMobile" v-cursorAnimation>EN</span>
      <span @click="changeLanguageMobile('it')" class="" id="itMobile" v-cursorAnimation>IT</span>
    </div>
  </span>
</template>

<script>
import Cookies from "js-cookie";
import { ref, onMounted } from 'vue';

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

    const isTalents = talents();

    const isMobile = stateIsMobile();

    // watch(isTalents, (newValue, oldValue) => {
    //   console.log(newValue, oldValue);
    //   setTimeout(() => {
    //     isMenuOpen.value = newValue;
    //   }, 200);
    // });

    const { locale } = useI18n();

    const changeLanguageMobile = (locale) => {
      // const languageSelectors = this.$refs.languageSelectorsMobile;
      // const languageSelectorsMobile = ref(null);
      const languageSelectorsMobile = document.getElementById("languageSelectorsMobile");
      console.log(languageSelectorsMobile);
      const allLanguageSelectors = languageSelectorsMobile.querySelectorAll("span");
      allLanguageSelectors.forEach((languageSelector) => {
        languageSelector.classList.remove("font-semibold");
      });
      this.language = locale.toUpperCase();
      const languageSelector = document.getElementById(locale);
      languageSelector.classList.add("font-semibold");

      const languageSelectorsMobiles = document.getElementById(`${locale}Mobile`);
      languageSelectorsMobiles.classList.add("font-semibold");

      Cookies.set("i18n_language", locale);
      locale = locale;
    };

    const isMobileUpdateLanguage = mobileUpdateLanguage();

    // watch(isMobileUpdateLanguage, (newValue, oldValue) => {
    //   console.log(newValue, oldValue);
    //   changeLanguageMobile(locale.toString());
    // });

    return { 
      isMenuOpen,
      isTalents,
      isMobile,
      isMobileUpdateLanguage,
      changeLanguageMobile,
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
    // if (this.isMobile) {
    //   console.log("mobile");
    //   this.changeLanguageMobile(this.$i18n.locale.toString());
    // } else {
    //   this.changeLanguage(this.$i18n.locale.toString());
    // }
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

      const languageSelectorsMobile = document.getElementById(`${locale}Mobile`);
      languageSelectorsMobile.classList.add("font-semibold");

      Cookies.set("i18n_language", locale);
      this.$i18n.locale = locale;
    },
  },
};
</script>
