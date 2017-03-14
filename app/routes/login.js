const router = require('express').Router();
const authorize = require('../services/auth');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  authorize( username, password )
  .then(user => {
    req.session.user = user;
    req.session.authError = null;
  })
  .catch(error => {
    req.session.authError = error;
  })
  .then(() => res.redirect('/'));
});

module.exports = router;
