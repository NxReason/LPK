const session = require('express-session');

const options = {
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    httpOnly: true,
    path: '/',
    secure: false
  },
  resave: false,
  saveUninitialized: false,
  secret: 'wowsuchsessionverysecret',
  unset: 'destroy'
}

module.exports = session(options);
