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
  modules: ["nuxt-svgo", "@nuxt/image", "@nuxtjs/i18n"],
  site: {
    url: 'https://www.lmlccommunication.fr',
    trailingSlash: true,
  },
  sitemap: {
    hostname: 'https://lmlccommunication.fr',
    gzip: true,
    exclude: [
      '/scrolling',
      ''
      // any other paths you want to exclude
    ],
    urls: [
      {
        url: '/index',
        changefreq: 'daily',
        priority: 1,
        lastmodISO: '2021-10-28T09:00:00.000Z'
      },
      {
        url: '/about',
        changefreq: 'daily',
        priority: 0.8,
        lastmodISO: '2021-10-28T09:00:00.000Z'
      },
      {
        url: '/work',
        changefreq: 'daily',
        priority: 0.8,
        lastmodISO: '2021-10-28T09:00:00.000Z'
      },
      {
        url: '/mentions-legales',
        changefreq: 'daily',
        priority: 0.8,
        lastmodISO: '2021-10-28T09:00:00.000Z'
      },
    ],
    // other options
  },
  // sitemap: false,
  // sitemap: {
  //   hostname: 'https://localhost:3000',
  //   gzip: true,
  //   // sitemaps: {
  //   //   accueil: {
  //   //     //should only include /foo urls
  //   //     include: ['/index'],
  //   //   },
  //   //   about: {
  //   //     //should only include /bar urls
  //   //     include: ['/about'],
  //   //   },
  //   //   work: {
  //   //     //should only include /bar urls
  //   //     include: ['/work'],
  //   //   },
  //   //   mentions_legales: {
  //   //     //should only include /bar urls
  //   //     include: ['/mentions-legales'],
  //   //   },
  //   // },
  // },
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
