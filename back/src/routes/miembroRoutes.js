    const express = require('express');
    const router = express.Router();
    const {
        listarMiembros,
        crearMiembro,
        actualizarMiembro,
        eliminarMiembro,
    } = require('../controllers/miembroController');

    const { verificarAdministrador } = require('../middleware/authMiddleware');

    // Todas las rutas están restringidas a administradores
    router.get('/', verificarAdministrador, listarMiembros); // Listar miembros
    router.post('/', verificarAdministrador, crearMiembro); // Crear miembro
    router.put('/:id', verificarAdministrador, actualizarMiembro); // Actualizar miembro
    router.delete('/:id', verificarAdministrador, eliminarMiembro); // Eliminar miembro

    module.exports = router;
