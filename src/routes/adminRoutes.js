const express = require('express');
const router = express.Router();
const { verificarAdministrador } = require('../middleware/authMiddleware');
const { listarUsuarios, cambiarRol } = require('../controllers/adminController');
const adminController = require('../controllers/adminController');

// Ruta para listar usuarios (solo administradores)
//router.get('/usuarios', verificarAdministrador, adminController.listarUsuarios);
router.get('/usuarios', verificarAdministrador, listarUsuarios);

// Ruta para cambiar el rol de un usuario (solo administradores)
//router.post('/usuarios/:id/rol', verificarAdministrador, adminController.cambiarRol);
router.post('/usuarios/cambiar-rol/:id', verificarAdministrador, cambiarRol);

module.exports = router;
