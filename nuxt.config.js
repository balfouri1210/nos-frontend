const env = require(`./config/${process.env.STAGE || 'local'}/env.js`);

module.exports = {
  mode: 'universal',
  head: {
    title: '907degrees',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '907degrees' },
      { name: 'theme-color', content: '#000000' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Kanit:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      { rel: 'icon', href: 'favicon-180x180.png', sizes: '180x180', type: 'image/png' },
      { rel: 'icon', href: 'favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico?v=2'}
    ],
  },

  build: {
    // add the path to the cached files
    publicPath: '/_nuxt/',

    transpile: [
      'vee-validate/dist/rules'
    ],
  },

  srcDir: 'client/',

  performance: {
    gzip: false
  },

  router: {
    base: '/',
    mode: 'history',
    middleware: 'router-hook'
  },

  axios: {
    https: true,
    baseURL: env.NOS_API_URL
  },

  plugins: [
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/validator.js' },
    { src: '~/plugins/global-component.js' },
    { src: '~/plugins/datepicker.js', ssr: false },
    { src: '~/plugins/logout.js', ssr: false },
    { src: '~/plugins/vue-spinner.js', ssr: false },
    { src: '~/plugins/vue-countdown.js', ssr: false },
    { src: '~/plugins/moment.js' }
  ],

  buildModules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',

    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US'
          }, {
            code: 'ko',
            iso: 'ko-KR'
          }
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
        },
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'nos_lang',
          alwaysRedirect: true
        },
        vueI18nLoader: true,
        strategy: 'prefix_except_default'
      }
    ]
  ],

  env: {
    ...env
  },

  dev: false,

  styleResources: {
    scss: [
      '@/styles/_variable.scss',
      '@/styles/_main.scss' // use underscore "_" & also file extension ".scss"
    ]
  },

  loading: {
    color: '#f4991e',
    failedColor: 'black'
  }
};