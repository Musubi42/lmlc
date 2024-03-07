<template>
  <header class="w-full z-50 absolute pt-6 pb-10">
    <div class="relative z-50 place-content-between pl-6 md:px-10 flex flex-row">
    <Menu :isMenuOpen="toggleMenu" @update:isMenuOpen="handleMenuUpdate" class="z-[100] absolute -mt-6" />
      <div
        class="duration-300 transition-opacity"
        :style="{ 'opacity': dynamicStyle}"
        >
        <NuxtLink
          to="/"
          class="" 
          v-cursorAnimation
        >
          <img
            class="h-[11px] w-auto fixed cursor-none invert"
            src="~/assets/images/logo-lmlc-black.png"
            alt="Logo LMLC couleur noir"
          />
        </NuxtLink>
      </div>
      <div class="flex flex-row">
        <SwitchLanguageAbout :languageStyle="dynamicStyle" v-cursorAnimation />

        <div
          to="/menu"
          id="menu-burger"
          class="h-auto close z-[1000] fixed mr-4 right-0 text-black"
        >
          <IconsMenuBurger
            aria-label="menuBurger"
            :style="{ height: burgerHeight + 'px', y: y + 'px' }"
            :y="y"
            class="text-[50px] fill-black invert"
            ref="menuBurger"
            @click="toggleMenuBurger"
            v-cursorAnimation
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style>
.blend-mode {
  mix-blend-mode: difference;
}

.part1-open {
  animation: part1-open-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part1-open-animation {
  /* Start the animation right away */
  0% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  /* Finish changes by here */
  35% {
    transform: translate(3px, 7px);
    /* transform: translateY(7px); */
    width: 32px;
    height: 6px;
    fill: black;
  }

  60% {
    transform: translate(3px, 7px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  /* Between 20% and 100%, nothing changes */
  100% {
    transform: translate(3px, 0px);
    width: 10px;
    height: 25px;
    fill: white;
  }
}

/* [class^="i-"][class*="__part2"] { */
.part2-open {
  animation: part2-open-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part2-open-animation {
  /* Start the animation right away */
  0% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  /* Finish changes by here */
  35% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  60% {
    transform: translate(16px, 0px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  /* Between 20% and 100%, nothing changes */
  100% {
    transform: translate(16px, -7px);
    width: 10px;
    height: 50px;
    fill: white;
  }
}

.part3-open {
  animation: part3-open-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part3-open-animation {
  /* Start the animation right away */
  0% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  /* Finish changes by here */
  35% {
    transform: translate(0px, -7px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  60% {
    transform: translate(29px, -7px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  /* Between 20% and 100%, nothing changes */
  100% {
    transform: translate(29px, -14px);
    width: 10px;
    height: 50px;
    fill: white;
  }
}

.part1-close {
  animation: part1-close-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part1-close-animation {
  0% {
    transform: translate(0px, 0px);
    width: 10px;
    height: 25px;
    fill: white;
  }

  35% {
    transform: translate(0px, 7px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  60% {
    transform: translate(0, 7px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  100% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: black;
  }
}

.part2-close {
  animation: part2-close-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part2-close-animation {
  0% {
    transform: translate(16px, -7px);
    width: 10px;
    height: 50px;
    fill: white;
  }

  35% {
    transform: translate(16px, 0px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  60% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  100% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: black;
  }
}

.part3-close {
  animation: part3-close-animation 0.6s none;
  animation-fill-mode: forwards;
}

@keyframes part3-close-animation {
  0% {
    transform: translate(32px, -14px);
    width: 10px;
    height: 50px;
    fill: white;
  }

  35% {
    transform: translate(32px, -7px);
    width: 10px;
    height: 6px;
    fill: white;
  }

  60% {
    transform: translate(0px, -7px);
    width: 32px;
    height: 6px;
    fill: black;
  }

  100% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: black;
  }
}
</style>

<!-- TODO: Comment faire l'animation https://codepen.io/chichichi/pen/YNaVKK -->
<script>
import Cookies from "js-cookie";
import menuBurger from "assets/icons/menu_burger.svg";
// import

export default {
  props: {
    dynamicStyle: {
      type: Object,
      required: false,
    },
    callToggleMenu: {
      type: Boolean,
      required: false,
    },
  },
  setup() {
    // const isMenuOpen = ref(false);
    const isMenuOpen = stateMenuOpen();
    // isMenuOpen.value = MenuOpen;

    const isTalents = talents();

    const isMobileUpdateLanguage = mobileUpdateLanguage();

    isTalents.value = false;

    return {
      isMenuOpen,
      isTalents,
      isMobileUpdateLanguage,
    };
  },
  data() {
    return {
      toggleMenu: false,
      menuBurgerOpened: false,
      language: "FR",
      isDropdownOpen: false, // Add this line to track the dropdown state
      burgerHeight: 24,
      burgerWidth: 38,
      x: 0,
      y: 0,
    };
  },
  watch: {
    isMenuOpen: {
      handler: function (newVal, oldVal) {
        if (newVal === false) {
          // this.toggleMenuBurger();
        }
      },
      deep: true, // Ceci est nécessaire si 'isMenuOpen' est un objet
    },
    dynamicStyle: {
      handler: function (newVal, oldVal) {
        if (newVal === false) {
          // this.toggleMenuBurger();
        }
      },
      deep: true, // Ceci est nécessaire si 'isMenuOpen' est un objet
    },
    callToggleMenu: {
      handler: function (newVal, oldVal) {
        console.log(newVal, oldVal);
        if (newVal === true) {
          this.toggleMenuBurger();
        }
      },
    },
    // isTalents: {
    //   handler: function (newVal, oldVal) {
    //     console.log(newVal, oldVal);
    //     if (newVal === false) {
    //       // this.toggleMenuBurger();
    //     }
    //   },
    // },
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
  mounted() {},
  unmounted() {},
  methods: {
    handleMenuUpdate(event) {
      this.toggleMenuBurger();

      // // Update current language in use
      // console.log("ici");
      // this.isMobileUpdateLanguage++;
    },
    toggleDropdown() {
      // Toggle the dropdown state
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleMenuBurger() {
      // Update current language in use
      console.log("ici");
      this.isMobileUpdateLanguage++;
      
      this.isMenuOpen = !this.isMenuOpen;
      this.toggleMenu = !this.toggleMenu;
      this.menuBurgerOpened = !this.menuBurgerOpened;

      // change the height here
      this.burgerHeight = this.menuBurgerOpened ? 50 : 24;

      const svgElement = this.$refs.menuBurger.$el;
      const rectElements = svgElement.querySelectorAll("rect");
      const rect1 = rectElements[0];
      const rect2 = rectElements[1];
      const rect3 = rectElements[2];

      rect1.style.y = this.menuBurgerOpened ? "-13px" : "0px";
      rect2.style.y = this.menuBurgerOpened ? "-6px" : "8px";
      rect3.style.y = this.menuBurgerOpened ? "1px" : "16px";

      if (this.menuBurgerOpened) {
        // Block the scrolling, so no problem with the image on hover
        document.body.style.overflow = "hidden";

        rect1.classList.remove("part1-close");
        rect2.classList.remove("part2-close");
        rect3.classList.remove("part3-close");

        rect1.classList.add("part1-open");
        rect2.classList.add("part2-open");
        rect3.classList.add("part3-open");
      } else {
        document.body.style.overflow = "auto";

        rect1.classList.remove("part1-open");
        rect2.classList.remove("part2-open");
        rect3.classList.remove("part3-open");

        rect1.classList.add("part1-close");
        rect2.classList.add("part2-close");
        rect3.classList.add("part3-close");
      }
    },
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
  },
};
</script>
