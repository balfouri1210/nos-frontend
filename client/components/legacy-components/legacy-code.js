// 쓸모없어진 코드중에 버리긴 아까운 코드들을 모아놓은 곳이다.
export default {
  // 아래 코드는 search페이지에서 query기반으로 움직이도록 구현해 놓은걸
  // path param방식으로 바꾸면서 걷어낸 코드들이다. 핵심 부분만 옮겨왔다.
  // url에서 query가 바뀌었을 때 그걸 캐치하는 것과
  // 모바일에서 뒤로가기를 눌렀을 때, url이 바뀌지 않고 player modal만 꺼지도록 구현하는것에서
  // 고생했던 걸로 기억한다.

  // ---------------------------------------------------------- //
  // watchQuery, key는 route이동때문에 추가된 항목이다.
  // search를 계속할 경우, 같은 route에서 query만 바뀌게 되는데,
  // 이 두 녀석이 있어야 바뀐 query를 감지하고, 페이지 이동없이 데이터만 업데이트 할 수 있다.
  // 참고 : https://github.com/nuxt/nuxt.js/issues/2591
  watchQuery: true,
  key: to => to.fullPath,

  // ROUTER HOOK의 존재 이유
  // search페이지에서는 player modal이 별도의 url을 갖지 않는다. (일반 팝업으로 작동)
  // 그렇기 때문에 모바일에서 뒤로가기를 누르면 팝업만 닫히는게 아니라 페이지가 이동되어 버리고
  // 이건 존나 성가시다.
  // 그렇기 때문에 팝업이 열려있을 때 route가 업데이트 되거나 (url query만 바뀌는 경우),
  // 이동하면 player modal만 닫고 페이지는 유지한다.
  // next(false)가 라우트를 막는 역할을 한다.
  // 단, 'Update'의 경우 사용자가 뒤로가기를 누르면 url query가 바뀌었다가, 다시 원래대로 돌아오는데
  // (/search?clubId=12 -> /search?clubId=15 -> /search?clubId=12)
  // 이는 정상적인 현상으로 보기에 살짝 옥의 티처럼 느껴지긴 하지만 더 나은 해결책이 있을때까지는
  // 그냥 두기로 한다.
  // 참고 : https://router.vuejs.org/kr/guide/advanced/navigation-guards.html 여기에서 next(false)를 볼것

  // 작업중에 search페이지의 데이터 요청을 asyncData에서 created로 옮겼더니 위 현상이 해결되었다.
  // 옮긴 이유 = routeUpdate시 원치않는 http 요청 발생 (이전 페이지의 asyncData에 있는 요청)
  // asyncData와 뭔가 관련이 있는것은 확실해 보이는데 파고들지는 않았다. 일단 이걸로 너무 골머리를 썩어서
  // 놔뒀다 나중에 알아보던가 할것이다.

  // 내 예상
  // (/search?clubId=12 -> /search?clubId=15 -> /search?clubId=12)
  // 이 현상은 created로 옮긴 후에도 지속되지만, 눈에 안보이는 것 뿐인듯 하다.
  // asyncData가 있으면, /search?clubId=15일때 데이터 요청 끝나기를 기다리기 때문에
  // url이 눈에 보일만큼 긴 시간 노출되는 것이고, created로 옮긴 이후에는 await가 없기 때문에
  // 순식간에 url 재설정이 이루어지는 것이다. 확실하지 않지만 내 생각에 url 재설정 현상이
  // 없어진건 아니고, 존나 빨라진거임. 아무튼 내가 원하는 방향으로 완벽하게 해결되었다.
  beforeRouteUpdate(to, from, next) {
    if (this.isPlayerModalOpen) {
      this.closePlayerModalHandler();
      next(false);
    } else {
      if (process.client) document.documentElement.style.overflow = 'auto';
      next();
    }
  },

  beforeRouteLeave(to, from, next) {
    if (to.name.indexOf('login') !== -1 || to.name.indexOf('signup') !== -1) {
      if (process.client) document.documentElement.style.overflow = 'auto';
      next();
    } else if (this.isPlayerModalOpen) {
      this.closePlayerModalHandler();
      next(false); // 이게 핵심임. 모바일에서 '뒤로가기'를 눌렀을 때 모달만 닫고 페이지 이동을 막는 코드
    } else {
      if (process.client) document.documentElement.style.overflow = 'auto';
      next();
    }
  }
  // ---------------------------------------------------------- //
};

export const detectScroll = {
  // 페이지 로드시 detect scroll 등록
  mounted() {
    window.addEventListener('scroll', this.detectScroll);
  },

  // 페이지 이동시 detect scroll 해제
  destroyed() {
    window.removeEventListener('scroll', this.detectScroll);
  },

  methods: {
    detectScroll() {
      let bottomOfWindow =
          // 스크롤 위치 중 최대값
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
          // 화면 높이
          window.innerHeight >=
          // player-list-wrapper 높이
          document.getElementById('home-body').offsetHeight;

      if (bottomOfWindow)
        this.isBottomOfWindow = true;
    }
  }
};
