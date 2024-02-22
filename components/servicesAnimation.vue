<template>
  <div class="mouse-container">
    <img v-for="(image, index) in images" :key="index" :src="image" />
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
  props: ["metierHeight", "mousePositionY"],
  data() {
    return {
      lastMousePosition: { x: 0, y: 0 },
      images: [
        "/services-mouse-animation/cocktail-totem.png",
        "/services-mouse-animation/monin-chamaica.png",
        "/services-mouse-animation/monin-vanilla.png",
        // "/services-mouse-animation/sac-jaune.png",
        "/services-mouse-animation/yellow-bag.png",
        "/services-mouse-animation/fauteuil.png",
        "/services-mouse-animation/meuble-kaki.png",
      ],
      activeIndex: -1,
      callCount: 0,
      lastImage: 0,
      isOnAnimationArea: true,
      serviceMetierHeight: 0,
    };
  },
  watch: {
    mousePositionY() {
      if (this.metierHeight && !this.serviceMetierHeight) {
        this.serviceMetierHeight = this.metierHeight;
      }
      this.isOnAnimationArea = this.mousePositionY < this.serviceMetierHeight;
    },
  },
  methods: {
    handleMouseMove(event) {
      const distance = Math.sqrt(
        Math.pow(event.clientX - this.lastMousePosition.x, 2) +
          Math.pow(event.clientY - this.lastMousePosition.y, 2)
      );

      if (distance > 50 && this.isOnAnimationArea) {
        const allImages = document.querySelectorAll(".mouse-container img");

        // Compte le nombre d'image, tant qu'on en a pas fait le tour on fait apparaitre toutes les images
        if (this.callCount <= this.images.length - 1) {
          allImages[this.callCount].classList.add("is-active");
          allImages[this.callCount].style.top = `${event.clientY}px`;
          allImages[this.callCount].style.left = `${event.clientX}px`;
          allImages[this.callCount].style.zIndex = `${this.callCount}`;
        } else {
          var lastImageDOM = document.querySelector(
            `[src="${this.images[this.lastImage]}"]`
          );
          lastImageDOM.classList.remove("is-active"); 
          this.lastImage = (this.lastImage + 1) % this.images.length;

          // Maintenant que la dernière image est cachée, on peut la faire reapparaitre à la position de la souris
          setTimeout(() => {
            lastImageDOM.classList.add("is-active");
            lastImageDOM.style.top = `${event.clientY}px`;
            lastImageDOM.style.left = `${event.clientX}px`;
            lastImageDOM.style.zIndex = parseInt(lastImageDOM.style.zIndex) + 6;
          }, 50);
        }
        this.callCount++;

        this.lastMousePosition = { x: event.clientX, y: event.clientY };
      }
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.handleMouseMove);
  },
  unmounted() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  },
};
</script>
