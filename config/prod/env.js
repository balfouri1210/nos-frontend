const env = {
  STAGE: 'prod',
  NOS_URL: 'https://907degrees.com',
  NOS_API_URL: 'https://api.907degrees.com',
  // api url에 https를 사용하려면 로드밸런서가 필수인데, 사용하게 되면 월 19달러의 추가요금이 들게된다. 그래서 일단은 http로만 설정해놓았다.
  NOS_IMAGE_URL: 'https://images.907degrees.com',
  BING_API_URL: 'https://api.bing.microsoft.com/v7.0/news/search',

  YOUTUBE_API_KEY: 'AIzaSyDRKV44WOv8EfOf2nftTdlrSj8MLzvzd80',
  BING_API_KEY: '7940325feb9e48df9c06265159dce145',
  API_FOOTBALL_API_URL: 'https://api-football-v1.p.rapidapi.com/v2',
  RAPID_API_KEY: '66fadb396cmsh7e7976a97d1dac7p10ccfbjsn442c3d222ff9',
  GA_TRACKING_ID: 'UA-167249423-1',

  SENTRY_DISABLED: false
};

module.exports = env;

