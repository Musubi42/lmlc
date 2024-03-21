export default defineNuxtRouteMiddleware(() => {
  let session = undefined;
  let IntroAnimation = stateIntroAnimation();
  
  const introSession = stateSession();
  

  if (introSession === "false") {
    IntroAnimation = false;
    session = true;
  } 

  introSession.value = session;

  // Faire une gestion de détection mobile et desktop
});
