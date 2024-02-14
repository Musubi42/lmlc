import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  // if (process.client) {
  //   gsap.registerPlugin(Draggable)
  // }

  return {
    provide: {
      gsap,
      ScrollTrigger,
    }
  }
})