const router = require('express').Router();
const { auth } = require('../middleware');
const { mainController, loginController, modelController } = require('../controllers');

// Allow everyone to send credentials for authorization
router.post('/login', loginController.logIn);
// router.use(auth);

// Allow access only to authorized users
router.get('/', mainController.learning);
router.get('/models/:id', modelController.getModelById);


// TODO delete
router.get('/test', modelController.getModels);

module.exports = router;
