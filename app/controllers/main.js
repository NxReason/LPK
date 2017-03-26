const Model = require('../database/models').Model;
const winston = require('winston');

const getLearningView = (req, res) => {
  Model.findAll({ attributes: ['id', 'name' ]})
    .then(models => { res.render('learning', { models, user: req.session.user, path: req.path }) })
    .catch(err => { res.status(500).render('serverError', { message: `Can't get data about models` }) });
}

const handle404 = (req, res) => {
  res.status(404).render('404');
}

const handleError = (err, req, res, next) => {
  winston.log('error', err.message);
  res.status(500).render('serverError', { message: `Oops, something went wrong.` });
}

module.exports = {
  getLearningView,
  handle404,
  handleError
}
