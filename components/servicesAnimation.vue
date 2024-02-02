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
    };
  },
  methods: {
    handleMouseMove(event) {
      const distance = Math.sqrt(
        Math.pow(event.clientX - this.lastMousePosition.x, 2) +
          Math.pow(event.clientY - this.lastMousePosition.y, 2)
      );

      if (distance > 80) {
        const allImages = document.querySelectorAll(".mouse-container img");
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
          allImages[this.callCount].classList.add("is-active");
          allImages[this.callCount].style.top = `${event.clientY}px`;
          allImages[this.callCount].style.left = `${event.clientX}px`;
          allImages[this.callCount].style.zIndex = `${this.callCount}`;
        } else {
          // Quand on a fait le tour :
          // this.images.push(this.images.shift()); // La premiere image devient la dernière

          // Pas besoin de faire tourner les images,
          // Je peux avoir une var currentImage qui va être incrémentée à chaque fois et une fois qu'elle est égale à la longueur de l'array, on la remet à 0

          // Faire changer le z-index de chaque image pour créer l'effet de superposition adéquat
          // Je peux identifier les images avec la valeur de src

          // Faire disparaitre la dernière image de la liste
          // var lastImageList = this.images[this.images.length - 1]
          // var lastImageDOM = document.querySelector(`[src="${lastImageList}"]`);
          // console.log(document.querySelector(`[src="${this.lastImage}"]`));
          // console.log(this.images.length);
          console.log(this.lastImage);
          console.log(this.images[this.lastImage]);
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
            lastImageDOM.style.zIndex += 4;
          }, 50);


          // var lastImageList = allImages[0]
          // console.log(typeof allImages);
          // allImages.push(allImages.shift());
          // console.log(lastImageList);
          // lastImageList.classList.remove('is-active');

          // var lastImageDOM = document.querySelector(`[src="${lastImageList}"]`);
          // // var lastImageDOM = document.querySelector(`[src="/services-mouse-animation/monin-vanilla.png"]`);
          // // console.dir("lastImageDOM : ");
          // console.log(lastImageDOM);
          // lastImageDOM.classList.remove('is-active');

          // Faire apparaitre la première image de la liste
          // var firstImageList = this.images[0]
          // var firstImageDOM = document.querySelector(`[src="${firstImageList}"]`);
          // firstImageDOM.classList.add('is-active');
          // // Lui passer les la position x et y de la souris
          // firstImageDOM.style.left = `${event.clientX}px`;
          // firstImageDOM.style.top = `${event.clientY}px`;
        }
        this.callCount++;

        this.lastMousePosition = { x: event.clientX, y: event.clientY };
      }
    },
  },
  mounted() {
    // TODO : Check le $nextTick
    // this.$nextTick(() => {
    window.addEventListener("mousemove", this.handleMouseMove);
    // });
  },
  unmounted() {
    window.removeEventListener("mousemove", this.handleMouseMove);
  },
};
</script>
