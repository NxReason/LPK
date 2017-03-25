const router = require('express').Router();
const { auth } = require('../middleware');
const { mainController, loginController, modelController } = require('../controllers');

// Allow everyone to send credentials for authorization
router.post('/login', loginController.logIn);
router.use(auth);

// Allow access only to authorized users
router.get('/', mainController.getLearningView);
router.get('/models/:id', modelController.getModelById);

// 404
router.all('*', mainController.handle404);

// Handle uncaught errors
router.use('*', mainController.handleError)

// TODO delete
router.get('/test', modelController.getModels);

module.exports = router;
