const Usuario = require('../models/usuario');

// Listar todos los usuarios
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();

        // Agrega un campo para identificar el rol actual y predefinir opciones de rol
        const usuariosConRoles = usuarios.map(usuario => ({
            ...usuario.toObject(),
            esAdministrador: usuario.rol === 'administrador',
            esUsuarioNormal: usuario.rol === 'normal',
        }));

        res.status(200).json({
            success: true,
            data: usuariosConRoles,
        });
    } catch (err) {
        console.error('Error al listar usuarios:', err);
        res.status(500).json({
            success: false,
            message: 'Error al cargar los usuarios.',
            error: err.message,
        });
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
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado.',
            });
        }

        res.status(200).json({
            success: true,
            message: `El rol de ${usuario.nombre} ha sido actualizado a ${nuevoRol}.`,
            data: usuario,
        });
    } catch (err) {
        console.error('Error al cambiar rol:', err);
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al cambiar el rol.',
            error: err.message,
        });
    }
};
