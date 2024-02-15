<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { gsap } from 'gsap';
import { watch } from 'vue';

const props = defineProps({
  talentsBgColor: String,
});

watch(() => props.talentsBgColor, (newValue, oldValue) => {
  // console.log(newValue);
});

const { $gsap: gsap } = useNuxtApp();
const main = ref();
const ctx = ref();
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

    // Pin swipe section and initiate observer
    // ScrollTrigger.create({
    //   trigger: ".swipe-section",
    //   pin: true,
    //   start: "top top",
    //   onEnter: () => {
    //     intentObserver.enable();
    //     gotoPanel(currentIndex.value + 1, true);
    //   },
    //   onEnterBack: () => {
    //     intentObserver.enable();
    //     gotoPanel(currentIndex.value - 1, false);
    //   },
    // });

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

<template>
  <div>
    <!-- <div class="description panel blue">
      <div>
        <h1>Mixed observer and scrolling...</h1>
        <div class="scroll-down">
          Scroll down
          <div class="arrow"></div>
        </div>
      </div>
    </div>

    <div class="swipe-section">
      <section class="panel red">ScrollTrigger.observe() section</section>
      <section class="panel purple">SWIPE SECTION 2</section>
      <section class="panel blue">SWIPE SECTION 3</section>
      <section class="panel orange">Last swipe section... continue scrolling</section>
    </div> -->

    <div class="containerDE horizontal">
      <section class="panell h-screen flex content-center items-center relative box-border text-center w-screen text-white" :style="{ backgroundColor: talentsBgColor }">ONE</section>
      <section class="panell h-screen flex content-center items-center relative box-border text-center w-screen text-white" :style="{ backgroundColor: talentsBgColor }">TWO</section>
      <section class="panell h-screen flex content-center items-center relative box-border text-center w-screen text-white" :style="{ backgroundColor: talentsBgColor }">THREE</section>
      <section class="panell h-screen flex content-center items-center relative box-border text-center w-screen text-white" :style="{ backgroundColor: talentsBgColor }">FOUR</section>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
body {
  overscroll-behavior: none;
  height: 100vh;
}
.containerDE {
  overscroll-behavior: none;
  width: 400%;
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
}
</style>
