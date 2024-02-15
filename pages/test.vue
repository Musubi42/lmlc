<template>
    <section class="carousel h-screen" aria-label="Gallery">
      <ol class="carousel__viewport">
        <li
          v-for="(slide, index) in slides"
          :key="index"
          :id="`carousel__slide${index + 1}`"
          tabindex="0"
          class="carousel__slide"
        >
          <div class="carousel__snapper">
            <div class="carousel__content">
              <div class="carousel__image-wrapper">
                <img :src="slide.image" :alt="slide.alt" class="carousel__image mx-auto h-full" />
              </div>
              <div class="carousel__text">
                <h2>{{ slide.title }}</h2>
                <p>{{ slide.description }}</p>
              </div>
            </div>
            <a :href="`#carousel__slide${getPrevIndex(index) + 1}`" class="carousel__prev">Go to last slide</a>
            <a :href="`#carousel__slide${getNextIndex(index) + 1}`" class="carousel__next">Go to next slide</a>
          </div>
        </li>
      </ol>
    </section>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        currentSlide: 0,
        hideCarousel: false,
        imageScale: 1,
        imageLeft: 0,
        imageTop: 0,
        slides: [
          { image: "/services.png", title: "Titre 1", description: "Description 1", alt: "truc" },
          { image: "/talents.png", title: "Titre 2", description: "Description 2", alt: "truc" },
        ],
      };
    },
    methods: {
      getPrevIndex(index) {
        return index === 0 ? this.slides.length - 1 : index - 1;
      },
      getNextIndex(index) {
        return index === this.slides.length - 1 ? 0 : index + 1;
      },
      gotoSlide(index) {
        this.hideCarousel = true;
        setTimeout(() => {
          this.currentSlide = index;
          this.hideCarousel = false;
          this.imageLeft = 100;
          setTimeout(() => {
            this.imageLeft = 0;
          }, 50);
        }, 500);
      },
      handleScroll() {
        const threshold = 50;
        const scrollY = window.scrollY;
  
        if (scrollY > threshold && !this.hideCarousel) {
          this.hideCarousel = true;
          this.imageScale = 0.3;
          this.imageLeft = -35;
          this.imageTop = -10;
        } else if (scrollY <= threshold && this.hideCarousel) {
          this.hideCarousel = false;
          this.imageScale = 1;
          this.imageLeft = 0;
          this.imageTop = 0;
        }
      },
    },
    mounted() {
      window.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  };
  </script>
  
  <style scoped>
  .carousel__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.carousel__image-wrapper {
  flex: 1;
  overflow: hidden;
}


.carousel {
  position: relative;

}

.carousel__viewport {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow-x: scroll;
  counter-reset: item;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

.carousel__slide {
  position: relative;
  flex: 0 0 100%;
  width: 100%;
  counter-increment: item;
}



.carousel__slide:before {
  content: counter(item);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-40%,70px);
  color: #fff;
  font-size: 2em;
}

.carousel__snapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
}



.carousel:hover .carousel__snapper,
.carousel:focus-within .carousel__snapper {
  animation-name: none;
}


.carousel::before,
.carousel::after,
.carousel__prev,
.carousel__next {
  position: absolute;
  top: 0;
  margin-top: 37.5%;
  width: 4rem;
  height: 4rem;
  transform: translateY(-50%);
  border-radius: 50%;
  font-size: 0;
  outline: 0;
}

.carousel::before,
.carousel__prev {
  left: -1rem;
}

.carousel::after,
.carousel__next {
  right: -1rem;
}

.carousel::before,
.carousel::after {
  content: '';
  z-index: 1;
  background-color: #333;
  background-size: 1.5rem 1.5rem;
  background-repeat: no-repeat;
  background-position: center center;
  color: #fff;
  font-size: 2.5rem;
  line-height: 4rem;
  text-align: center;
  pointer-events: none;
}

.carousel::before {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='0,50 80,100 80,0' fill='%23fff'/%3E%3C/svg%3E");
}

.carousel::after {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='100,50 20,100 20,0' fill='%23fff'/%3E%3C/svg%3E");
}


  </style>
  
