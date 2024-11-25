const express = require('express');
const router = express.Router();
const { listarMiembros, crearMiembro, editarMiembroForm, actualizarMiembro, eliminarMiembro } = require('../controllers/miembroController');
const miembroController = require('../controllers/miembroController');
const { verificarAdministrador, verificarUsuarioLogueado } = require('../middleware/authMiddleware');

// Rutas accesibles para todos los usuarios logueados
//router.get('/', verificarUsuarioLogueado, miembroController.listarMiembros);

// Todas las rutas están restringidas a administradores
router.get('/', verificarAdministrador, miembroController.listarMiembros);
router.post('/crear', verificarAdministrador, miembroController.crearMiembro);
router.post('/eliminar/:id', verificarAdministrador, miembroController.eliminarMiembro);
router.get('/editar/:id', verificarAdministrador, miembroController.editarMiembroForm);
router.post('/actualizar/:id', verificarAdministrador, miembroController.actualizarMiembro);

module.exports = router;
