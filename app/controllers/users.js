const User = require('../database/models').User;

const getUserView = (req, res) => {
  res.render('user', { path: null, user: req.session.user });
}

module.exports = {
  getUserView
}
