// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt3-leaflet", "nuxt-icon", '@nuxtjs/device'],
  routeRules: {
    '/v1/locations': {
      proxy: "http://localhost:50052/v1/locations"
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: "/images/logo-detrac-pat.png" }]
    }
  }
});