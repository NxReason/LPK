const router = require('express').Router();
const { auth, grantAccess, fileLoader } = require('../middleware');

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
router.get('/models/:_id', modelController.getModelById);
router.post('/learning/report', mainController.newReport);

router.get('/user', usersController.profile);

router.get('/logout', loginController.processLogout);

// Access to developers and admins
router.use(grantAccess('dev', 'admin'));
router.get('/cad', cadController.cad);
router.post('/cad/models/', cadController.saveModel);

router.get('/galery', cadController.galery);
router.post('/galery/images', fileLoader.single('img'), cadController.saveImage);

// Access to admins
router.use(grantAccess('admin'));
router.get('/admin', mainController.admin);
router.get('/admin/users', usersController.users);
router.get('/admin/users/new', usersController.create);
router.post('/admin/users/new', usersController.save);
router.get('/admin/users/edit/:_id', usersController.edit);
router.post('/admin/users/update', usersController.update);
router.delete('/admin/users/delete/:_id', usersController.remove);
router.get('/admin/users/exists', usersController.exists);

router.get('/admin/models', modelController.getAll);
router.delete('/admin/models/:_id', modelController.remove);

// Handle not found (404)
router.all('*', mainController.handle404);

// Handle uncaught errors (500)
router.use('*', mainController.handle500);

module.exports = router;
