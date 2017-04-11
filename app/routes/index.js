const router = require('express').Router();
const { auth, grantAccess } = require('../middleware');
const {
  mainController,
  loginController,
  modelController,
  cadController,
  usersController,
} = require('../controllers');

// Allow everyone to send credentials for authorization
router.get('/login', loginController.showLogin);
router.post('/login', loginController.processLogin);

// Allow access only to authorized users
router.use(auth);
router.get('/', mainController.learning);
router.get('/models/:id', modelController.getModelById);

router.get('/user', usersController.profile);

router.get('/logout', loginController.processLogout);

// Access to developers and admins
router.use(grantAccess('dev', 'admin'));
router.get('/cad', cadController.cad);

// Access to admins
router.use(grantAccess('admin'));
router.get('/admin', mainController.admin);
router.get('/admin/users', usersController.users);
router.get('/admin/users/new', usersController.create);
router.get('/admin/users/edit/:id', usersController.edit);
router.delete('/admin/users/delete/:id', usersController.remove);

// TODO delete
router.get('/test', modelController.getModels);

// Handle not found (404)
router.all('*', mainController.handle404);

// Handle uncaught errors (500)
router.use('*', mainController.handle500);

module.exports = router;
