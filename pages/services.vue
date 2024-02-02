<template>
  <div @wheel="handleWheelEvent">
    <div class="flex flex-row pt-40 justify-between mx-8 gap-2 scrollbar-hide">
      <!-- Partie service -->
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

      <div class="flex-1">
        <h3 class="font-semibold text-xl">brandcontent</h3>
        <ul>
          <li>production film</li>
          <li>shooting photo</li>
          <li>3D &#x26; motion design</li>
          <li>packshot</li>
          <li>print &#x26; edition</li>
        </ul>
      </div>
      
    </div>
    <!-- Partie talents -->
    <div ref="servicesTalents" class="h-screen block relative">
    <p>{{ ScrollHorizontal }}</p>
      <ServicesTalents 
        ref="servicesTalents"
        :scroll="scroll"
        class="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
         />
    <p>{{ ScrollHorizontal }}</p>
    </div>
      <p>
        Le passage de Lorem Ipsum standard, utilisé depuis 1500 "Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
  
    <ServicesAnimation />
  </div>
</template>

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
      message: "Hello World!",
      scroll: { deltaY: 0, deltaX: 0},
      scrollDirection: 'oui',
      isScroll: true,
    };
  },
  methods: {
    oui() {
      setInterval(() => {
        console.log(this.isScroll);
      }, 1000);
    },
    // Il en faut pour détecter quand on fait le scroll bas donc la droite
    // Et un autre pour détecter quand on fait le scroll haut donc la gauche
    handleIntersection(entries) {
      const [entry] = entries;
      // console.log(entry);
      if (entry.isIntersecting) {
        this.scrollDirection = 'down';
        console.log('ServicesTalents is at the middle of the screen');
        // Perform any action when ServicesTalents is at the middle of the screen
        // this.handleWheel();
      }
    },

    handleWheelEvent(event) {
      if (this.scrollDirection === 'down') {
        document.body.style.overflow = 'hidden';
        console.log(this.ScrollHorizontal);
        if (this.ScrollHorizontal) {
          document.body.style.overflow = '';
          return;
        }

        event.preventDefault();
        this.scroll.deltaY = event.deltaY;
        this.scroll.deltaX = event.deltaX;
        // this.$emit('scroll', this.scroll);
      }
    },
    // handleWheelEvent(event) {
    //   if (this.scrollDirection === 'down') {
    //     event.preventDefault();
    //     this.scroll.deltaY = event.deltaY;
    //     this.scroll.deltaX = event.deltaX;
    //     // this.$emit('scroll', this.scroll);
    //   }
    // },
  },
  mounted() {
    // this.oui();
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null, // observing for viewport
      threshold: 0.9 // The element is completely visible when it's fully in the viewport
    });

    // window.addEventListener('wheel', this.handleWheel);

    this.$nextTick(() => {
      // TODO : Utiliser une vraie ref
      // console.log(this.$refs.servicesTalents);
      const servicesTalentsEl = this.$refs.servicesTalents;
      // const servicesTalentsEl = document.getElementById('servicesTalents');
      if (servicesTalentsEl) {
        this.observer.observe(servicesTalentsEl);
      }
    });
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
</script>
