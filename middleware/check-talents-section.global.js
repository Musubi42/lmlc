export default defineNuxtRouteMiddleware((to) => {
  const isTalents = talents();

  if (to.path !== "/about") {
    isTalents.value = false;
  }
});