const session = require('./session');
const auth = require('./auth');
const grantAccess = require('./grantAccess');

const middlewares = {
  session,
  auth,
  grantAccess
}

module.exports = middlewares;
