<template>
  <div>
    <div
      class="overflow-x-auto whitespace-nowrap w-full h-[250px]"
      @wheel="handleWheel"
      ref="scrollContainer"
    >
      <!-- Your horizontally scrolling content goes here -->
      <div
        v-for="n in 12"
        :key="n"
        class="inline-block w-[200px] h-full border-[1px] border-solid border-black mr-3 text-center no-scrollbar scrollbar-hide"
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {    
    const scrollContainer = ref(null);

    const ScrollHorizontal = isScrollHorizontal();
    return {
      // isScroll,
      ScrollHorizontal,
      scrollContainer,
    };
  },
  props: ["scroll"],
  data() {
    return {
      isScroll: true,
    };
  },
  watch: {
    scroll: {
      handler: function(newVal, oldVal) {
        // Ici, vous pouvez appeler votre méthode
        this.maMethode(newVal);
      },
      deep: true, // Ceci est nécessaire si 'scroll' est un objet
    },
  },
  methods: {
    maMethode(scroll) {
      // Pour arrêter l'inertie du scrolling
      document.body.style.overflow = 'hidden'
      const { deltaX, deltaY } = scroll;
      if (this.scrollContainer) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          this.scrollContainer.scrollLeft += deltaY;
        }

        // Check if scroll start is reached
        if (this.scrollContainer.scrollLeft === 0) {
          // Renvoyer au prent qu'on est au début du scroll
          this.ScrollHorizontal = false;
          return;
        }

        // Check if scroll end is reached
        if (
          this.scrollContainer.scrollLeft + this.scrollContainer.clientWidth >=
          this.scrollContainer.scrollWidth
        ) {
          // Renvoyer au parent qu'on est à la fin du scroll
          this.ScrollHorizontal = false;
          return;
        }

        // event.preventDefault();
      }
    },
    handleWheel(event) {
      if (this.scrollContainer) {
        // Check if scroll start is reached
        if (this.scrollContainer.scrollLeft === 0) {
          // Renvoyer au prent qu'on est au début du scroll
          this.ScrollHorizontal = false;
          return;
        }

        // Check if scroll end is reached
        if (
          this.scrollContainer.scrollLeft + this.scrollContainer.clientWidth >=
          this.scrollContainer.scrollWidth
        ) {
          // Renvoyer au parent qu'on est à la fin du scroll
          this.ScrollHorizontal = false;
          return;
      }
      }
    },
  },
  mounted() {
  },
  computed: {
  },
};
</script>
