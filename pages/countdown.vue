<script setup>
definePageMeta({
  layout: "menu",
});

// import gsap from "gsap";
import { Quart } from "gsap/gsap-core";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const { $gsap: gsap } = useNuxtApp();

// Create refs for the elements
const days = ref(null);
const hours = ref(null);
const minutes = ref(null);
const seconds = ref(null);

// Calculate initial values
const birthday = "2025/05/07";
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Initial values computed
const initialValues = computed(() => {
  const countDown = new Date(birthday).getTime();
  const now = new Date().getTime();
  const distance = countDown - now;

  return {
    days: setNumber(distance / day),
    hours: setNumber((distance % day) / hour),
    minutes: setNumber((distance % hour) / minute),
    seconds: setNumber((distance % minute) / second)
  };
});

onMounted(() => {
  // Set initial values
  days.value.innerText = initialValues.value.days;
  hours.value.innerText = initialValues.value.hours;
  minutes.value.innerText = initialValues.value.minutes;
  seconds.value.innerText = initialValues.value.seconds;

  // Start the interval
  startCountdown();
});

const startCountdown = () => {
  const countDown = new Date(birthday).getTime();
  
  const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDown - now;

    days.value.innerText = setNumber(distance / day);
    hours.value.innerText = setNumber((distance % day) / hour);
    minutes.value.innerText = setNumber((distance % hour) / minute);
    animateFlip(seconds.value, Math.floor((distance % minute) / second));

    if (distance < 0) {
      clearInterval(x);
      // Handle countdown end...
    }
  }, 1000);
};

function animateFlip(element, value) {
  const currentValue = value < 10 ? "0" + value : "" + value;
  const oldValue = element.innerText;

  if (oldValue === currentValue) return;

  // Create container for animation
  const temp = document.createElement('div');
  temp.style.position = 'absolute';
  temp.style.width = '100%';
  temp.style.height = '100%';
  temp.style.overflow = 'hidden';
  
  // Set the new and old values
  temp.innerHTML = `
      <div class="old-value">${oldValue}</div>
      <div class="new-value">${currentValue}</div>
  `;
  
  element.innerHTML = '';
  element.appendChild(temp);

  // Animate
  gsap.fromTo(temp.querySelector('.old-value'), {
      y: 0,
  }, {
      y: '-100%',
      duration: 0.2,
      ease: 'power1.inOut'
  });

  gsap.fromTo(temp.querySelector('.new-value'), {
      y: '100%',
  }, {
      y: 0,
      duration: 0.2,
      ease: 'power1.inOut',
      onComplete: () => {
          // Clean up after animation
          element.innerHTML = currentValue;
      }
  });
}

function setNumber(num) {
  const res = Math.floor(num);
  return res >= 10 ? res : `0${res}`;
}
</script>

<template>
  <div class="mx-4 md:mx-auto">
    <!-- Logo -->
    <div class="h-screen flex flex-col gap-16 py-20">
      <!-- gap-[10vh] -->
      <div class="flex flex-1 justify-center items-center h-full">
        <div class="md:w-1/5 mx-auto">
          <img
            class="w-7/12 mx-auto md:w-full"
            src="/lmlc-logo-and-name.png"
            alt="Logo lmlccommunication"
          />
        </div>
      </div>

      <!-- Countdown -->
      <div class="my-auto flex-1">
        <div
          class="flex relative bg-slate-900 overflow-hidden w-[90%] h-auto md:w-2/3 mx-auto py-[4vh] rounded-[10px] justify-center items-center"
        >
          <!-- <div class="relative monin overflow-hidden w-full h-full"> -->
          <!-- TODO: Black and white ecriture pas d'image client, que les carrès soient plus gros  -->
          <div class="z-10 text-center h-auto w-full relative">
            <div
              class="flex justify-evenly w-full text-3xl md:text-6xl font-medium md:font-bold font-montserrat"
            >
              <!-- <div> -->
              <!-- Nouveau code -->

              <!-- <div class="flex items-center justify-between"> -->
              <!-- Début chiffre -->
              <div class="flex items-center flex-col flex-nowrap">
                <span class="time-elem relative shadow-xl flex items-center justify-center" ref="days">
                  {{ initialValues.days }}
                </span>
              </div>

              <div class="flex items-center flex-col flex-nowrap">
                <span class="time-elem relative shadow-xl flex items-center justify-center" ref="hours">
                  {{ initialValues.hours }}
                </span>
              </div>

              <div class="flex items-center flex-col flex-nowrap">
                <span class="time-elem relative shadow-xl flex items-center justify-center" ref="minutes">
                  {{ initialValues.minutes }}
                </span>
              </div>

              <div class="flex items-center flex-col flex-nowrap">
                <span class="time-elem relative shadow-xl flex items-center justify-center" ref="seconds">
                  {{ initialValues.seconds }}
                </span>
              </div>
              <!-- </div> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>

      <!-- Contact -->
      <div class="flex flex-1 flex-col items-center font-montserrat text-white">
        <div class="flex-1"></div>
        <div class="flex-1">
          <p class="font-medium md:font-bold">QUESTION &</p>
          <p class="font-medium md:font-bold">NEW BUISINESS</p>
          <div class="font-thin mt-2 mb-6">
            <a href="mailto: contact@lmlccommunication.fr"
              >contact@lmlccommunication.fr</a
            >
          </div>
          <!-- <p class="font-medium md:font-bold">JOB</p>
          <div class="font-thin mt-2">
            <a href="mailto: talents@lmlccommunication.fr"
              >talents@lmlccommunication.fr</a
            >
          </div> -->
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
  </div>
</template>

<!-- <style scoped>
.time-elem {
    @apply bg-slate-800 rounded-lg w-16 h-20 relative overflow-hidden flex items-center justify-center;
}

.old-value, .new-value {
    @apply absolute w-full h-full flex items-center justify-center;
}
</style> -->