<template>
  <div class="bg-white">
    <Menu :isMenuOpen="toggleMenu" />
    <div class="place-content-between py-6 pl-6 md:px-10 flex flex-row">
      <div class="">
        <img
          class="h-[11px] w-auto"
          src="~/assets/images/logo-lmlc-black.png"
          alt="Logo LMLC couleur noir"
        />
      </div>
      <div class="flex flex-row">
        <div
          ref="languageSelectors"
          class="flex flex-row font-montserrat font-medium text-sm mt-[-4px] mr-16 md:mr-40 content-end cursor-pointer"
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
            <div
              v-show="isDropdownOpen"
              id="dropdown"
              class="z-20 absolute bg-white divide-y divide-gray-100 rounded-lg"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-white"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    @click="changeLanguage('fr')"
                    class="block px-4 py-2 hover:bg-gray-100 text-black hover:bg-black text-center"
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
            </div>
          </div>
          <!-- Options de langue visibles sur les écrans moyens et plus grands -->
          <span class="hidden md:flex flex-row">
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
          </span>
        </div>
        <div
          to="/menu"
          id="menu-burger"
          class="hover:cursor-pointer h-auto close z-[1000] fixed mt-[-7px] mr-6 md:mr-10 right-0 text-white blend-mode"
          @click=""
        >
          <IconsMenuBurger
            class="text-[50px]"
            ref="menuBurger"
            @click="toggleMenuBurger"
          />
        </div>
      </div>
    </div>
  </div>
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
    fill: white;
  }

  100% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: white;
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
    fill: white;
  }

  100% {
    transform: translate(0px, 0px);
    width: 32px;
    height: 6px;
    fill: white;
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
    fill: white;
  }

  100% {
    transform: translateY(0px);
    width: 32px;
    height: 6px;
    fill: white;
  }
}
</style>

<!-- TODO: Comment faire l'animation https://codepen.io/chichichi/pen/YNaVKK -->
<script>
import Cookies from "js-cookie";
import menuBurger from "assets/icons/menu_burger.svg";
// import 

export default {
  data() {
    return {
      toggleMenu: false,
      menuBurgerOpened: false,
      language: "FR",
      isDropdownOpen: false, // Add this line to track the dropdown state
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
  mounted() {},
  unmounted() {},
  components: {
    menuBurger,
  },
  methods: {
    toggleDropdown() {
      // Toggle the dropdown state
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleMenuBurger() {
      this.toggleMenu = !this.toggleMenu;
      this.menuBurgerOpened = !this.menuBurgerOpened;
      console.log(this.menuBurgerOpened);
      const svgElement = this.$refs.menuBurger.$el;
      const rectElements = svgElement.querySelectorAll("rect");
      const rect1 = rectElements[0];
      const rect2 = rectElements[1];
      const rect3 = rectElements[2];

      if (this.menuBurgerOpened) {
        document.getElementById("menu-burger").classList.toggle("blend-mode");

        rect1.classList.remove("part1-close");
        rect2.classList.remove("part2-close");
        rect3.classList.remove("part3-close");

        rect1.classList.add("part1-open");
        rect2.classList.add("part2-open");
        rect3.classList.add("part3-open");
      } else {
        rect1.classList.remove("part1-open");
        rect2.classList.remove("part2-open");
        rect3.classList.remove("part3-open");

        rect1.classList.add("part1-close");
        rect2.classList.add("part2-close");
        rect3.classList.add("part3-close");

        setTimeout(() => {
          document.getElementById("menu-burger").classList.toggle("blend-mode");
        }, 600);
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
