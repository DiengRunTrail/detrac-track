// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt3-leaflet", "nuxt-icon", '@nuxtjs/device'],
  routeRules: {
    '/locations': {
      proxy: "https://dev.diengcalderarace.com/api/locations"
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: "/images/logo-detrac-pat.png" }]
    }
  },
  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {},
  //   },
  // },
});