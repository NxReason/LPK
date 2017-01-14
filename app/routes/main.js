const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', { message: 'Hello EJS' });
});

module.exports = router;
