<template>
  <!-- <button
    class="fixed z-50 w-12 h-12 text-center rounded-full cursor-pointer select-none text-a_bg right-24 top-3 border-black border-[1px]"
    @click="changeLanguage"
  >
    <div class="absolute text-xs top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-[#000]" >   
      {{ currentLanguage }}
    </div>
  </button> -->
  <span class="hidden relative mt-[6px] md:flex flex-row text-xs font-medium right-24 bottom-[-1px] duration-300 transition-opacity" ref="languageSelectors" :style="languageStyle">
    <div class="fixed" >
      <span @click="changeLanguage('fr')" class="mr-4 font-semibold hover:cursor-pointer" id="fr" v-cursorAnimation>FR</span>
      <span @click="changeLanguage('en')" class="mr-4  hover:cursor-pointer" id="en" v-cursorAnimation>EN</span>
      <span @click="changeLanguage('it')" class=" hover:cursor-pointer" id="it" v-cursorAnimation>IT</span>
    </div>
  </span>

  <div

          class="flex flex-row font-montserrat font-medium text-sm mt-[-4px] mr-10 content-end cursor-pointer"
        >
          <div>
            <button
              id="dropdownDefaultButton"
              @click="toggleDropdown"
              class="text-black md:hidden inline-block relative bg-white hover:bg-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              {{ language }}
            </button>

            <!-- Dropdown menu -->
            <!-- <div
              v-show="isDropdownOpen"
              id="dropdown"
              class="z-20 absolute bg-white divide-y divide-gray-100 rounded-lg" >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-white"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    @click="changeLanguage('fr')"
                    class="block px-4 py-2 hover:bg-gray-100 text-black text-center"
                    >FR</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    @click="changeLanguage('en')"
                    class="block px-4 py-2 hover:bg-gray-100 text-black hover:text-black text-center"
                    >EN</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    @click="changeLanguage('it')"
                    class="block px-4 py-2 hover:bg-gray-100 text-black hover:text-black text-center"
                    >IT</a
                  >
                </li>
              </ul>
            </div> -->
          </div>
          <!-- Options de langue visibles sur les écrans moyens et plus grands -->
          <!-- <span class="hidden md:flex flex-row">
            <span
              @click="changeLanguage('fr')"
              class="mr-4 hover:italic"
              id="fr"
              >FR</span
            >
            <span
              @click="changeLanguage('en')"
              class="mr-4 hover:italic"
              id="en"
              >EN</span
            >
            <span @click="changeLanguage('it')" class="hover:italic" id="it"
              >IT</span
            >
          </span> -->
        </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  props: {
    languageStyle: {
      type: Object,
      required: false
    },
  },
  data() {
    return {
      currentLanguage: "fr",
      languages: ["fr", "en", "it"],
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
  computed: {
    flag() {
      return this.flags[this.currentLanguage];
    },
  },
  methods: {
    // changeLanguage(language) {
    //   const currentIndex = this.languages.indexOf(this.currentLanguage);
    //   const nextIndex = (currentIndex + 1) % this.languages.length;
    //   this.currentLanguage = this.languages[nextIndex];
    //   console.log(this.currentLanguage);
    //   // Call your function to change the language in your app
    //   this.$i18n.locale = this.currentLanguage;
    //   Cookies.set("i18n_language", locale);
    // },

    changeLanguage(locale) {
      const languageSelectors = this.$refs.languageSelectors;
      console.log(languageSelectors);
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
