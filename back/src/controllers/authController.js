const Usuario = require('../models/usuario');
const bcrypt = require("bcryptjs");

// Procesar inicio de sesión
exports.procesarLogin = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'El usuario no existe.',
            });
        }

        const esContraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esContraseñaValida) {
            return res.status(401).json({
                success: false,
                message: 'Contraseña incorrecta.',
            });
        }

        req.session.usuario = {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
        };

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso.',
            usuario: req.session.usuario,
        });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({
            success: false,
            message: 'Ocurrió un error al iniciar sesión.',
            error: err.message,
        });
    }
};

// Procesar registro de usuarios
exports.procesarRegistro = async (req, res) => {
    const { nombre, correo, contraseña, fechaNacimiento } = req.body;

    try {
        if (!fechaNacimiento || new Date(fechaNacimiento) > new Date()) {
            return res.status(400).json({
                success: false,
                message: 'La fecha de nacimiento debe ser válida y estar en el pasado.',
            });
        }

        const existeUsuario = await Usuario.findOne({ correo });
        if (existeUsuario) {
            return res.status(409).json({
                success: false,
                message: 'El correo ya está registrado.',
            });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            contraseña: hashedPassword,
            fechaNacimiento: new Date(fechaNacimiento),
        });


        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente.',
            usuario: nuevoUsuario,
        });
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario.',
            error: err.message,
        });
    }
};

// Cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).json({
                success: false,
                message: 'Error al cerrar sesión.',
                error: err.message,
            });
        }
        res.status(200).json({
            success: true,
            message: 'Sesión cerrada exitosamente.',
        });
    });
};