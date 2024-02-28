<template>
  <div @wheel="handleWheelEvent" ref="body" class="transition-all duration-200">
    <!-- Partie métiers -->
    <ServicesAnimation v-if="showServicesAnimation" :metierHeight="sectionMetierHeight" :mousePositionY="mouseAbsolutePositionY" class="hidden md:block relative z-0 pointer-events-none" />

    <div ref="aboutMetier">
      <!-- <MetierCopy  /> -->
      <Metier  />
    </div>
 
    <!-- Partie talents -->
    <!-- Jouer avec la taille de cet élément pour trigger le changement -->
    <!-- Je peux aussi détecter la position de la souris, si je suis en haut -->
    <!-- overflow-unset md:overflow-hidden -->
    <section ref="servicesTalents" class="h-screen block relative ">

    <!-- TODO: hidden le scroll, et mettre une div spéciale pour mobile avec le chevron pour scroller -->
    <HorizontalScrolling :talentsBgColor="bgColor" />
    </section> 
  </div>
</template>

<style>
body {
  background-color: black;
}
.unset-overflow {
  overflow: unset;
}

.background-black {
  /* background-color: black; */
  background-color: rgba(0, 0, 0, 1);
}

.background-white {
  background-color: white;
}
</style>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "nada",
    });
    const ScrollHorizontal = isScrollHorizontal();
    const isMenuOpen = stateMenuOpen();

    const isMobile = stateIsMobile();

    const isTalents = talents();

    return {
      ScrollHorizontal,
      isMenuOpen,
      isMobile,
      isTalents,
    };
  },
  data() {
    return {
      scroll: { deltaY: 0, deltaX: 0 },
      isScroll: true,
      body: null,
      sectionMetierHeight: 0,
      scrollY: 0,
      mouseY: 0,
      mouseAbsolutePositionY: 0,
      bgColor: "white",
      showServicesAnimation: false,
    };
  },
  methods: {
    handleScrollHorizontal(entries) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        document.body.style.overflow = "hidden";
        this.ScrollHorizontal = true;
      }
    },

    // Envoyer aussi la couleur à l'enfant
    handleAddBgBlack(entries) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        const body = this.$refs.body;
        body.classList.remove("background-white");
        body.classList.add("background-black");
        this.bgColor = "black";
      }

      // TODO: Faire transitionner le logo LMLC et le menuBurger
      this.isTalents = true;
    },

    handleRemoveBgBlack(entries) {
      const body = this.$refs.body;
      body.classList.remove("background-black");
      body.classList.add("background-white");
      this.bgColor = "white";
      const [entry] = entries;
      if (entry.isIntersecting) {
        const body = this.$refs.body;
        body.classList.remove("background-black");
        body.classList.add("background-white");
      }

      this.isTalents = false;
    },

    handleWheelEvent(event) {
      const body = this.$refs.body;
      if (this.ScrollHorizontal) {
        event.preventDefault();
        this.scroll.deltaY = event.deltaY;
        this.scroll.deltaX = event.deltaX;
      }

      // if (!this.isMenuOpen) {
      //   document.body.style.overflow = "";
      // }
    },

    handleScroll() {
      this.scrollY = window.scrollY;
      this.mouseAbsolutePositionY = this.mouseY + this.scrollY;
    },
    handleMouseMove(event) {
      this.mouseY = event.clientY;
      this.mouseAbsolutePositionY = this.mouseY + this.scrollY;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.handleScroll);
    window.addEventListener("mousemove", this.handleMouseMove);

    setTimeout(() => {
      this.showServicesAnimation = true;
    }, 2000);

    this.sectionMetierHeight = this.$refs.aboutMetier.offsetHeight;

      console.log("desktop");
      this.observerScrollHorizontal = new IntersectionObserver(
        this.handleScrollHorizontal,
        {
          root: null, // observing for viewport
          threshold: 0.9, // The element is completely visible when it's fully in the viewport
        }
      );

      this.handleAddBgBlack = new IntersectionObserver(this.handleAddBgBlack, {
        root: null, // observing for viewport
        threshold: 0.7, // The element is completely visible when it's fully in the viewport
      });

      this.handleRemoveBgBlack = new IntersectionObserver(this.handleRemoveBgBlack, {
        root: null, // observing for viewport
        threshold: 0.4, // The element is completely visible when it's fully in the viewport
      });

      this.$nextTick(() => {
        const servicesTalentsEl = this.$refs.servicesTalents;
        const aboutMetierEl = this.$refs.aboutMetier;
        if (servicesTalentsEl) {
          // this.observerScrollHorizontal.observe(servicesTalentsEl);
          this.handleAddBgBlack.observe(servicesTalentsEl);
          this.handleRemoveBgBlack.observe(aboutMetierEl);
        }
      });
  },
  beforeDestroy() {
    // if (this.observerScrollHorizontal) {
    //   this.observerScrollHorizontal.disconnect();
    //   this.observerChangeBgColor.disconnect();
    // }
  },
};
</script>
