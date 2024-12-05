const express = require('express');
const router = express.Router();

const {
    procesarLogin,
    procesarRegistro,
    cerrarSesion,
} = require('../controllers/authController');


// Rutas accesibles sin iniciar sesión
router.post('/login', procesarLogin); // Procesar login
router.post('/register', procesarRegistro); // Procesar registro

// Ruta para cerrar sesión
router.post('/logout', cerrarSesion);

module.exports = router;
