<template>
  <div @wheel="handleWheelEvent" ref="body" class="transition-all duration-200">
    <!-- Partie métiers -->

    <MetierCopy />
 
    <!-- Partie talents -->
    <HorizontalScrolling />
    <!-- <section ref="servicesTalents" class="h-screen block relative">
      <ServicesTalents
        ref="servicesTalents"
        :scroll="scroll"
        class="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </section> -->
  </div>
</template>

<style>
.background-black {
  /* background-color: black; */
  background-color: rgba(0, 0, 0, 0.4);
}

.background-white {
  background-color: white;
}
</style>

<script>
export default {
  setup() {
    const ScrollHorizontal = isScrollHorizontal();
    const isMenuOpen = stateMenuOpen();

    return {
      ScrollHorizontal,
      isMenuOpen,
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

    handleAddBgBlack(entries) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        const body = this.$refs.body;
        body.classList.remove("background-white");
        body.classList.add("background-black");
      }
    },

    handleRemoveBgBlack(entries) {
      // TODO: Il ne rentre pas dans le if
      const body = this.$refs.body;
      body.classList.remove("background-black");
      body.classList.add("background-white");
      const [entry] = entries;
      if (entry.isIntersecting) {
        const body = this.$refs.body;
        body.classList.remove("background-black");
        body.classList.add("background-white");
      }
    },

    handleWheelEvent(event) {
      const body = this.$refs.body;
      if (this.ScrollHorizontal) {
        event.preventDefault();
        this.scroll.deltaY = event.deltaY;
        this.scroll.deltaX = event.deltaX;
      }

      if (!this.isMenuOpen) {
        document.body.style.overflow = "";
      }
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

    // this.sectionMetierHeight = this.$refs.metier.offsetHeight;
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
      threshold: 0.6, // The element is completely visible when it's fully in the viewport
    });

    this.$nextTick(() => {
      const servicesTalentsEl = this.$refs.servicesTalents;
      if (servicesTalentsEl) {
        this.observerScrollHorizontal.observe(servicesTalentsEl);
        this.handleAddBgBlack.observe(servicesTalentsEl);
        this.handleRemoveBgBlack.observe(servicesTalentsEl);
      }
    });
  },
  beforeDestroy() {
    if (this.observerScrollHorizontal) {
      this.observerScrollHorizontal.disconnect();
      this.observerChangeBgColor.disconnect();
    }
  },
};
</script>
