<template>
  <div id="slide1" class="flex container mx-auto p-8 h-screen">
    <div class="flex-grow flex flex-col justify-end mb-20">
      <h1 class="text-9xl font-bold mr-4"> {{ t("TitleMonin") }}</h1>
      <p class="text-lg mb-4">
        {{ t("DescriptionMonin[0]") }} <br>
        {{ t("DescriptionMonin[1]") }} <br>
        {{ t("DescriptionMonin[2]") }}<br>
        {{ t("DescriptionMonin[3]") }}
      </p>
      <p class="text-base mb-4 font-extralight">
        {{ t("WorkMonin[0]") }} <br>
        {{ t("WorkMonin[1]") }} <br>
        {{ t("WorkMonin[2]") }}<br>
        {{ t("WorkMonin[3]") }}
      </p>
    </div>
    <div class="flex-none w-2/5 relative mt-8">
      <img src="/monin.gif" alt="GIF" class=" object-cover">

    </div>
  </div>
  <div>
    <div class="containerDE horizontal h-screen w-screen">
      <div class="panell h-screen ">
        <video
          class=" h-[75%] flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay loop muted>
          <source :src="`/video/1.mov`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class=" h-[75%] flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay loop muted>
          <source :src="`/video/2.mov`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class=" h-[75%]  flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay loop muted>
          <source :src="`/video/3.mov`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class=" h-[75%]  flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay loop muted>
          <source :src="`/video/4.mov`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="panell h-screen">
        <video
          class=" h-[75%] flex content-center items-center relative mx-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          autoplay loop muted>
          <source :src="`/video/5.png`" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { gsap } from 'gsap';

const { $gsap: gsap } = useNuxtApp();
const main = ref();
const ctx = ref();
const { t } = useI18n();

let currentIndex = ref(0);
let animating = ref(false);

onMounted(() => {
  ctx.value = gsap.context((self) => {
    // Swipe section animations
    let swipePanels = gsap.utils.toArray('.swipe-section .panel');
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
    // Horizontal scrolling section 
    let horizontalSections = document.querySelectorAll('.horizontal .panell');
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
  }, main.value);
});

onUnmounted(() => {
  ctx.value.revert();
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

.swipe-section .panel {
  position: absolute;
}</style>
