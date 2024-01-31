// plugins/state.js

import { reactive } from 'vue';

export const hoverState = reactive({
  isHovered: false
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$hoverState = hoverState;
});
