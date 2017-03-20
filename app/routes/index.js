const router = require('express').Router();
const { auth } = require('../middleware');

// Allow everyone to send credentials for authorization
router.use('/login', require('./login'));
router.use(auth);

// Allow access only to authorized users
router.use('/', require('./learning'));
router.use('/models', require('./models'));

module.exports = router;
