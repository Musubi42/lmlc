import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(() => {
  const firstVisit = Cookies.get("firstVisit") === "true" ? true : false;

  if (!firstVisit) {
    const IntroAnimation = stateIntroAnimation();
    IntroAnimation.value = false;
  }
  
  const isfirstVisit = stateFirstVisit();

  isfirstVisit.value = firstVisit;
});
