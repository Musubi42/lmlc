<template>
  <div id="slide1" class="container mx-auto flex flex-col lg:flex-row h-screen">
 <div class="flex-grow flex flex-col lg:justify-end mt-6 mb-16">
   <h1 class="text-5xl lg:text-5xl 2xl:text-8xl font-bold mr-4">
     {{ t("TitleBourges[0]") }}<br> 
     {{ t("TitleBourges[1]") }}<br>
     {{ t("TitleBourges[2]") }}
   </h1>
   <p class="text-base lg:text-sm 2xl:text-2xl mb-4">
     {{ t("DescriptionBourges[0]") }} <br>
     {{ t("DescriptionBourges[1]") }} <br>
     {{ t("DescriptionBourges[2]") }} <br>
     {{ t("DescriptionBourges[3]") }}
   </p>
   <p class="text-base lg:text-sm 2xl:text-base 2xl:mb-4 lg:mb-10 font-extralight">
     {{ t("WorkBourges[0]") }}<br>
     {{ t("WorkBourges[1]") }}<br>
     {{ t("WorkBourges[2]") }}<br>
     {{ t("WorkBourges[3]") }}<br>
     {{ t("WorkBourges[4]") }}<br>
     {{ t("WorkBourges[5]") }}
   </p>
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
<div id="slide2" class="h-screen">
 <img src="/Bourges2028.png" alt="Bourges 2028" class="h-screen w-screen object-cover">
</div>

<!-- Deux dernières images sur mobile -->
<div id="slide3" class="flex flex-col lg:flex-row h-screen w-screen items-center justify-center">
 <div class="relative basis-1/2">
   <img src="/BidBook.png" alt="Bid Book Image" class="w-full h-auto">
   <p class="absolute lg:bottom-10 bottom-2 w-full text-center p-4">
     réalisation du dossier de candidature pour la demi-finale
   </p>
 </div>
 <div class="relative basis-1/2">
   <img src="/BidBook.png" alt="Bid Book Image" class="w-full h-auto">
   <p class="absolute lg:bottom-10 bottom-2 w-full text-center p-4">
     réalisation du dossier de candidature pour la finale
   </p>
 </div>
</div>
</template>

<style>
.floating_book_container {
 animation: flotterAnimation 2s ease-in-out infinite alternate;
 z-index: 0;
}

.floating_book {
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
</script>