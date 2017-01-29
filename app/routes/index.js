const router = require('express').Router();

router.use('/', require('./learning'));
router.use('/models', require('./models'));

module.exports = router;
