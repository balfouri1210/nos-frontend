import _ from 'lodash';
import Cookies from 'js-cookie';

export default {
  ..._,

  cookieParser(cookie) {
    if (cookie) {
      return cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev;
      }, {});
    }
  },

  savePlayerInfoToCookie(playerId, playerName) {
    Cookies.set('playerId', playerId);
    Cookies.set('playerName', playerName);
  }
};
