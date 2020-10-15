// 이 mixin은 player modal을 child route로 사용하는 페이지들이
// 공통적으로 사용할 수 있도록 mixin으로 추출한 것이다.
// nos-player-modal의 _base에 넣지 않은 이유는 당연히 asyncData를 활용하기 위함이다.
// asyncData는 components 수준의 로직에서 사용할 수 없고 pages 수준에서만 사용할 수 있기 때문이다.

export default {
  async asyncData({ $axios, error, params }) {
    function getPlayer() {
      return $axios.$get(`/api/players/${params.playerId}`, {
        params: {
          playerName: params.playerName
        }
      });
    }

    function getComments() {
      return $axios.$get(`/api/comments/player/${params.playerId}`, {
        params: {
          sortType: 'date'
        }
      });
    }

    const [player, comments] = await Promise.all([
      getPlayer(),
      getComments()
    ]);

    return { player, comments };
  }
};