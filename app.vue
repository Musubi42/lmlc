<template>
  <div id="page">
    <Navbar id="navbar" />
    <transition name="page" mode="out-in">
      <NuxtPage />
    </transition>
    <div class="overlay"></div>
    <Social />
    <Chat />
    <Footer />
  </div>
</template>