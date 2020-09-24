// axios interceptor 필요할 때 쓸 것. Sodagift에서 가져옴 (20191215)
// https://axios.nuxtjs.org/extend

export default function({ $axios, store, redirect, app, error }) {
  $axios.onRequest(config => {
    // youtube, azure, footballapi 에는 jwt 포함시키지 않음
    if (config.url.indexOf('youtube') !== -1
    || config.url.indexOf('azure') !== -1
    || config.url.indexOf('football') !== -1) {
      return;
    } else if (store.state.auth.jwt) {
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.jwt}`;
    }
 
    store.commit('mutateIsLoading', true);
  });

  $axios.onError(error => {
    console.error(error);
    store.commit('mutateIsLoading', false);
    let errorCode;
    if (error.response) errorCode = parseInt(error.response.status);

    // Token 만료 등의 권한 에러시 자동 로그아웃
    if (error.response.config.url.indexOf('localhost:3002') !== -1 || error.response.config.url.indexOf('nos-api') !== -1) {
      if (errorCode === 401) {
        return redirect(app.localePath({
          name: 'login'
        }));
      } else {
        error({ statusCode: 500, message: 'Server error' });
      }
    }

    // 기타 서버에러는 에러 페이지로
    else {
      error({ statusCode: 500, message: 'Server error' });
    }

    return Promise.reject(error);
  });

  // 모든 곳에서 사용할 수 있는 변수 (지금 데이터가 송수신 중인지)
  $axios.onResponse(response => {
    store.commit('mutateIsLoading', false);
  });
}