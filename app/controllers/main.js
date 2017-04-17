const { Model } = require('../database/models');
const report = require('../services/report');

const learning = (req, res) => {
  Model.findAll({ attributes: ['id', 'name'] })
    .then((models) => { res.render('learning', { models, user: req.session.user, path: req.path }); })
    .catch((err) => {
      console.log(err.message);
      res.status(500).render('serverError', { message: 'Can\'t get data about models' });
    });
};

const newReport = (req, res) => {
  const data = req.body;
  data.userId = req.session.user.id;
  report.save(data)
    .then(() => res.json({ saved: true }))
    .catch(err => res.json({ saved: false, message: err.message }));
}

const admin = (req, res) => {
  res.render('admin', { user: req.session.user, path: req.path });
};

const handle404 = (req, res) => {
  if (req.xhr) {
    res.status(404).json({ message: `Некорректный URL: ${req.path}` });
  }
  res.status(404).render('error', { code: 404, message: 'Запрашиваемой страницы не существует.' });
};

const SERVER_ERR_MSG = 'Что-то пошло не так';
const handle500 = (err, req, res, next) => {
  console.log(err.message);
  if (req.xhr) {
    res.status(500).json({ message: SERVER_ERR_MSG });
  } else {
    res.status(500).render('error', { code: 505, message: SERVER_ERR_MSG });
  }
};

module.exports = {
  learning,
  newReport,
  admin,
  handle404,
  handle500,
};
