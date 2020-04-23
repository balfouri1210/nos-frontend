import momentDurationFormatSetup from 'moment-duration-format';

export default ({ app }, inject) => {
  momentDurationFormatSetup(app.$moment);
};