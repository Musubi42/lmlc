<template>
  <div>
    <Menu :isMenuOpen="toggleMenu" />
    <div class="place-content-between py-6 pl-6 md:px-10 flex flex-row">
      <div class="">
        <img
          class="h-[11px] w-auto"
          src="~/assets/images/logo-lmlc-black.png"
          alt="Logo LMLC couleur noir"
        />
        <!-- TODO: revenir à la page d'accueil -->
      </div>
      <div class="flex flex-row">
        <div
          class="flex flex-row font-montserrat font-medium text-sm mt-[-4px] mr-16 md:mr-40 content-end cursor-pointer"
        >
          <span @click="changeLanguage('fr')" class="mr-4">FR</span>
          <span @click="changeLanguage('en')" class="mr-4">EN</span>
          <span @click="changeLanguage('it')">IT</span>
        </div>
        <div
          to="/menu"
          id="menu-burger"
          class="hover:cursor-pointer h-5 close z-[1000] fixed mr-6 md:mr-10 right-0"
          @click="toggleMenuButton"
        >
          <div class="menu-burger-close-first"></div>
          <div class="menu-burger-close-second"></div>
          <div class="menu-burger-close-second"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- TODO: Comment faire l'animation https://codepen.io/chichichi/pen/YNaVKK -->
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      toggleMenu: false,
    };
  },  created() {
    // Lorsque le composant est créé, vérifiez si un cookie de langue existe
    const savedLang = Cookies.get('i18n_language');
    
    if (savedLang) {
      // Si un cookie existe, utilisez-le pour définir la langue
      this.$i18n.locale = savedLang;
    } else {
      // Sinon, utilisez la langue par défaut de votre application
      this.$i18n.locale = 'fr'; // Mettez la langue par défaut de votre choix
    }
  },
  mounted() {},
  unmounted() {},
  methods: {
    changeLanguage(locale) {
      Cookies.set("i18n_language", locale);
      this.$i18n.locale = locale;
      
    },
    toggleMenuButton() {
      this.toggleMenu = !this.toggleMenu;

      document.querySelectorAll("#menu-burger")[0].classList.toggle("open");
      document.querySelectorAll("#menu-burger")[0].classList.toggle("close");
      document
        .querySelectorAll("#menu-burger")[0]
        .childNodes[0].classList.toggle("menu-burger-open-first");
      document
        .querySelectorAll("#menu-burger")[0]
        .childNodes[0].classList.toggle("menu-burger-close-first");

      document
        .querySelectorAll("#menu-burger")[0]
        .childNodes[1].classList.toggle("menu-burger-open-second");
      document
        .querySelectorAll("#menu-burger")[0]
        .childNodes[1].classList.toggle("menu-burger-close-second");

      document
        .querySelectorAll("#menu-burger")[0]
        .childNodes[2].classList.toggle("menu-burger-open-third");
      document
        .querySelectorAll("#menu-burger")[0]
        .childNodes[2].classList.toggle("menu-burger-close-second");
      // document.getElementById("menu-burger").classList.toggle("menu__burger__open");
      // document.getElementById("menu-burger").classList.toggle("menu__burger__close");
    },
  },
};
</script>

<script setup>
import menuMobile from "assets/images/menu-black.svg";
</script>
