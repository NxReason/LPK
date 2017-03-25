const auth = require('../services/auth')

const logIn = (req, res) => {
  const { username, password } = req.body;
  auth( username, password )
  .then(user => {
    req.session.user = user;
    req.session.authError = null;
  })
  .catch(error => {
    req.session.authError = error;
  })
  .then(() => res.redirect('/'));
}

module.exports = {
  logIn
}
