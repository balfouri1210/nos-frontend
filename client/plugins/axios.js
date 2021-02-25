// axios interceptor 필요할 때 쓸 것. Sodagift에서 가져옴 (20191215)
// https://axios.nuxtjs.org/extend

export default function({ $axios, store, redirect, app, error }) {
  $axios.onRequest(config => {
    // youtube, bing, footballapi 에는 jwt 포함시키지 않음
    if (config.url.indexOf('youtube') !== -1
    || config.url.indexOf('bing') !== -1) {
      return;
    } else if (config.url.indexOf('football') !== -1) {
      config.headers.common['x-rapidapi-host'] = 'api-football-v1.p.rapidapi.com';
      config.headers.common['x-rapidapi-key'] = process.env.RAPID_API_KEY;
    } else if (store.state.auth.jwt) {
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.jwt}`;
    }
 
    // http 통신중인지 store에 기록하여 모든 곳에서 쓸 수 있음
    store.commit('mutateIsLoading', true);
  });

  $axios.onError(error => {
    console.error(error);
    store.commit('mutateIsLoading', false);

    const errorCode = parseInt(error.response && error.response.status);

    // 외부 API에서 에러발생시 페이지 이동없이 그대로 리턴
    // 그렇기 때문에 각 외부 요청에서 try - catch로 잡아줘야 한다.
    // 내부 API는 여기에서 처리하기 때문에 try - catch로 감싸지 않고 async await로만 처리하는 방향으로
    // 구현하겠음.
    if (error.response && error.response.config.url.indexOf('localhost:3002') === -1
    && error.response && error.response.config.url.indexOf('907degrees') === -1)
      return;

    if (errorCode === 401) {
      // Token 만료 등의 권한 에러시 로그아웃
      store.$logout();
    } else if (errorCode === 500) {
      // 기타 에러시 bug 페이지로 리다이렉트
      redirect(app.localePath({
        name: 'bugs'
      }));
    }
  });

  // http 통신 완료 후 store 초기화
  $axios.onResponse(response => {
    store.commit('mutateIsLoading', false);
  });
}