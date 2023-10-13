<template>
  <div class="container mx-auto">
    <!-- Logo -->
    <div class="grid grid-rows-4 gap-4">
    <div class="w-1/3 mx-auto my-8">
      <img src="~/assets/logo_lmlc.png" alt="Logo lmlccommunication" />
    </div>

    <!-- Countdown -->
    <div class="countdown-container my-8">
      <div class="flex w-full  bg-[#D9D9D9] p-4 rounded h-64 justify-center items-center ">
        <div class="relative z-10 text-center w-full">
          <div class="flex justify-around w-full p-10">
            <div> <p class="text-6xl font-bold">{{ temps.jours }}</p></div>
            <div> <p class="text-6xl font-bold">{{ temps.hours }}</p></div>
            <div> <p class="text-6xl font-bold">{{ temps.minutes }}</p></div>
            <div> <p class="text-6xl font-bold">{{ temps.secondes }}</p></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="contact-container my-8 pl-20">
      <p class="font-bold">QUESTION & </p> 
      <p class="font-bold">
      NEW BUISINESS</p>
      <p>contact@lmlccommunication.fr</p>
      <p class="font-bold">JOB</p>
      <p>talents@lmlccommunication.fr</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      targetDate: new Date(),
      timeRemaining: "",
      temps: ''
    };
  },
  mounted() {
    this.targetDate.setMonth(10);
    this.targetDate.setDate(25);
    this.targetDate.setHours(0);
    this.targetDate.setMinutes(0);
    this.updateCountdown();
    setInterval(this.updateCountdown, 1000);
  },
  methods: {
    updateCountdown() {
      const now = new Date();
      const difference = this.targetDate - now;

      if (difference <= 0) {
        this.timeRemaining = "On arrive !!";
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        this.timeRemaining = `${days}  ${hours}  ${minutes}  ${seconds} `;
        this.temps = { 'jours': days, 'hours': hours, 'minutes': minutes, 'secondes': seconds }
      }
    },
  },
};
</script>