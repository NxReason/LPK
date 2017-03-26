function auth (req, res, next) {
  if ( req.session.user ) {
    next();
  } else {
    // Save requsted path to redirect user there after authorization
    req.session.requestedPath = req.path;
    res.redirect('/login');
  }
}

module.exports = auth;
