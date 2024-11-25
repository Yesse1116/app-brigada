exports.verificarAdministrador = (req, res, next) => {
    // Verificar si el usuario está logueado
    if (!req.session.usuario) {
        req.flash('error', 'Debes iniciar sesión para acceder a esta página.');
        return res.redirect('/auth/login'); // Redirige al login si no hay sesión activa
    }

    // Verificar si el usuario tiene rol de administrador
    if (!req.session.usuario || req.session.usuario.rol !== 'administrador') {
        req.flash('error', 'No tienes permisos para acceder a esta página.');
        return res.redirect('/');
    }

    next(); // Continúa si el usuario es administrador
};
