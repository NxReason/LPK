const Model = require('../database/models').Model;

const learning = (req, res) => {
  Model.findAll({ attributes: ['id', 'name' ]})
    .then(models => { console.log(JSON.stringify(models)); res.render('learning', { models, user: req.session.user, path: req.path }) })
    .catch(err => { res.status(500).render('serverError', { message: `Can't get data about models` }) });
}

module.exports = {
  learning
}
