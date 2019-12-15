const env = require(`./config/${process.env.STAGE || 'local'}/env.js`);

module.exports = {
  mode: 'universal',
  head: {
    title: '907degrees',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '907degrees' }
    ]
  },

  build: {
    // add the path to the cached files
    publicPath: '/_nuxt/'
  },

  srcDir: 'client/',

  performance: {
    gzip: false
  },

  router: {
    base: '/',
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
    mode: 'history'
  },

  axios: {
    https: true,
    baseURL: env.NOS_API_URL
  },

  plugins: [
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios' }
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',

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
        vueI18nLoader: true
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
      '@/styles/_base.scss' // use underscore "_" & also file extension ".scss"
    ]
  }
};