<template>
  <div>
    <a id="slide1"></a>
    <div class="flex justify-center items-center h-screen md:hidden">
      <img src="/monin.gif" alt="GIF" />
    </div>

    <!-- <div> -->
      <div class="flex flex-col lg:flex-row container mx-auto p-8 h-full lg:h-screen">
        <div class="flex-grow flex flex-col justify-end 2xl:mb-20 lg:mb-20 lg:order-1 order-2">
          <h1 class="2xl:text-9xl lg:text-8xl text-5xl font-bold 2xl:mr-4 lg:mr-4">
            {{ t("TitleMonin") }}
          </h1>
          <p class="lg:text-2xl text-base mb-4">
            {{ t("DescriptionMonin[0]") }} <br />
            {{ t("DescriptionMonin[1]") }} <br />
            {{ t("DescriptionMonin[2]") }}<br />
            {{ t("DescriptionMonin[3]") }}
          </p>
          <p class="text-base font-extralight">
            {{ t("WorkMonin[0]") }} <br />
            {{ t("WorkMonin[1]") }} <br />
            {{ t("WorkMonin[2]") }}<br />
            {{ t("WorkMonin[3]") }}
          </p>
        </div>
        <div
  class="md:flex hidden justify-center lg:justify-end 2xl:w-2/5 lg:w-2/5 relative 2xl:mt-8  mr-10 lg:order-2 order-1"
>
  <img src="/monin.gif" alt="GIF" class="object-cover mx-auto lg:h-5/6" />
</div>
      <!-- </div> -->
      <a id="Bottom"></a>
    </div>

    <div>
    <a id="slide2"></a>
    <div class="hidden md:flex containerDE horizontal h-screen">
      <div class="panell h-screen">
        <video
          class="lg:h-[75%] flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="`/video/1_desktop.webm`" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class="lg:h-[75%] flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="`/video/2_desktop.webm`" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class="lg:h-[75%] h-screen flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="`/video/3_desktop.webm`" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class="lg:h-[75%] flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="`/video/4_desktop.webm`" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class="lg:h-[75%] flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="`/video/5_desktop.webm`" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class="lg:h-[75%] flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="`/video/6_desktop.webm`" type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    <!-- mobile -->
    <div class="md:hidden flex overflow-x-auto items-center gap-10 relative">
      <div class="flex flex-nowrap">
        <div class="w-[75%] flex-shrink-0 h-full mx-4 mb-4">
          <video class="flex" autoplay loop muted playsinline>
            <source :src="`/video/1_mobile_high.mp4`" type="video/mp4" />
            <source :src="`/video/1_mobile_medium.mp4`" type="video/mp4" />
            <source :src="`/video/1_mobile_low.mp4`" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <button
          class="absolute bottom-1/2 right-0 transform translate-x-1/2 z-30 flex items-center justify-center mr-16 group focus:outline-none"
        >
          <span class="border-0 rounded-full p-2 active:bg-rose-neon/50 -rotate-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 16 16"
              class="bounce"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M2.22 5.22a.75.75 0 0 0 0 1.06l5.252 5.252a.75.75 0 0 0 1.06 0l5.252-5.252a.75.75 0 1 0-1.06-1.06L8.001 9.94L3.28 5.22a.75.75 0 0 0-1.06 0"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        <div class="w-[75%] flex-shrink-0 h-full mx-4">
          <video class="flex" autoplay loop muted playsinline>
            <source :src="`/video/2_mobile.webm`" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="w-[75%] flex-shrink-0 h-full mx-4">
          <video class="flex" autoplay loop muted playsinline>
            <source :src="`/video/3_mobile.webm`" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="w-[75%] flex-shrink-0 h-full mx-4">
          <video class="flex" autoplay loop muted playsinline>
            <source :src="`/video/4_mobile.webm`" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="w-[75%] flex-shrink-0 h-full mx-4">
          <video class="flex" autoplay loop muted playsinline>
            <source :src="`/video/5_mobile.webm`" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="w-[75%] flex-shrink-0 h-full mx-4">
          <video class="flex" autoplay loop muted playsinline>
            <source :src="`/video/6_mobile.webm`" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
   </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { gsap } from 'gsap';

const { $gsap: gsap } = useNuxtApp();
const main = ref();
const ctx = ref();
const { t } = useI18n();

let currentIndex = ref(0);
let animating = ref(false);
const slide1Element = ref(null);
const footerElement = ref(null);
let observer = ref(null);
const emit = defineEmits(["bottom-reached", "top-reached"]);

onMounted(() => {
  ctx.value = gsap.context((self) => {
    // Swipe section animations
    let swipePanels = gsap.utils.toArray(".swipe-section .panel");
    let reversedPanels = [...swipePanels].reverse();
    reversedPanels.forEach((panel, index) => {
      gsap.set(panel, { zIndex: index });
    });

    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => !animating && gotoPanel(currentIndex.value - 1, false),
      onDown: () => !animating && gotoPanel(currentIndex.value + 1, true),
      tolerance: 10,
      preventDefault: true,
    });
    intentObserver.disable();

    // Swipe panel animations function
    function gotoPanel(index, isScrollingDown) {
      animating = true;
      // return to normal scroll if we're at the end or back up to the start
      if (
        (index === swipePanels.length && isScrollingDown) ||
        (index === -1 && !isScrollingDown)
      ) {
        intentObserver.disable();
        return;
      }

      let target = isScrollingDown ? swipePanels[currentIndex.value] : swipePanels[index];
      gsap.to(target, {
        yPercent: isScrollingDown ? -100 : 0,
        duration: 0.75,
        onComplete: () => (animating = false),
      });

      currentIndex.value = index;
    }
    const isDesktop = window.innerWidth > 768;
    // Horizontal scrolling section
    if (isDesktop) {
      let horizontalSections = document.querySelectorAll(".horizontal .panell");
      gsap.to(horizontalSections, {
        xPercent: -100 * (horizontalSections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".horizontal",
          pin: true,
          scrub: 1,
          end: "+=3500",
        },
      });
    }
  }, main.value);
  slide1Element.value = document.getElementById("Bottom");
  footerElement.value = document.getElementById("footer");

  const observerOptions = {
    root: null, // Utilise le viewport comme zone de défilement
    rootMargin: "0px",
    threshold: 0.1, // Ajustez selon vos besoins pour déterminer quel pourcentage de l'élément doit être visible
  };

  observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "Bottom") {
          emit("bottom-reached");

          // Logique spécifique à Slide 1
        } else if (entry.target.id === "footer") {
          emit("top-reached");
          // Logique spécifique au Footer
        }
      }
    });
  }, observerOptions);

  // Commence à observer les éléments
  if (slide1Element.value) {
    observer.observe(slide1Element.value);
  }
  if (footerElement.value) {
    observer.observe(footerElement.value);
  }
});

onUnmounted(() => {
  ctx.value.revert();
  if (slide1Element.value) {
    observer.unobserve(slide1Element.value);
  }
  if (footerElement.value) {
    observer.unobserve(footerElement.value);
  }
});
</script>

<style scoped>
.containerDE {
  overscroll-behavior: none;
  width: 200%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
}

.swipe-section {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
@media (max-width: 768px) {
  .containerDE,
  .swipe-section {
    display: none;
  }
}

.swipe-section .panel {
  position: absolute;
}

/* Utilisez des classes Tailwind pour responsivité */
@media (max-width: 768px) {
  .containerDE {
    /* Défilement horizontal manuel sur les petits écrans */
    overflow-x: auto;
    width: 100%;
    /* Ajustez la largeur pour les mobiles */
  }

  .h-screen {
    height: auto;
    /* Hauteur auto pour éviter les problèmes sur mobile */
  }
}
</style>