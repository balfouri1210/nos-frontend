const serverless = require('serverless-http');
const binaryMimeTypes = require('./binaryMimeTypes');
const nuxt = require('./nuxt');

const slsObj = serverless(nuxt, {
  binary: binaryMimeTypes
});
module.exports.handler = async (event, context, callback) => {
  // Immediate response for WarmUP plugin
  if (event.source === 'serverless-plugin-warmup') {
    return callback(null, 'Lambda is warm!');
  }

  const result = await slsObj(event, context);
  return result;
};