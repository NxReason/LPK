const router = require('express').Router();
const { auth, grantAccess } = require('../middleware');
const {
  mainController,
  loginController,
  modelController,
  cadController,
  userController
} = require('../controllers');

// Allow everyone to send credentials for authorization
router.get('/login', loginController.getLogInView);
router.post('/login', loginController.logIn);

// Allow access only to authorized users
router.use(auth);
router.get('/', mainController.getLearningView);
router.get('/models/:id', modelController.getModelById);

router.get('/user', userController.getUserView);

router.get('/logout', loginController.logOut);

// Access to developers and admins
router.use(grantAccess('dev', 'admin'));
router.get('/cad', cadController.getCadView);

// Access to admins
router.use(grantAccess('admin'));
router.get('/admin', mainController.getAdminView);

// TODO delete
router.get('/test', modelController.getModels);

// 404
router.all('*', mainController.handle404);

// Handle uncaught errors
router.use('*', mainController.handleError)

module.exports = router;
