const { Model } = require('../database/models');

const getModelById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Model id should be number' });
  } else {
    Model.findById(id, { include: [ { all: true, nested: true } ]})
    .then((model) => {
      res.status(200).json(model);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json({ message: 'Can\'t find model with given id' });
    });
  }
};

const getAll = (req, res) => {
  Model.findAll({ raw: true })
  .then((models) => {
    console.log(models);
    res.render('models', { path: '/admin', user: req.session.user, models });
  })
  .catch((err) => {
    console.log(err.message);
    res.render('error', { code: 505, message: 'Не удалось получить список моделей' });
  });
};

const remove = (req, res) => {
  const { id } = req.params;

  Model.destroy({
    where: { id },
  })
  .then((row) => {
    console.log(row);
    if (row === 0) {
      res.status(400).json({ message: 'Can\'t find model with given id' });
    } else {
      res.status(200).json({ message: 'Model was successfully deleted' }); 
    }
  })
  .catch((err) => {
    console.log(err.message);
    res.status(500).json({ message: 'Oops. Something went wrong' });
  });
}

// TODO delete
const getModelsTest = (req, res) => {
  Model.findAll({ include: [{ all: true, nested: true }] })
    .then(models => res.json(models))
    .catch(err => res.status(500).json({ err: err.message }));
};

module.exports = {
  getModelById,
  getAll,
  remove,
  getModelsTest,
};
