// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    'nuxt-icon'
  ],
  experimental: {
    reactivityTransform: true
  },
  tailwindcss: {
    cssPath: '~/assets/css/input.css'
  },
  runtimeConfig: {
    LINKEDIN_CLIENT_ID: '',
    LINKEDIN_CLIENT_SECRET: '',
    SECRET: 'hello',
    ORIGIN: 'http://localhost:3000',
    DATABASE_URL: '',
    LINKEDIN_SESSION: '',
    LINKEDIN_EMAIL: '',
    LINKEDIN_PASSWORD: '',
  },
  auth: {
    enableGlobalAppMiddleware: true,
    origin: process.env.ORIGIN || 'http://localhost:3000',
  }
})
