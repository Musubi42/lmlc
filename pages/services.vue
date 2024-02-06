<template>
  <div @wheel="handleWheelEvent" ref="body" class="transition-all duration-200">
    <!-- Partie métiers -->
    <section class="h-screen flex flex-row pt-40 justify-around mx-8 gap-2 scrollbar-hide">


      <ServicesAnimation />
      <div class="flex-1">
        <h3 class="font-semibold text-xl">stratégie</h3>
        <ul>
          <li>stratégie marketing &#x26; communication</li>
          <li>stratégie de marque</li>
        </ul>
      </div>

      <div class="flex-1">
        <h3 class="font-semibold text-xl">branding</h3>
        <ul>
          <li>direction artistique</li>
          <li>identité visuelle</li>
          <li>plateforme de marque</li>
          <li>logo &#x26; charte graphique</li>
          <li>storytelling</li>
        </ul>
      </div>

      <div class="flex-1">
        <h3 class="font-semibold text-xl">digital</h3>
        <ul>
          <li>social media</li>
          <li>community management</li>
          <li>développement web &#x26; design</li>
          <li>UX/UI</li>
          <li>apps</li>
        </ul>
      </div>

      <div class="min-w-[200px]">
        <h3 class="font-semibold text-xl">brandcontent</h3>
        <ul>
          <li>production film</li>
          <li>shooting photo</li>
          <li>3D &#x26; motion design</li>
          <li>packshot</li>
          <li>print &#x26; edition</li>
        </ul>
      </div>
    </section>
    <!-- Partie talents -->
    <section ref="servicesTalents" class="h-screen block relative">
      <ServicesTalents
        ref="servicesTalents"
        :scroll="scroll"
        class="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </section>
  </div>
</template>

<style>
  .bg-black {
    /* background-color: black; */
    background-color: rgba(0, 0, 0, 0.4);
  }

  .bg-white {
    background-color: white;
  }
</style>

<script>

export default {
  setup() {
    const ScrollHorizontal = isScrollHorizontal();

    return {
      ScrollHorizontal
    };
  },
  data() {
    return {
      scroll: { deltaY: 0, deltaX: 0},
      isScroll: true,
      body: null
    };
  },
  methods: {
    handleScrollHorizontal(entries) {
      const [entry] = entries;
      if (entry.isIntersecting) {
        document.body.style.overflow = 'hidden';
        this.ScrollHorizontal = true;
      }
    },

    handleAddBgBlack(entries) {
      console.log("Add black");
      const [entry] = entries;
      if (entry.isIntersecting) {
        const body = this.$refs.body;
        body.classList.remove('bg-white');
        body.classList.add('bg-black');
      }
    },

    handleRemoveBgBlack(entries) {
      // TODO: Il ne rentre pas dans le if
      const body = this.$refs.body;
      body.classList.remove('bg-black');
      body.classList.add('bg-white');
      const [entry] = entries;
      if (entry.isIntersecting) {
        console.log("je suis dedans");
        const body = this.$refs.body;
        body.classList.remove('bg-black');
        body.classList.add('bg-white');
      }
    },

    handleWheelEvent(event) {
      if (this.ScrollHorizontal) {
        event.preventDefault();
        this.scroll.deltaY = event.deltaY;
        this.scroll.deltaX = event.deltaX;
      }

      document.body.style.overflow = '';
    },
  },
  mounted() {
    this.observerScrollHorizontal = new IntersectionObserver(this.handleScrollHorizontal, {
      root: null, // observing for viewport
      threshold: 0.9 // The element is completely visible when it's fully in the viewport
    });

    this.handleAddBgBlack = new IntersectionObserver(this.handleAddBgBlack, {
      root: null, // observing for viewport
      threshold: 0.7 // The element is completely visible when it's fully in the viewport
    });

    this.handleRemoveBgBlack = new IntersectionObserver(this.handleRemoveBgBlack, {
      root: null, // observing for viewport
      threshold: 0.6 // The element is completely visible when it's fully in the viewport
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
  }
}
</script>
