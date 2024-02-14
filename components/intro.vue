<template ref="Intro">
  <div ref="screnIntro" class="bg-black h-screen w-screen flex justify-center items-center">
    <p 
      ref="textIntro" 
      id="textIntro"
      @animationend="handleAnimationEnd"
      class="text-white text-5xl font-bold taille text-left"></p>
  </div>
</template>

<style>
.taille {
  max-width: 50vw;
}

.blur-opening {
  filter: blur(20px);
}
</style>

<script>
import Typewriter from "typewriter-effect/dist/core";
import Cookies from "js-cookie";

export default {
  setup() {
    const IntroAnimation = stateIntroAnimation();

    return {
      IntroAnimation
    }
  },
  data() {
    return {
      textIntro: "AGENCE DE COMMUNICATION 360, DIGITAL NATIVE, ALLIANT CREATIVITE ET TECHNOLOGIE",
      textIntro1: "AGENCE DE",
      textIntro2: "COMMUNICATION 360,",
      inviteToPlay: "Mess arround !",
      test: "test",
      nodeIntro: ref(null),
      screenInfo: ref(null),
    }
  },
  methods: {
    typeWriteText() {
      var customNodeCreator = function (character) {
        return document.createTextNode(character);
      };

      var typewriter = new Typewriter(this.nodeIntro, {
        loop: false,
        delay: 35,
        cursor: "|",
        onCreateTextNode: customNodeCreator,
      });

      typewriter
        .typeString(this.test)
        .changeDelay(10)
        .start()
        .pauseFor(500)
        .deleteAll(10)
        .pauseFor(50)
        .changeDelay(25)
        .typeString(this.inviteToPlay)
        .pauseFor(500)
        .callFunction(() => {
          this.vanishIntro();
        })
    },
    vanishIntro() {
      this.screenInfo.style.opacity = 0;
      this.nodeIntro.classList.add("blur-opening");

      // A la fin de l'animation venir démonter le component du DOM
      setTimeout(() => {
        this.IntroAnimation = false;
        console.log(Cookies.get("firstVisit"));
        Cookies.set("firstVisit", "false");
      }, 1001);
    },
  },
  mounted() {
    this.nodeIntro = this.$refs.textIntro;
    this.screenInfo = this.$refs.screnIntro;
    this.typeWriteText();
  },
}
</script>