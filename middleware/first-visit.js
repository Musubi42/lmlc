import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware(() => {
  const cookieFirstVisit = Cookies.get("firstVisit");
  let firstVisit = undefined;

  if (cookieFirstVisit === "false") {
    firstVisit = false;
  } else { // Ca veut dire qu'il n'y a pas de cookie 
    firstVisit = true;
  }

  // if (!firstVisit) {
  //   const IntroAnimation = stateIntroAnimation();
  //   IntroAnimation.value = false;
  // }
  
  const isfirstVisit = stateFirstVisit();
  console.log('ici');
  console.log(isfirstVisit);

  isfirstVisit.value = firstVisit;
  console.log(isfirstVisit.value);
});
