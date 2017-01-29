const router = require('express').Router();
const Model = require('../models/model');

router.get('/:id', (req, res) => {
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
});

module.exports = router;
