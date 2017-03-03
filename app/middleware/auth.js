function auth (req, res, next) {
  if ( req.session.user ) {
    next();
  } else {
    const error = req.session.authError;
    req.session.authError = null;
    res.render('login', { error });
  }
}

module.exports = auth;
