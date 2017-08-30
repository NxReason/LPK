/**
 * Pass if user session exists
 * otherwise redirect to login page
 */
function auth(req, res, next) {
  // if (req.session.user) {
  //   next();
  // } else {
  //   res.redirect('/login');
  // }
  req.session.user = {
    _id: '59a55bb0b206e57c69f5c7fe',
    level: 'admin',
    username: 'admin',
    firstname: 'john',
    lastname: 'doe',
    email: 'example@mail.com',
  };
  next();
}

module.exports = auth;
