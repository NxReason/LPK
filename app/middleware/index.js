const session = require('./session');
const auth = require('./auth');

const middlewares = {
  session,
  auth
}

module.exports = middlewares;
