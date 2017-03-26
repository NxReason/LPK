const Model = require('../database/models').Model;

const getLearningView = (req, res) => {
  Model.findAll({ attributes: ['id', 'name' ]})
    .then(models => { res.render('learning', { models, user: req.session.user, path: req.path }) })
    .catch(err => { res.status(500).render('serverError', { message: `Can't get data about models` }) });
}

const getAdminView = (req, res) => {
  res.render('admin', { user: req.session.user, path: req.path });
}

const handle404 = (req, res) => {
  res.status(404).render('error', { code: 404, message: 'Запрашиваемой страницы не существует.' });
}

const handleError = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).render('error', { code: 505, message: `Что-то пошло не так` });
}

module.exports = {
  getLearningView,
  getAdminView,
  handle404,
  handleError
}
