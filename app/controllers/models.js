const { Model } = require('../database/').models;

const getModelById = (req, res) => {
  const { _id } = req.params;

  Model.findOne({ _id }).populate('states.img')
    .then((model) => {
      res.status(200).json(model);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ message: 'Can\'t find model with given id' });
    });
};

const getAll = (req, res) => {
  Model.find({})
  .then((models) => {
    res.render('models', { path: '/admin', user: req.session.user, models });
  })
  .catch((err) => {
    console.log(err);
    res.render('error', { code: 505, message: 'Не удалось получить список моделей' });
  });
};

const remove = (req, res) => {
  const { _id } = req.params;

  Model.remove({ _id })
  .then(() => {
    res.status(400).json({ message: 'Can\'t find model with given id' });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: 'Oops. Something went wrong' });
  });
}

module.exports = {
  getModelById,
  getAll,
  remove,
};
