const Usuario = require('../models/usuario');
const Miembro = require('../models/miembro');
const bcrypt = require("bcryptjs");

// Mostrar formulario de login
exports.mostrarLogin = (req, res) => {
    res.render('login'); // Vista "login.hbs"
};

// Procesar inicio de sesión
exports.procesarLogin = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            req.flash('error', 'El usuario no existe.');
            return res.redirect('/auth/login');
        }

        const esContraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esContraseñaValida) {
            req.flash('error', 'Contraseña incorrecta.');
            return res.redirect('/auth/login');
        }

        req.session.usuario = {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
        };

        req.flash('success', 'Inicio de sesión exitoso.');
        res.redirect('/');
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        req.flash('error', 'Ocurrió un error al iniciar sesión.');
        res.redirect('/auth/login');
    }
};

// Mostrar formulario de registro
exports.mostrarRegistro = (req, res) => {
    res.render('register'); // Vista "register.hbs"
};

// Procesar registro de usuarios
exports.procesarRegistro = async (req, res) => {
    const { nombre, correo, contraseña, fechaNacimiento } = req.body;

    try {
        if (!fechaNacimiento || new Date(fechaNacimiento) > new Date()) {
            req.flash('error', 'La fecha de nacimiento debe ser válida y estar en el pasado.');
            return res.redirect('/auth/register');
        }

        const existeUsuario = await Usuario.findOne({ correo });
        if (existeUsuario) {
            req.flash('error', 'El correo ya está registrado.');
            return res.redirect('/auth/register');
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            contraseña: hashedPassword,
            fechaNacimiento: new Date(fechaNacimiento),
        });
        console.log('Usuario registrado:', nuevoUsuario);

        const miembroExistente = await Miembro.findOne({ correo });
        if (!miembroExistente) {
            await Miembro.create({
                nombre,
                correo,
                fechaNacimiento: new Date(fechaNacimiento),
                codigo: `M-${Date.now()}`,
                fechaRegistro: new Date(),
            });
        } else if (!miembroExistente.fechaNacimiento) {
            miembroExistente.fechaNacimiento = new Date(fechaNacimiento);
            await miembroExistente.save();
        }

        req.flash('success', 'Usuario registrado exitosamente. Por favor, inicia sesión.');
        res.redirect('/auth/login');
    } catch (err) {
        console.error('Error al registrar usuario:', err);
        req.flash('error', 'Error al registrar usuario.');
        res.redirect('/auth/register');
    }
};

// Listar usuarios (solo para administradores)
exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        const usuariosConDatos = usuarios.map(usuario => ({
            ...usuario._doc,
            esAdministrador: usuario.rol === 'administrador',
        }));
        res.render('admin/usuarios', { usuarios: usuariosConDatos });
    } catch (err) {
        console.error('Error al listar usuarios:', err);
        req.flash('error', 'Error al cargar los usuarios.');
        res.redirect('/');
    }
};


exports.cambiarRol = async (req, res) => {
    const { id } = req.params;
    const { nuevoRol } = req.body;

    try {
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            req.flash('error', 'Usuario no encontrado.');
            return res.redirect('/admin/usuarios');
        }

        usuario.rol = nuevoRol;
        await usuario.save();

        req.flash('success', `El rol de ${usuario.nombre} ha sido actualizado a ${nuevoRol}.`);
        res.redirect('/admin/usuarios');
    } catch (err) {
        console.error('Error al cambiar el rol:', err);
        req.flash('error', 'Error al cambiar el rol.');
        res.redirect('/admin/usuarios');
    }
};

// Cerrar sesión
exports.cerrarSesion = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            req.flash('error', 'Error al cerrar sesión.');
            return res.redirect('/');
        }
        res.redirect('/auth/login');
    });
};
