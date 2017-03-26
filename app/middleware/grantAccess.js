module.exports = (...roles) => (req, res, next) => {
  if ( roles.includes(req.session.user.level) ) {
    next();
  } else {
    res.status(403).render('error', { code: 403, message: 'У вас нет доступа к данному разделу.' })
  }
}
