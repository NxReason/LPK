const router = require('express').Router();
const Model = require('../dev/model_stubs');
const session = require('../middleware/session');

router.get('/', (req, res) => {
  Model.findAll()
  .then(models => { res.render('learning', { models, user: req.session.user, path: req.path }) })
  .catch(err => { res.status(500).render('server_error', { message: `Can't get data about models` }) });
});

module.exports = router;
