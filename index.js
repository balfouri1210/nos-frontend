const sls = require('serverless-http');
const binaryMimeTypes = require('./binaryMimeTypes');
const nuxt = require('./nuxt');

const handler = sls(nuxt, {
  binary: binaryMimeTypes
});
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};