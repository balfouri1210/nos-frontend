const env = require('./serverless-env.js');
const stage = process.env.STAGE;

const serverlessEnv = {
  STAGE: stage,
  APP_NAME: env.APP_NAME,
  DOMAIN: stage === 'prod' ? env.DOMAIN : `dev.${env.DOMAIN}`,
  REGION: env.REGION
};

module.exports = () => {
  return serverlessEnv;
};
