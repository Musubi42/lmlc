// ~/plugins/hover-directive.js

import { hoverState } from './cursor-state';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('cursorAnimation', {
    mounted(el) {
      el.addEventListener('mouseenter', () => {
        hoverState.isHovered = true;
      });
      el.addEventListener('mouseleave', () => {
        hoverState.isHovered = false;
      });
    },
    unmounted(el) {
      el.removeEventListener('mouseenter');
      el.removeEventListener('mouseleave');
    }
  });
});

