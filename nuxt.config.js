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
    // prevent duplicated import in component
    vendor: ['axios'],

    // add the path to the cached files
    publicPath: '/_nuxt/'
  },

  srcDir: 'client/',

  performance: {
    gzip: false
  },

  router: {
    base: '/'
  },

  plugins: [
    { src: '~plugins/i18n.js' }
  ],

  modules: [
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

  dev: false
};