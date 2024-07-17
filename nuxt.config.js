// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { 
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
   head: {
    // Other head elements like title, meta tags, etc.
    script: [
      {
        type: 'text/javascript',
        innerHTML: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "lk9m0oyh2p");
        `,
        charset: 'utf-8',
      },
    ],
    __dangerouslyDisableSanitizers: ['script'],
  },
  runtimeConfig: {
    public: {
      gtagId: "G-DDH88P7V5K",
      MAINTENANCE: process.env.MAINTENANCE,
      APIStreamAudioBaseUrl:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/api"
          : "https://streamlmlc.musubi.dev",
    },
  },

  // Blob music storage https://Ils4fBuzd7oGbyJy.public.blob.vercel-storage.com
  env: {
    baseUrl:
      process.env.NODE_ENV === "dev"
        ? "http://localhost:3001"
        : "https://streamlmlc.musubi.dev",
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  modules: ["nuxt-svgo", "@nuxt/image", "@nuxtjs/i18n", '@nuxt/image', '@unlighthouse/nuxt'],
  image: {
    inject: true,
    quality: 80,
    format: ['webp', 'png', 'jpg', 'gif'],  
  },
  site: {
    url: 'https://lmlccommunication.fr',
    trailingSlash: true,
  },
  unlighthouse: {
    scanner: {
      // simulate a desktop device
      device: 'desktop',
    },
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
    '/plugins/clarity-plugin.js',
    '/plugins/gtag.client.js',
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
