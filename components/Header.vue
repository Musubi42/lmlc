<template>
  <div class="flex place-content-between py-6 px-10">
    <div class="">
      <img
        class="h-[13px] w-auto"
        src="~/assets/images/logo-lmlc-black.png"
        alt="Logo LMLC couleur noir"
      />
    </div>
    <div class="flex flex-row">
      <div class="flex flex-row font-montserrat font-medium text-sm mr-10">
        <span class="mr-4">FR</span>
        <span class="mr-4">EN</span>
        <span>IT</span>
      </div>
      <!-- 
        class="z-50 flex flex-col h-12 w-12 border-2 border-black rounded justify-center items-center group cursor-pointer" -->
      <div to="/menu" id="menu-burger" class="hover:cursor-pointer h-5 close">
        <div class="menu-burger-close-first"></div>
        <div class="menu-burger-close-second"></div>
        <div class="menu-burger-close-second"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document
      .getElementById("menu-burger")
      .addEventListener("click", this.toggleMenu);
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
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    toggleMenu() {
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
  },
};
</script>
