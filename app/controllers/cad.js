const getCadView = (req, res) => {
  res.render('cad', { user: req.session.user, path: req.path });
}

module.exports = {
  getCadView
}
