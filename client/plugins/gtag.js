export default ({ store, app }, inject) => {
  const gtagTrackSpaPage = (pagePath) => {
    gtag('config', process.env.GA_TRACKING_ID, {'page_path': pagePath});
  };

  inject('gtagTrackSpaPage', gtagTrackSpaPage);
};
