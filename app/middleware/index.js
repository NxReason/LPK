const session = require('./session');
const auth = require('./auth');
const grantAccess = require('./grantAccess');
const fileLoader = require('./fileLoader');

const middlewares = {
  session,
  auth,
  grantAccess,
  fileLoader,
};

module.exports = middlewares;
