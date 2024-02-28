<template>
  <div @click="closeMenuIfOpen" >
    <Intro v-if="IntroAnimation && firstVisit" class="fixed z-10000" />
    <!-- <Intro v-if="true" class="fixed z-10" /> -->
    <Header :dynamicStyle="headerStyle" />
    <NuxtPage />
    <Footer />
    <CustomCursor />
  </div>
</template>

<script>
export default {
  setup() {
    // const isIntroAnimation = ref(true);
    const IntroAnimation = stateIntroAnimation();

    watch(IntroAnimation, (newValue, oldValue) => {
      IntroAnimation.value = newValue;
    });

    const firstVisit = stateFirstVisit();

    const isMenuOpen = stateMenuOpen();

    const isMobile = stateIsMobile();

    const useTableauPreFetchImages = tableauPreFetchImages();

    const isTableauPreFetchImagesLoading = tableauPreFetchImagesLoading();

    return {
      isMenuOpen,
      IntroAnimation,
      firstVisit,
      isMobile,
      useTableauPreFetchImages,
      isTableauPreFetchImagesLoading,
    };
  },
  data() {
    return {
      headerStyle: 1,
      pastYPosition: 0,
      moreThanOnce: 0,
    };
  },
  methods: {
    handleScroll() {
      this.headerStyle = this.pastYPosition < (window.scrollY || window.pageYOffset) ? 0 : 1;
      this.pastYPosition = (window.scrollY || window.pageYOffset);
    },
    // TODO: Il ne faut pas que ça se trigger si je clique sur le menu
    closeMenuIfOpen(event) {
      // console.log("oui");
      // console.log(event.target);
      // if (this.moreThanOnce > 0 && this.isMenuOpen) {
      //   this.isMenuOpen = !this.isMenuOpen;
      // }
      // this.moreThanOnce++;
    },

    async preloadImagesAndConvertToDataUrls(isMobile) {
      const response = await fetch('/tableau/meubles.json');
      const meubles = await response.json();

      let uniqueBodyKeys = [];

      if (isMobile) {
        uniqueBodyKeys = ["moninMobile", "bouillonMobile", "timurQualiPNGMobile", "unMobile", "deuxMobile", "sacBleuMobile"];
      } else {
        uniqueBodyKeys = ["sacBleu", "monin", "un", "deux", "timurQualiPNG", "bouillon"];
      }

      const promises = uniqueBodyKeys.map((key) => {
        const baseUrl = document.location.origin;
        const imageUrls = `${baseUrl}${meubles[key].sprite.image.replace("./", "/")}`;

        return fetch(imageUrls)
          .then(response => response.blob())
          .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({ key, dataUrl: reader.result }); // Convert to Data URL
            reader.onerror = () => reject(new Error('Failed to read blob as data URL'));
            reader.readAsDataURL(blob);
          }));
      });

      const results = await Promise.all(promises);

      // Convert the array of results to an object
      const imagesDataUrls = {};
      results.forEach(result => {
        imagesDataUrls[result.key] = result.dataUrl;
      });

      return imagesDataUrls;
    },

  },
  async beforeMount() {
    const width = window.innerWidth;
    this.isMobile = width <= 768; // Si la width est inférieur à 768px, c'est un mobile

    // this.preloadImagesAndConvertToDataUrls(this.isMobile.value).then(imagesDataUrls => {
    //   console.log("imagesDataUrls", imagesDataUrls);
    //   this.useTableauPreFetchImages.value = imagesDataUrls;
    // });

    // TODO: Checker si la data est loaded avant d'afficher le composant Tableau
    const imagesDataUrls = await this.preloadImagesAndConvertToDataUrls(this.isMobile);
    // console.log("imagesDataUrls", imagesDataUrls);
    imagesDataUrls ? this.isTableauPreFetchImagesLoading = false : this.isTableauPreFetchImagesLoading = true;
    // console.log(this.isTableauPreFetchImagesLoading, "isTableauPreFetchImagesLoading");

    this.useTableauPreFetchImages.value = imagesDataUrls;
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>
