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
      <NuxtLink to="/menu" id="menu-burger hover:cursor-pointer" class="">
        <div
          class="menu__burger__sides__open h-[6px] w-8 rounded-full bg-black transition ease transform duration-300"
        ></div>
        <div
          class="menu__burger__middle__open h-[6px] w-8 mt-[1px] rounded-full bg-black transition ease transform duration-300"
        ></div>
        <div
          class="menu__burger__sides__open h-[6px] w-8 mt-[1px] rounded-full bg-black transition ease transform duration-300"
        ></div>
      </NuxtLink>
    </div>
  </div>
</template>

<!-- <script setup>

onMounted(() => {
  toggleMenu();
});

const toggleMenu = () => {
  const menu_burger = document.getElementById("menu-burger");
  const menu = document.getElementById("menu");
  const calendly = document.getElementById("calendly")
    ? document.getElementById("calendly")
    : false;
  const tarifs = document.getElementById("tarifs")
    ? document.getElementById("tarifs")
    : false;
  const coupes = document.getElementById("coupes")
    ? document.getElementById("coupes")
    : false;
  const reseaux = document.getElementById("reseaux")
    ? document.getElementById("reseaux")
    : false;
  const avis = document.getElementById("avis")
    ? document.getElementById("avis")
    : false;

  const menu_open = false;

  const lines = [
    {
      activate: [(opacity = "0.5")],
      desactivate: [
        (transform = "rotate(45)"),
        (transform = "translate(0, 12px)"),
      ],
    },
    {
      activate: [(opcaity = "0.5")],
      desactivate: [(opcaity = "0")],
    },
    {
      activate: [(opcaity = "0.5")],
      desactivate: [
        (transform = "rotate(-45)"),
        (transform = "translate(0, -12px)"),
      ],
    },
  ];

  menu_burger.addEventListener("click", (e) => {
  // menu_burger.children[0].classList.toggle("menu__burger__first__open");
  menu_burger.children[0].classList.toggle("menu__burger__first__close");

  // menu_burger.children[1].classList.toggle("menu__burger__second__open");
  menu_burger.children[1].classList.toggle("menu__burger__second__close");

  // menu_burger.children[2].classList.toggle("menu__burger__third__open");
  menu_burger.children[2].classList.toggle("menu__burger__third__close");

  // if(menu_open) {
  menu.classList.toggle("hidden");
  calendly ? calendly.classList.toggle("hidden") : null;
  tarifs ? tarifs.classList.toggle("hidden") : null;
  // Appliquer un hidden rejout la vidéo quand la navbar disparait
  // coupes ? coupes.classList.toggle("hidden") : null;
  // Mettre en pause toutes les vidéos
  videos.forEach((video) => {
    video.pause();
  });
  reseaux ? reseaux.classList.toggle("hidden") : null;
  avis ? avis.classList.toggle("hidden") : null;
  // calendly.classList.toggle("hidden");
  // }
}
}
</script> -->
