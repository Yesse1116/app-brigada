const verificarAdministrador = (req, res, next) => {
    // Verifica si hay un usuario autenticado
    if (!req.session.usuario) {
        return res.status(401).json({
            success: false,
            message: 'No autorizado. Por favor, inicie sesión.'
        });
    }

    // Verifica si el usuario tiene el rol de administrador
    if (req.session.usuario.rol !== 'administrador') {
        return res.status(403).json({
            success: false,
            message: 'Acceso denegado. Solo administradores pueden realizar esta acción.'
        });
    }

    next(); // Si todo es correcto, continúa con la solicitud
};

module.exports = { verificarAdministrador };
