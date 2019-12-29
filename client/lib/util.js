export default {
  cookieParser(cookie) {
    if (cookie) {
      return cookie.split('; ').reduce((prev, current) => {
        const [name, value] = current.split('=');
        prev[name] = value;
        return prev;
      }, {});
    }
  }
};
