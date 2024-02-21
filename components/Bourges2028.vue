<template>
    <div id="slide1" class="flex container mx-auto  h-screen">
        <div class="flex-grow flex flex-col justify-end mb-16">
            <h1 class="lg:text-8xl font-bold mr-4">{{ t("TitleBourges[0]") }}<br> {{ t("TitleBourges[1]") }}<br>
                {{ t("TitleBourges[2]") }}</h1>
            <p class="lg:text-lg mb-4">
                {{ t("DescriptionBourges[0]") }} <br>
                {{ t("DescriptionBourges[1]") }} <br>
                {{ t("DescriptionBourges[2]") }} <br>
                {{ t("DescriptionBourges[3]") }}
            </p>
            <p class="lg:text-base mb-4 font-extralight">
                {{ t("WorkBourges[0]") }}<br>
                {{ t("WorkBourges[1]") }}<br>
                {{ t("WorkBourges[2]") }}<br>
                {{ t("WorkBourges[3]") }}<br>
                {{ t("WorkBourges[4]") }}<br>
                {{ t("WorkBourges[5]") }}<br>
            </p>
        </div>
        <div class="">
            <div class="floating_book_container">
                <img src="/BidBook.png" alt="GIF" class="floating_book xl:ml-auto">
            </div>
            <div class="floating_book_container">
                <img src="/couverture_bidbook_.png" alt="GIF" class="floating_book xl:ml-auto">
            </div>
        </div>

    </div>
    <div id="slide2" class="h-screen">
        <img src="/Bourges2028.png" alt="GIF" class="h-screen w-screen">
    </div>
    <div id="slide3" class="flex h-screen w-screen items-center justify-center">
        <div class="relative basis-1/2">
            <img src="/BidBook.png" alt="Bid Book Image" class="w-full h-auto">

            <p class="absolute bottom-10 w-full text-center p-4">
                réalisation du dossier de candidature pour la demi-finale
            </p>
        </div>
        <div class="relative basis-1/2">
            <img src="/BidBook.png" alt="Bid Book Image" class="w-full h-auto">

            <p class="absolute bottom-10 w-full text-center p-4 ">
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
    width: 50%;
    height: 50%;
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