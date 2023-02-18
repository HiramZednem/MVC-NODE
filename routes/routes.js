var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
// ruta buscar por nombre
router.route('/user/searchByName').get(userController.searchUserFunc);
// Actualizar nombre y contraseña
router.route('/user/update').put(userController.updateUserFunc);
// ruta eliminar por nombre
router.route('/user/deleteByName').delete(userController.deleteUserFunc)


module.exports = router;
