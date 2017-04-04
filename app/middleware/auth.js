function auth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    // Save requested path to redirect user there after authorization
    req.session.requestedPath = req.path;
    console.log('Saved path:', req.path);
    res.redirect('/login');
  }
  // req.session.user = {
  //   id: 1,
  //   level: 'admin',
  //   username: 'admin',
  //   firstname: 'john',
  //   lastname: 'doe',
  //   email: 'example@mail.com'
  // };
  // next();
}

module.exports = auth;
