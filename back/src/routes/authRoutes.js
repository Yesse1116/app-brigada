const express = require('express');
const router = express.Router();
const { listarUsuarios, cambiarRol } = require('../controllers/authController');

const {
    mostrarLogin,
    procesarLogin,
    mostrarRegistro,
    procesarRegistro,
    cerrarSesion,
} = require('../controllers/authController');

const { verificarAdministrador, verificarUsuarioLogueado } = require('../middleware/authMiddleware');


// Rutas accesibles sin iniciar sesión
router.get('/login', mostrarLogin); // Formulario de login
router.post('/login', procesarLogin); // Procesar login, inicio de sesion
router.get('/register', mostrarRegistro); // Formulario de registro
router.post('/register', procesarRegistro); // Procesar registro

// Listar usuarios (solo administradores)
router.get('/usuarios', verificarAdministrador, listarUsuarios);

// Cambiar rol de usuario (solo administradores)
router.post('/usuarios/cambiar-rol/:id', verificarAdministrador, cambiarRol);

// Ruta para cerrar sesión
router.get('/logout', cerrarSesion);

module.exports = router;
