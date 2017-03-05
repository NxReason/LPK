const router = require('express').Router();
const { session, auth } = require('../middleware');
const bodyParser = require('body-parser');

const { useDB } = require('../config');
if ( useDB ) {
  // Populate session and body data to "req" object
  router.use(session);
  router.use(bodyParser.urlencoded({ extended: false }));

  // Allow everyone to send credentials for authorization
  router.use('/login', require('./login'));
  router.use(auth);
}


// Allow access only to authorized users
router.use('/', require('./learning'));
router.use('/models', require('./models'));

module.exports = router;
