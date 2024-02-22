// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { 
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    public: {
      MAINTENANCE: process.env.MAINTENANCE,
      APIStreamAudioBaseUrl:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api"
          : "https://Ils4fBuzd7oGbyJy.public.blob.vercel-storage.com",
    },
  },
  env: {
    baseUrl:
      process.env.NODE_ENV === "dev"
        ? "http://localhost:3001"
        : "https://stream.lmlc.musubi.dev",
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  modules: ["nuxt-svgo", "@nuxt/image", "@nuxtjs/i18n", '@nuxt/image'],
  image: {
    inject: true,
    quality: 80,
    format: ['webp', 'png', 'jpg', 'gif'],  
  },
  site: {
    url: 'https://lmlccommunication.fr',
    trailingSlash: true,
  },
  i18n: {
    vueI18n: "./i18n.config.js", // if you are using custom path, default
  },
  svgo: {
    autoImportPath: "~/assets/icons/",
  },
  plugins: [
    '/plugins/hover-directive.js',
    '/plugins/cursor-state.js',
    // '/plugins/axeptio.js',
    // '/plugins/gsap.js',
  ],
  build: {
    transpile: ['gsap'],
  },
  components: true,
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
