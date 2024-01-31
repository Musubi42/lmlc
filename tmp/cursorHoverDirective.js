// ~/plugins/hover-directive.js

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('oui', {
    mounted(el) {
      el.addEventListener('mouseenter', () => nuxtApp.vueApp.config.globalProperties.$globalStore.commit('cursor/setHovered', true));
      el.addEventListener('mouseleave', () => nuxtApp.vueApp.config.globalProperties.$globalStore.commit('cursor/setHovered', false));
    },
    unmounted(el) {
      el.removeEventListener('mouseenter');
      el.removeEventListener('mouseleave');
    }
  });
});
