const router = require('express').Router();

const Model = require('../models/model');

router.get('/', (req, res) => {
  Model.findAll()
  .then(models => { res.render('learning', { models }) })
  .catch(err => { res.status(500).render('server_error', { message: `Can't get data about models` }) });
});

module.exports = router;
