<template>
  <div v-if="showWarning" class="overlayOrientationWarning">
    Pour une meilleure expérience, utilisez le mode portrait.
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const showWarning = ref(false);

const checkOrientation = () => {
  // Voir à ajuster le 768
  showWarning.value = window.innerWidth > window.innerHeight && window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', checkOrientation);
  checkOrientation(); // Vérifiez l'orientation lorsque le composant est monté
});

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation);
});
</script>

<style>
.overlayOrientationWarning {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-size: 24px;
  text-align: center;
  padding: 20px;
}
</style>
