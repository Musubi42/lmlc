<template>
  <section ref="metier" class="h-screen flex items-center scrollbar-hide w-full bg-black" :class="{ 'bg-transparent': !showOverlay }">
    <!-- <ServicesAnimation :metierHeight="sectionMetierHeight" :mousePositionY="mouseAbsolutePositionY" class="relative z-0 pointer-events-none" /> -->
      <!-- <div v-if="showOverlay" class="absolute inset-0 bg-black transition-colors duration-1000" ></div> -->
      <div class="absolute my-auto z-10 w-full box-border px-8">
        <div class="relative flex flex-col md:flex-row gap-9 md:gap-2 mt-20 md:mt-0 md:mx-20 justify-around section-content font-extralight">
          <div class="flex-1 z-10">
            <h3 class="font-semibold text-2xl section-content-title">{{ strategies }}</h3>
            <ul id="sectionDescriptionMetier" class="">
              <li>{{ strategiesOne }}</li>
              <li>{{ strategiesTwo }}</li>
              <li>{{ strategiesThree }}</li>
            </ul>
          </div>

          <div class="flex-1">
            <h3 class="font-semibold text-2xl section-content-title">branding</h3>
            <ul id="sectionDescriptionMetier" class="">
              <li>{{ brandingOne }}</li>
              <li>{{ brandingTwo }}</li>
              <li>{{ brandingThree }}</li>
              <li>{{ brandingFour }}</li>
              <li>{{ brandingFive }}</li>
            </ul>
          </div>

          <div class="flex-1">
            <h3 class="font-semibold text-2xl section-content-title">digital</h3>
            <ul id="sectionDescriptionMetier" class="">
              <li>{{ digitalOne }}</li>
              <li>{{ digitalTwo }}</li>
              <li>{{ digitalThree }}</li>
              <li>{{ digitalFour }}</li>
              <li>{{ digitalFive }}</li>
            </ul>
          </div>

          <div class="min-w-[200px]">
            <h3 class="font-semibold text-2xl section-content-title">brandcontent</h3>
            <ul id="sectionDescriptionMetier" class="">
              <li>{{ brandContentOne }}</li>
              <li>{{ brandContentTwo }}</li>
              <li>{{ brandContentThree }}</li>
              <li>{{ brandContentFour }}</li>
            </ul>
          </div>
        </div>
      </div>
  </section>
</template>

<style scoped>
@keyframes slideDown {
  from {
    transform: translateY(-500px);
  }
  to {
    transform: translateY(0);
  }
}

.section-content {
  transition: color 2s ease;
}

.section-content-title {
  color: white;
  transition: color 2s ease;
}

.section-content-list {
  transform: translateY(-500px);
  color: white;
  animation: slideDown 2s ease forwards;
}

.bg-transparent .section-content h3,
.bg-transparent .section-content ul {
  color: black;
}
</style>


<script>
export default {
  data() {
    return {
      showOverlay: true,
      showContent: false,
      sectionMetierHeight: 0,
      mouseY: 0,
      mouseAbsolutePositionY: 0,
      scrollY: 0,
      strategies: this.$t("strategies"),
      strategiesOne: this.$t("strategiesOne"),
      strategiesTwo: this.$t("strategiesTwo"),
      strategiesThree: this.$t("strategiesThree"),
      brandingOne: this.$t("brandingOne"),
      brandingTwo: this.$t("brandingTwo"),
      brandingThree: this.$t("brandingThree"),
      brandingFour: this.$t("brandingFour"),
      brandingFive: this.$t("brandingFive"),
      digitalOne: this.$t("digitalOne"),
      digitalTwo: this.$t("digitalTwo"),
      digitalThree: this.$t("digitalThree"),
      digitalFour: this.$t("digitalFour"),
      digitalFive: this.$t("digitalFive"),
      brandContentOne: this.$t("brandContentOne"),
      brandContentTwo: this.$t("brandContentTwo"),
      brandContentThree: this.$t("brandContentThree"),
      brandContentFour: this.$t("brandContentFour"),
    };
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
      this.mouseAbsolutePositionY = this.mouseY + this.scrollY;
    },
    handleMouseMove(event) {
      this.mouseY = event.clientY;
      this.mouseAbsolutePositionY = this.mouseY + this.scrollY;
    },

    setLanguageTexts() {
      this.strategies =  this.$t("strategies");
      this.strategiesOne = this.$t("strategiesOne");
      this.strategiesTwo = this.$t("strategiesTwo");
      this.strategiesThree = this.$t("strategiesThree");
      this.brandingOne = this.$t("brandingOne");
      this.brandingTwo = this.$t("brandingTwo");
      this.brandingThree = this.$t("brandingThree");
      this.brandingFour = this.$t("brandingFour");
      this.brandingFive = this.$t("brandingFive");
      this.digitalOne = this.$t("digitalOne");
      this.digitalTwo = this.$t("digitalTwo");
      this.digitalThree = this.$t("digitalThree");
      this.digitalFour = this.$t("digitalFour");
      this.digitalFive = this.$t("digitalFive");
      this.brandContentOne = this.$t("brandContentOne");
      this.brandContentTwo = this.$t("brandContentTwo");
      this.brandContentThree = this.$t("brandContentThree");
      this.brandContentFour = this.$t("brandContentFour");
    }, 
  },
  mounted() {
    // Get the language change of SwitchLanguage component
     watch(() => this.$i18n.locale, () => {
      this.setLanguageTexts();
    });

    setTimeout(() => {
      this.showOverlay = false;

      const sectiondescriptionMetier = document.querySelectorAll("#sectionDescriptionMetier");
      for (let i = 0; i < sectiondescriptionMetier.length; i++) {
        sectiondescriptionMetier[i].classList.add("section-content-list");
      }
    }, 500);

    window.addEventListener("mousemove", this.handleScroll);
    window.addEventListener("mousemove", this.handleMouseMove);
    this.sectionMetierHeight = this.$refs.metier.offsetHeight;
  },
};
</script>


