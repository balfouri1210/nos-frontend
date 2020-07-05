// This code running on lambda
// and return nuxt object
const express = require('express');
const xRequestId = require('express-request-id');
const app = express();
const { Nuxt } = require('nuxt');
const path = require('path');

app.use(xRequestId);

app.use('/_nuxt', express.static(path.join(__dirname, '.nuxt', 'dist')));
const config = require('./nuxt.config.js');
const nuxt = new Nuxt(config);

app.use(async (req, res, next) => {
  await nuxt.ready();
  nuxt.render(req, res, next);
  return {'statusCode': 200, 'body': 'results'};
});

module.exports = app;
