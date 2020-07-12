const env = require(`./config/${process.env.STAGE || 'local'}/env.js`);

module.exports = {
  mode: 'universal',
  serverMiddleware: [
    (req, res, next) => {
      /**
       * 기본적으로 서버사이드 랜더링되는 페이지는 캐시되지 않도록 함 (AWS Edge 캐시 불허 ex: index.html, xxx.html, etc)
       * PATH 에 따라 캐시될 수 있는 페이지에서는 캐시를 허용하도록 해야함 (Paul, 20181210)
       **/
      res.setHeader('Cache-Control', [
        'private',
        'no-cache',
        'no-store',
        'must-revalidate',
      ]);
      next();
    }
  ],
  head: {
    title: '907degrees - Hottest Player of The Week',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Find out who is the most interested football player this week and Share thoughts with football fans'
      },
      { name: 'theme-color', content: '#000000' },
      { name: 'google-site-verification', content: '3zp6wWo1KnDbOYUMSMGHw4TiYyXVEB7dEP-g89ifApg' },

      // Opengraph
      {
        'property':  'og:title',
        'content':  'Hottest Player of The Week - Leaderboard, News & Fans\' Reaction',
      },
      {
        'property':  'og:site_name',
        'content':  '907Degrees',
      },
      // {
      //   'property':  'og:description',
      //   'content': 'Community designed for the football fans to explore their interest for the players on a weekly basis'
      // },
      {
        'property':  'og:url',
        'content': '907degrees.com'
      },
      {
        'property':  'og:image',
        'content': 'opengraph.png'
      }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Kanit:300,300i,400,400i,500,500i,600,600i,700,700i&display=swap'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
      { rel: 'icon', href: 'favicon-180x180.png', sizes: '180x180', type: 'image/png' },
      { rel: 'icon', href: 'favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico?v=2'}
    ],
    script: [
      { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${env.GA_TRACKING_ID}` },
      {
        type: 'text/javascript',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());
          gtag('config', '${env.GA_TRACKING_ID}');
        `
      }
    ],
    __dangerouslyDisableSanitizers: ['script']
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
    { src: '~/plugins/router.js' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/validator.js' },
    { src: '~/plugins/global-component.js' },
    { src: '~/plugins/datepicker.js', ssr: false },
    { src: '~/plugins/logout.js', ssr: false },
    { src: '~/plugins/vue-spinner.js', ssr: false },
    { src: '~/plugins/vue-countdown.js', ssr: false },
    { src: '~/plugins/moment.js' },
    { src: '~/plugins/filter.js' },
    { src: '~/plugins/v-click-outside.js', ssr: false },
    { src: '~/plugins/clipboard.js', ssr: false },
    { src: '~/plugins/vuetify.js' }
  ],

  buildModules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    // treeShake를 꺼놓은 이유 : custom vuetify icon을 사용하기 위해서이다.
    // plugin을 통해 커스텀 아이콘을 vuetify에 주입하는데, 개발에서는 잘 됐지만
    // 할 수 있는 모든 방법을 다 써도 production mode (운영) 에서는 실패했다.
    // 검색하다 https://github.com/nuxt-community/vuetify-module/issues/67
    // 이걸 발견했고, treeShake를 끄니 커스텀아이콘이 렌더링 되었다.
    // 이슈에서는 1.0.1이후로 고쳐졌다고 하지만 나는 여전히 treeShake를 꺼야했다.
    // 일단은 이렇게 조치하고 넘어간다. 이것때문에 거의 3-4일을 아무것도 못했다. 스트레스가 크다.
    ['@nuxtjs/vuetify', {
      treeShake: false
    }],
    '@nuxtjs/moment',
    'nuxt-user-agent',

    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US'
          }
          // ,{
          //   code: 'ko',
          //   iso: 'ko-KR'
          // }
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
        },
        detectBrowserLanguage: {
          useCookie: false,
          cookieKey: 'nos_lang',
          alwaysRedirect: true
        },
        vueI18nLoader: true,
        strategy: 'prefix_except_default'
      }
    ],

    ['vue-scrollto/nuxt', { duration: 300 }]
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