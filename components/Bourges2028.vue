<template>
  <div id="slide1" class="relative container mx-auto flex flex-col lg:flex-row h-screen">
 <div class="flex-grow flex flex-col lg:justify-end mt-6 mb-16">
   <h1 class="2xl:text-9xl lg:text-8xl text-5xl font-bold mr-4">
     {{ t("TitleBourges[0]") }}<br> 
     {{ t("TitleBourges[1]") }}<br>
     {{ t("TitleBourges[2]") }}
   </h1>
   <p class="lg:text-2xl text-base mb-4">
     {{ t("DescriptionBourges[0]") }} <br>
     {{ t("DescriptionBourges[1]") }} <br>
     {{ t("DescriptionBourges[2]") }} <br>
     {{ t("DescriptionBourges[3]") }}
   </p>
   <p class="text-base 2xl:mb-4 lg:mb-10 font-extralight">
     {{ t("WorkBourges[0]") }}<br>
     {{ t("WorkBourges[1]") }}<br>
     {{ t("WorkBourges[2]") }}<br>
     {{ t("WorkBourges[3]") }}<br>
     {{ t("WorkBourges[4]") }}<br>
     {{ t("WorkBourges[5]") }}
   </p>
   <button v-cursorAnimation
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center px-4 group focus:outline-none hover:cursor-none  2xl:mb-20 mb-20"
        @click="buttonDown">
        <span class="border-0 text-black rounded-full p-2 active:bg-rose-neon/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" class="bounce">
            <path fill="currentColor" fill-rule="evenodd"
              d="M2.22 5.22a.75.75 0 0 0 0 1.06l5.252 5.252a.75.75 0 0 0 1.06 0l5.252-5.252a.75.75 0 1 0-1.06-1.06L8.001 9.94L3.28 5.22a.75.75 0 0 0-1.06 0"
              clip-rule="evenodd" />
          </svg>
        </span>
      </button>
 </div>
 <!-- <div class="hidden lg:flex flex-col items-center lg:basis-1/2">
   <div class="mb-4">
     <img src="/BidBook.png" alt="Bid Book" class="w-1/3 lg:w-1/6">
   </div>
   <div>
     <img src="/couverture_bidbook_.png" alt="Couverture Bidbook" class="w-1/3 lg:w-1/6">
   </div>
 </div> -->
 
</div>

<div id="slide2" class=" relative h-screen">
 <img src="/Bourges2028.png" alt="Bourges 2028" class="h-screen w-screen object-cover">
 <button v-cursorAnimation
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center px-4 group focus:outline-none hover:cursor-none  2xl:mb-20 mb-20"
        @click="buttonDown">
        <span class="border-0 text-black rounded-full p-2 active:bg-rose-neon/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" class="bounce">
            <path fill="currentColor" fill-rule="evenodd"
              d="M2.22 5.22a.75.75 0 0 0 0 1.06l5.252 5.252a.75.75 0 0 0 1.06 0l5.252-5.252a.75.75 0 1 0-1.06-1.06L8.001 9.94L3.28 5.22a.75.75 0 0 0-1.06 0"
              clip-rule="evenodd" />
          </svg>
        </span>
      </button>
</div>

<!-- Deux dernières images sur mobile -->
<div id="slide3" class=" relative flex flex-col lg:flex-row h-screen w-screen items-center justify-center">
  <button v-cursorAnimation
        class="absolute top-0 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center rotate-180 px-4 group focus:outline-none hover:cursor-none  2xl:mt-10 mt-10"
        @click="buttonUp">
        <span class="border-0 text-black rounded-full p-2 active:bg-rose-neon/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" class="bounce">
            <path fill="currentColor" fill-rule="evenodd"
              d="M2.22 5.22a.75.75 0 0 0 0 1.06l5.252 5.252a.75.75 0 0 0 1.06 0l5.252-5.252a.75.75 0 1 0-1.06-1.06L8.001 9.94L3.28 5.22a.75.75 0 0 0-1.06 0"
              clip-rule="evenodd" />
          </svg>
        </span>
      </button>
 <div class="flex flex-col justify-center basis-1/2">
   <div class="mx-auto w-1/2">
      <img src="/BidBook_fond_beige.png" alt="Bid Book Image" class="h-auto">
      <p class="lg:bottom-10 bottom-2 w-[120%] text-left  2xl:mb-14 font-extralight">
        réalisation du dossier de candidature pour la demi-finale
      </p>
   </div>
 </div>
 <div class="flex flex-col justify-center basis-1/2">
   <div class="mx-auto w-1/2">
      <img src="/couverture_Bidbook.png" alt="Bid Book Image" class="h-auto">
      <p class="lg:bottom-10 bottom-2 w-[120%] text-left  2xl:mb-14 font-extralight">
        réalisation du dossier de candidature pour la demi-finale
      </p>
   </div>
 </div>
</div>
</template>

<style>
.floating_book_container {
 animation: flotterAnimation 2s ease-in-out infinite alternate;
 z-index: 0;
}

.floating_book {
  display: flex;
}

@keyframes flotterAnimation {
 0% {
     transform: translateY(0);
 }

 100% {
     transform: translateY(-10px);
 }
}
</style>

<script setup>
const { t } = useI18n();
const emit = defineEmits(["buttonDown", "buttonUp"]);

function buttonDown() {
  emit("buttonDown");
}
function buttonUp() {
  emit("buttonUp");
}
</script>