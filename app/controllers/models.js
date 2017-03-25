const Model = require('../database/models').Model;

const getModelById = (req, res) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Model id should be number' });
  } else {
    Model.findById(id)
    .then(model => {
      res.status(200).json(model);
    })
    .catch(err => {
      res.status(400).json({ message: `Can't find model with given id` });
    });
  }
}
// TODO delete
const getModels = (req, res) => {
  Model.findAll({ include: [{ all: true, nested: true }] })
    .then(models => res.json(models))
    .catch(err => res.status(500).json({ err: err.message }));
}

module.exports = {
  getModelById,
  getModels
}
