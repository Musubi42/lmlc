import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(() => {
  const cookieFirstVisit = Cookies.get("firstVisit");
  let firstVisit = undefined;
  let IntroAnimation = stateIntroAnimation();
  

  if (cookieFirstVisit === "false") {
    IntroAnimation = false;
    firstVisit = false;
  } else { // Ca veut dire qu'il n'y a pas de cookie 
    firstVisit = true;
  }

  
  const isfirstVisit = stateFirstVisit();

  isfirstVisit.value = firstVisit;

  // Faire une gestion de détection mobile et desktop
});
