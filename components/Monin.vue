<template>
  <div id="slide1" class="container mx-auto p-8 h-screen w-screen">
    <div class="flex items-center mb-8">
      <div class="xl:mt-24 xl:mb-24">
        <h1 class="text-9xl font-bold mr-4">MONIN</h1>
        <p class="text-lg mb-4">Leader mondial des sirops et première référence du <br> monde de la mixologie, notre
          agence
          accompagne<br> l'entreprise familiale dans des projets de <br> brandcontent et de social media.</p>
        <p class="text-base mb-4 ">
          social media<br>
          community management<br>
          production audiovisuelle<br>
          shooting photo
        </p>
      </div>
      <div class="xl:ml-auto">
      <img src="/monin.gif" alt="GIF" class="w-2/3">
</div> 
    </div>
  </div>
  <div >
    <div class="containerDE horizontal h-screen w-screen">
      <video class="panell h-screen flex content-center items-center relative mx-5"
        autoplay loop muted>
        <source :src="`/video/1.mov`" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video class="panell h-screen flex content-center items-center relative mx-5"
        autoplay loop muted>
        <source :src="`/video/2.mov`" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video class="panell h-screen flex content-center items-center relative  mx-5"
        autoplay loop muted>
        <source :src="`/video/3.mov`" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video class="panell h-screen flex content-center items-center relative mx-5"
        autoplay loop muted>
        <source :src="`/video/4.mov`" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video class="panell h-screen flex content-center items-center relative mx-5"
        autoplay loop muted>
        <source :src="`/video/5.mp4`" type="video/mp4">
        Your browser does not support the video tag.
      </video>
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
}</style>
