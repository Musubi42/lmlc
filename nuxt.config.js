// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  sourcemap: {
    server: true,
    client: true,
  },

  // devtools: {
  //   enabled: true,
  //   timeline: {
  //     enabled: true,
  //   },
  // },
  server: {
    hmr: {
      clientPort: 3002,
    },
  },

  head: {
    // Other head elements like title, meta tags, etc.
    script: [
      {
        type: "text/javascript",
        innerHTML: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "lk9m0oyh2p");
        `,
        charset: "utf-8",
      },
    ],
    __dangerouslyDisableSanitizers: ["script"],
  },

  runtimeConfig: {
    public: {
      gtagId: "G-DDH88P7V5K",
      MAINTENANCE: process.env.MAINTENANCE,
      APIStreamAudioBaseUrl:
        process.env.NODE_ENV === "development"
          ? "http://localhost:3002/api"
          : "https://streamlmlc.musubi.dev",
      strapiBaseUrl: "https://strapi.musubi.dev/api",
      strapiToken:
        "c873918b35a417b5f6251039ec5a3dc215cb3b2feaad617b72a8d1d3ff217581a61c85d7aad3c86b8b1ff5231f3c860a707a2badb453e1d7b8e34f82e0af926d4ce8c4420634d2576884984c0eece73f2129a07d1751d87e9ac90d12aa0fce5adff93cc67e7631825f63768fa7233bcdfd5c830dcd5aef6781d88871c9ef2301",
      strapiGalleriePutLike: "",
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

  modules: [
    "nuxt-svgo",
    "@nuxt/image",
    "@nuxtjs/i18n",
    "@nuxt/image",
    // "@unlighthouse/nuxt",
    "@builder.io/sdk-vue/nuxt",
  ],

  image: {
    inject: true,
    quality: 80,
    format: ["webp", "png", "jpg", "gif"],
  },

  site: {
    url: "https://lmlccommunication.fr",
    trailingSlash: true,
  },

  // unlighthouse: {
  //   scanner: {
  //     // simulate a desktop device
  //     device: "desktop",
  //   },
  // },
  i18n: {
    vueI18n: "./i18n.config.js", // if you are using custom path, default
  },

  svgo: {
    autoImportPath: "~/assets/icons/",
  },

  plugins: [
    "/plugins/hover-directive.js",
    "/plugins/cursor-state.js",
    "/plugins/clarity-plugin.js",
    "/plugins/gtag.client.js",
    // '/plugins/axeptio.js',
    // '/plugins/gsap.js',
  ],

  build: {
    transpile: ["gsap"],
  },

  components: true,
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-10-07",
});