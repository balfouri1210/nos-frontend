// axios interceptor 필요할 때 쓸 것. Sodagift에서 가져옴 (20191215)
// https://axios.nuxtjs.org/extend

export default function({ $axios, store, redirect, app }) {
  $axios.onRequest(config => {
    config.headers.common['Authorization'] = `Bearer ${store.state.auth.jwt}`;
  });

  // $axios.onError(error => {
  //   const code = parseInt(error.response && error.response.status);

  //   if ([401, 403].includes(code)) {
  //     app.$logout();

  //     return redirect(app.localePath({
  //       name: 'login'
  //     }));
  //   }

  //   return Promise.reject(error);
  // });
}