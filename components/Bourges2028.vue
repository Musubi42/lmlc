<template>
    <div id="slide1" class="h-screen">
        <div class="flex items-center mb-8 xl:ml-14 xl:mr-14 xl:mt-14">
            <div class="xl:mt-20">
                <h1 class="lg:text-1xl xl:text-6xl font-bold xl:mr-4">CAPITALE<br> EUROPEENNE<br>
                    DE LA CULTURE</h1>
                <p class="text-lg mb-4">La ville de Bourges, sacrée capitale européenne de <br> la culture 2028, a été
                    accompagnée par notre <br> agence dans le cadre de sa candidature, afin de la <br> conduire jusqu'à la
                    victoire.
                </p>
                <p class="text-base mb-4 ">
                    consulting<br>
                    DA & graphisme<br>
                    charte graphique<br>
                    édition & mise en page<br>
                    production audiovisuelle<br>
                    développement web<br>
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
    </div>
    <div id="slide2" class="h-screen">
        <img src="/Bourges2028.png" alt="GIF" class="h-screen w-screen">
    </div>
    <div id="slide3" class="flex  h-screen w-screen">
        <div class="basis-1/2">
            <div>
                <img src="/BidBook.png" alt="">
            </div>
        </div>
        <div class="basis-1/2">
            <img src="/BidBook.png" alt="">
        </div>
    </div>
    <div id="slide4" class="flex  h-screen">

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