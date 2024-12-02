exports.verificarAdministrador = (req, res, next) => {
    // Verificar si el usuario está logueado
    if (!req.session.usuario) {
        return res.status(401).json({
            success: false,
            message: 'Debes iniciar sesión para acceder a esta página.',
        });
    }

    // Verificar si el usuario tiene rol de administrador
    if (req.session.usuario.rol !== 'administrador') {
        return res.status(403).json({
            success: false,
            message: 'No tienes permisos para acceder a esta página.',
        });
    }

    next(); // Continúa si el usuario es administrador
};
