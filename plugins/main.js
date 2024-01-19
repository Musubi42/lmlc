// plugins/main.js

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$globalStore = nuxtApp.store;
});
