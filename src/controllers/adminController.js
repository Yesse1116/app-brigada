const Usuario = require('../models/usuario');

// Listar todos los usuarios
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();

        // Agrega un campo para identificar el rol actual y predefinir opciones de rol
        const usuariosConRoles = usuarios.map(usuario => {
            return {
                ...usuario.toObject(),
                esAdministrador: usuario.rol === 'administrador',
                esUsuarioNormal: usuario.rol === 'normal',
            };
        });

        res.render('admin/usuarios', { usuarios: usuariosConRoles });
    } catch (err) {
        console.error('Error al listar usuarios:', err);
        req.flash('error', 'Error al cargar los usuarios.');
        res.redirect('/');
    }
};

// Cambiar el rol de un usuario
exports.cambiarRol = async (req, res) => {
    const { id } = req.params;
    const { nuevoRol } = req.body;

    try {
        const usuario = await Usuario.findByIdAndUpdate(
            id,
            { rol: nuevoRol },
            { new: true, runValidators: true }
        );

        if (!usuario) {
            req.flash('error', 'Usuario no encontrado.');
            return res.redirect('/admin/usuarios');
        }

        req.flash('success', `El rol de ${usuario.nombre} ha sido actualizado a ${nuevoRol}.`);
        res.redirect('/admin/usuarios');
    } catch (err) {
        console.error('Error al cambiar rol:', err);
        req.flash('error', 'Ocurrió un error al cambiar el rol.');
        res.redirect('/admin/usuarios');
    }
};
