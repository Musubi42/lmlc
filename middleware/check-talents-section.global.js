export default defineNuxtRouteMiddleware((to) => {
  var isTalents = talents();
    
  // Il faut forcer tout le temps le isTalents à false, ou si non le header est blanc
  isTalents.value = false;
  console.log(isTalents.value);
});