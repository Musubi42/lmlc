export default defineNuxtRouteMiddleware((to) => {
  const isPageMentionsLegales = pageMentionsLegales();

  if (to.path === "/mentions-legales") {
    isPageMentionsLegales.value = true;
  }
});