const env = require('./serverless-env.js');
const stage = process.env.STAGE;

const serverlessEnv = {
  STAGE: stage,
  APP_NAME: stage === 'prod' ? env.APP_NAME : `dev-${env.APP_NAME}`,
  DOMAIN: stage === 'prod' ? env.DOMAIN : `dev.${env.DOMAIN}`,
  REGION: env.REGION
};

module.exports = () => {
  return serverlessEnv;
};
