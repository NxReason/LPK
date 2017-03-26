const router = require('express').Router();
const { auth } = require('../middleware');
const { mainController, loginController, modelController, cadController } = require('../controllers');

// Allow everyone to send credentials for authorization
router.post('/login', loginController.logIn);
router.use(auth);

// Allow access only to authorized users
router.get('/', mainController.getLearningView);
router.get('/models/:id', modelController.getModelById);

// Access to developers and admins
router.get('/cad', cadController.getCadView);

// Access to admins
router.get('/admin', mainController.getAdminView);

// TODO delete
router.get('/test', modelController.getModels);

// 404
router.all('*', mainController.handle404);

// Handle uncaught errors
router.use('*', mainController.handleError)

module.exports = router;
