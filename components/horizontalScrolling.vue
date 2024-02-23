<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { gsap } from 'gsap';
import { watch } from "vue";

const props = defineProps({
  talentsBgColor: String,
});

watch(
  () => props.talentsBgColor,
  (newValue, oldValue) => {
    // console.log(newValue);
  }
);

const { $gsap: gsap } = useNuxtApp();
const main = ref();
const ctx = ref();
let currentIndex = ref(0);
let animating = ref(false);

// Use i18n
const { t } = useI18n();

// Get i18n instance
const { locale } = useI18n();

// Profiles data
var ceoAndFounder = ref(t("ceoAndFounder"));
var headNewBusiness = ref(t("headNewBusiness"));
var expertMarketing = ref(t("expertMarketing"));
var projectManager = ref(t("projectManager"));
var filmDirector = ref(t("filmDirector"));
var webDeveloper = ref(t("webDeveloper"));
var artisticDirector = ref(t("artisticDirector"));
var brandPerformanceExpert = ref(t("brandPerformanceExpert"));

const setLanguageTexts = () => {
  ceoAndFounder.value = t("ceoAndFounder");
  headNewBusiness.value = t("headNewBusiness");
  expertMarketing.value = t("expertMarketing");
  projectManager.value = t("projectManager");
  filmDirector.value = t("filmDirector");
  webDeveloper.value = t("webDeveloper");
  artisticDirector.value = t("artisticDirector");
  brandPerformanceExpert.value = t("brandPerformanceExpert");

  console.log(ceoAndFounder.value);
};

const profiles = ref([
  { name: "Léo MATTHIAU", title: ceoAndFounder, imageUrl: "./leo.png" },
  { name: "Constant GAMBIEZ", title: headNewBusiness, imageUrl: "./leo.png" },
  { name: "Cécile CARLOU", title: expertMarketing, imageUrl: "./leo.png" },
  { name: "Aline  MAGNIER", title: projectManager, imageUrl: "./leo.png" },
  { name: "Léo BOUDET", title: filmDirector, imageUrl: "./leo.png" },
  { name: "Benjamin ISSNER", title: webDeveloper, imageUrl: "./leo.png" },
  { name: "Océane LUNVEN", title: artisticDirector, imageUrl: "./leo.png" },
  { name: "Pascal CHARNEAU ", title: brandPerformanceExpert, imageUrl: "./leo.png" },
]);

var hasScrolled = ref(false);

const handleScroll = (event) => {
  console.log(event);
  if (event.target.scrollLeft > 0) {
    hasScrolled.value = true;
  }
};

onMounted(() => {
  // Get the language change of SwitchLanguage component
  watch(locale, () => {
    setLanguageTexts();
  });

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

    // Horizontal scrolling section
    let horizontalSections = document.querySelectorAll(".horizontal .profile");
    gsap.to(horizontalSections, {
      xPercent: -100 * (horizontalSections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal",
        pin: true,
        scrub: 1,
        end: "+8500",
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
  <!-- Desktop -->
    <div
      class="hidden md:flex overscroll-none w-[200vw] h-screen flex-nowrap items-center horizontal"
      :style="{ backgroundColor: talentsBgColor }"
    >
      <!-- Loop through the profiles data to create elements for each one -->
      <section
        v-for="profile in profiles"
        class="profile text-left ml-20 h-1/2 w-[300px] flex flex-col content-center items-center relative box-border text-white"
        :key="profile.name"
      >
        <NuxtImg class="object-cover w-full" :src="profile.imageUrl" alt="" />
        <div class="flex flex-col justify-start w-full">
          <h3 class="font-extrabold text-xl">{{ profile.name }}</h3>
          <p>{{ profile.title }}</p>
        </div>
      </section>
    </div>

    <!-- Mobile -->
    <div
      class="flex md:hidden h-screen items-center overflow-x-auto gap-10 relative"
      :style="{ backgroundColor: talentsBgColor }"
      @scroll="handleScroll"
    >
      <section
        v-for="profile in profiles"
        class="text-left min-w-[30vw] h-1/2 flex flex-col content-center items-center relative box-border text-white"
        :key="profile.name"
      >
        <NuxtImg class="object-cover w-full" :src="profile.imageUrl" alt="" />
        <div class="flex flex-col justify-start w-full">
          <h3 class="font-bold text-base">{{ profile.name }}</h3>
          <p class="text-sm">{{ profile.title }}</p>
        </div>
      </section>
      <svg
        v-show="!hasScrolled"
        class="animate-bounce absolute -ml-16 left-1/2 bottom-1/4 mr-4 h-16 w-16 text-white mix-blend-difference"
        fill="none"
        stroke="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

body {
  overscroll-behavior: none;
  height: 100vh;
}
</style>
