<template>
  <div class="mx-4 md:mx-auto">
    <!-- Logo -->
    <div class="h-screen grid grid-rows-3 gap-4">
    <div class="md:w-1/3 mx-auto my-auto">
      <img src="~/assets/logo_lmlc.png" alt="Logo lmlccommunication" />
    </div>

    <!-- Countdown -->
    <div class="my-auto">
      <div class="flex w-full md:w-2/3 mx-auto bg-[#D9D9D9] p-4 rounded h-auto md:h-64 justify-center items-center ">
        <div class="z-10 text-center h-auto w-full">
          <div class="flex justify-around w-full text-3xl md:text-6xl font-medium md:font-bold font-montserrat">
            <div> <p class="">{{ temps.jours }}</p></div>
            <div> <p class="">{{ temps.hours }}</p></div>
            <div> <p class="">{{ temps.minutes }}</p></div>
            <div> <p class="">{{ temps.secondes }}</p></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="flex font-montserrat">
      <div class="flex-1"></div>
      <div class="flex-1">
        <p class="font-bold">QUESTION & </p> 
        <p class="font-bold">
        NEW BUISINESS</p>
        <div class="font-thin mt-2 mb-6">
          <a href = "mailto: contact@lmlccommunication.fr">contact@lmlccommunication.fr</a>
        </div>
        <p class="font-bold">JOB</p>
        <div class="font-thin mt-2">
          <a href = "mailto: talents@lmlccommunication.fr">talents@lmlccommunication.fr</a>
        </div>
        </div>
      <div class="flex-1"></div>
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