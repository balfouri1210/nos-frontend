// 이 mixin은 player modal history를 child route로 사용하는 페이지들이
// 공통적으로 사용할 수 있도록 mixin으로 추출한 것이다.
// nos-player-modal의 _base에 넣지 않은 이유는 당연히 asyncData를 활용하기 위함이다.
// asyncData는 components 수준의 로직에서 사용할 수 없고 pages 수준에서만 사용할 수 있기 때문이다.

export default {
  async asyncData({ $axios, error, params, query }) {
    const historyId = params.historyId;
    const playerId = params.playerId;

    function getHistory() {
      return $axios.$get(`/api/histories/${historyId}`);
    }

    function getPlayerHistory() {
      return $axios.$get(`/api/histories/${historyId}/player/${playerId}`);
    }

    function getCommentHistories() {
      return $axios.$get(`/api/histories/${historyId}/player/${playerId}/comments`, {
        params: {
          sortType: 'like'
        }
      });
    }

    try {
      const [history, playerHistory, comments] = await Promise.all([
        getHistory(),
        getPlayerHistory(),
        getCommentHistories()
      ]);

      return { history, playerHistory, comments };
    } catch (err) {
      console.error(err);
      error({ statusCode: 500 });
    }
  },
};