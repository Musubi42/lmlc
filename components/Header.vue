<template>
  <div>
    <transition name="slide-fade" @after-enter="afterEnter">
      <Menu
        v-if="isMenuOpen"
        :class="{ 'end-of-transition': isTransitionEnded }"
      />
    </transition>
    <div class="place-content-between py-6 pl-6 md:px-10 flex flex-row">
      <div class="">
        <img
          class="h-[11px] w-auto"
          src="~/assets/images/logo-lmlc-black.png"
          alt="Logo LMLC couleur noir"
        />
        <!-- TODO: revenir à la page d'accueil -->
      </div>
      <div class="flex flex-row place-content-end">
        <div
          class="flex flex-row font-montserrat font-medium text-sm mt-[-4px] mr-16 md:mr-40 content-end"
        >
          <span class="mr-4">FR</span>
          <span class="mr-4">EN</span>
          <span>IT</span>
          <div
            to="/menu"
            id="menu-burger"
            class="hover:cursor-pointer h-5 close z-[1000] fixed mr-6 md:mr-10 right-0"
          >
            <div class="menu-burger-close-first"></div>
            <div class="menu-burger-close-second"></div>
            <div class="menu-burger-close-second"></div>
          </div>
        </div>
        <!-- 
        class="z-50 flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group cursor-pointer" -->
      </div>
    </div>
  </div>
</template>

<!-- TODO: Comment faire l'animation https://codepen.io/chichichi/pen/YNaVKK -->
<style scoped>
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-enter-to {
  transform: translateX(10px);
}

.end-of-transition {
  transform: translateX(0);
}
</style>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
      isTransitionEnded: false,
    };
  },
  mounted() {
    document
      .getElementById("menu-burger")
      .addEventListener("click", this.toggleMenu);

    document
      .getElementById("menu-burger")
      .addEventListener("click", this.toggleMenuButton);
    // => {
    //   document
    //     .getElementById("menu-burger")
    //     .classList.toggle("menu__burger__open");
    //   document
    //     .getElementById("menu-burger")
    //     .classList.toggle("menu__burger__close");
    // });
  },
  unmounted() {
    document
      .getElementById("menu-burger")
      .removeEventListener("click", this.toggleMenu);

    document
      .getElementById("menu-burger")
      .removeEventListener("click", this.toggleMenuButton);
  },
  methods: {
    afterEnter() {
      this.isTransitionEnded = true;
    },
    toggleMenuButton() {
      console.log(document.querySelectorAll("#menu-burger")[0].childNodes);
      console.log(
        document.querySelectorAll("#menu-burger")[0].childNodes[0].classList
      );
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<script setup>
import menuMobile from "assets/images/menu-black.svg";
</script>
