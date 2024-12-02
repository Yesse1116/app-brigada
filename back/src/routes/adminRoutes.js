const express = require('express');
const router = express.Router();
const { verificarAdministrador } = require('../middleware/authMiddleware');
const { listarUsuarios, cambiarRol } = require('../controllers/adminController');

// Ruta para listar usuarios (solo administradores)
router.get('/usuarios', verificarAdministrador, listarUsuarios);

// Ruta para cambiar el rol de un usuario (solo administradores)
router.post('/usuarios/cambiar-rol/:id', verificarAdministrador, cambiarRol);

module.exports = router;
