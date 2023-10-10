<template>
  <div class="container">
    <div class="logo-container">
      <img class="logo" src="~/assets/logo_lmlc.png" alt="Logo lmlccommunication" />
    </div>
    <div class="countdown-container">
      <div class="countdown">
        <p class="countdown-text">{{ timeRemaining }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      targetDate: new Date(), // Initialisez avec la date d'aujourd'hui
      timeRemaining: "Calcul en cours...", // Affiche le temps restant
      temps: 'calcul'
    };
  },
  mounted() {
    // Calcule la date cible (le 25 novembre de cette année)
    this.targetDate.setMonth(10); // 10 représente novembre (0-indexed)
    this.targetDate.setDate(25);
    this.targetDate.setHours(0);
    this.targetDate.setMinutes(0);
    // Met à jour l'affichage toutes les secondes
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
        this.temps = { 'jours': days, 'hours': hours, 'minutes': minutes, 'seconde': seconds }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 900px;
}

.countdown-container {
  text-align: center;
}

.countdown {
  background-color: #ccc; /* Rectangle gris pour le compteur */
  padding: 20px; /* Espacement autour du compteur gris */
  border-radius: 5px; /* Coins arrondis pour le compteur gris */
}

.countdown-text {
  font-size: 50px; /* Taille de police en gros */
}
</style>
