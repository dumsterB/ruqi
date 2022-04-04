export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ruqi',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  // Customize the progress-bar color
  loading: { color: 'blue' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/colors.scss',
    '@/assets/scss/style.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/ymapPlugin.js',  mode: 'client' },
    { src: '~/plugins/auth.js',  mode: 'client' },
    { src: '~/plugins/validation.js',  mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    'nuxt-route-meta',
  ],

  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true
  },

  auth : {
    redirect : {
      home : '/',
    },
  },

  router : {
    middleware : [ 'check_auth', 'access_rights' ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
