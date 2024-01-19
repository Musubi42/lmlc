// plugins/global-cursor.js

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$customCursor = null;
});
