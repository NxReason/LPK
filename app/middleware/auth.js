function auth (req, res, next) {
  if ( req.session.user ) {
    next();
  } else {
    // Clean auth error field to hide error message in case when
    // user refreshes page etc.
    const error = req.session.authError;
    req.session.authError = null;
    res.render('login', { error });
  }
}

module.exports = auth;
