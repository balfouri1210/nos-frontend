// axios interceptor 필요할 때 쓸 것. Sodagift에서 가져옴 (20191215)
// https://axios.nuxtjs.org/extend

export default function({ $axios, store, redirect, app, error }) {
  $axios.onRequest(config => {
    if (store.state.auth.jwt
      && config.url.indexOf('youtube') === -1
      && config.url.indexOf('azure') === -1)
      config.headers.common['Authorization'] = `Bearer ${store.state.auth.jwt}`;
 
    store.commit('mutateIsLoading', true);
  });

  $axios.onError(error => {
    store.commit('mutateIsLoading', false);
    const code = parseInt(error.response && error.response.status);

    // Token 만료 등의 권한 에러시 자동 로그아웃
    if ([401].includes(code)) {
      return redirect(app.localePath({
        name: 'login'
      }));
    }

    // 기타 서버에러는 에러 페이지로
    else if (code === 500) {
      error({ statusCode: 500, message: 'Server error' });
    }

    return Promise.reject(error);
  });

  $axios.onResponse(response => {
    store.commit('mutateIsLoading', false);
  });
}