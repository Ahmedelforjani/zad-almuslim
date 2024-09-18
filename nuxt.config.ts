// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/fonts",
    "shadcn-nuxt",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@vueuse/motion/nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    // public: {
    //   apiUrl: process.env.NUXT_API_URL,
    // },
  },
  nitro: {
    routeRules: {
      "/api/**": {
        proxy: `${process.env.NUXT_API_URL}/**`,
      },
    },
  },
});
