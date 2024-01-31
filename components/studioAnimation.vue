<template>
  <div class="mouse-container">
    <!-- <img v-for="(image, index) in images" :key="index" :src="image" :style="{ left: `${lastMousePosition.x}px`, top: `${lastMousePosition.y}px` }" /> -->
    <img v-for="(image, index) in images" :key="index" :src="image" />
    <p>{{ lastMousePosition }}</p>
  </div>
</template>

<style scoped>

.mouse-container img {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
 
.mouse-container img.is-active {
  opacity: 1;
}

.is-active {
  visibility: visible;
  transition: all 0.5s ease-in-out;
}

.is-inactive {
  visibility: hidden;
  transition: all 0.5s ease-in-out;
}
</style>

<script>
export default {
  data() {
    return {
      lastMousePosition: { x: 0, y: 0 },
      images: [
        '/menu-talents-small.png',
        '/menu-work-small.png',
        '/menu-services-small.png',
      ],
      activeIndex: -1,
      callCount: 0,
    };
  },
  methods: {
    handleMouseMove(event) {
      const distance = Math.sqrt(Math.pow(event.clientX - this.lastMousePosition.x, 2) + Math.pow(event.clientY - this.lastMousePosition.y, 2));

      if (distance > 60) {
        const allImages = document.querySelectorAll('.mouse-container img');
        if (false) {
          console.log(allImages);
          console.log("série current SRC: ");
          for (let i = 0; i < allImages.length; i++) {
            console.log(allImages[i].currentSrc + " " + allImages[i].className);
            // allImages[i].classList.add('is-inactive');
          }
          console.log("série images: ");
          console.log(this.images);
          images.push(this.images.shift());
          // console.log(allImages);
        }

        // Compte le nombre d'image, tant qu'on en a pas fait le tour on fait apparaitre toutes les images
        if (this.callCount <= this.images.length - 1) { 
          console.log(this.callCount);
          console.log(allImages[this.callCount]);
          allImages[this.callCount].classList.add('is-active');
          allImages[this.callCount].style.top = `${event.clientY}px`;
          allImages[this.callCount].style.left = `${event.clientX}px`;
        } else { // Quand on a fait le tour :
          this.images.push(this.images.shift()); // La premiere image devient la dernière

          // Faire disparaitre la dernière image de la liste
          var lastImageList = this.images[this.images.length - 1]
          var lastImageDOM = document.querySelector(`[src="${lastImageList}"]`);
          lastImageDOM.classList.remove('is-active'); 

          // Faire apparaitre la première image de la liste
          var firstImageList = this.images[0]
          var firstImageDOM = document.querySelector(`[src="${firstImageList}"]`);
          firstImageDOM.classList.add('is-active'); 
          // Lui passer les la position x et y de la souris
          firstImageDOM.style.left = `${event.clientX}px`;
          firstImageDOM.style.top = `${event.clientY}px`;
        }
        this.callCount++;

        this.lastMousePosition = { x: event.clientX, y: event.clientY };
      }
    }
  },
  mounted() {
    // TODO : Check le $nextTick
    // this.$nextTick(() => {
      window.addEventListener('mousemove', this.handleMouseMove);
    // });
  },
  unmounted() {
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
};  
</script>

