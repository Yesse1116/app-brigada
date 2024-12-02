const Miembro = require('../models/miembro'); // Importa el modelo

// Listar miembros
exports.listarMiembros = async (req, res) => {
    try {
        const miembros = await Miembro.find();
        res.status(200).json({
            success: true,
            data: miembros,
        });
    } catch (err) {
        console.error('Error al listar miembros:', err);
        res.status(500).json({
            success: false,
            message: 'Error al listar miembros.',
            error: err.message,
        });
    }
};

// Crear miembro
exports.crearMiembro = async (req, res) => {
    try {
        const { nombre, correo, fechaNacimiento } = req.body;

        // Generar un código único para el miembro
        const codigo = `M-${Date.now()}`;

        // Crear el miembro
        const nuevoMiembro = await Miembro.create({ 
            nombre, 
            correo, 
            fechaNacimiento, 
            codigo 
        });

        res.status(201).json({
            success: true,
            message: 'Miembro creado exitosamente.',
            data: nuevoMiembro,
        });
    } catch (err) {
        console.error('Error al crear miembro:', err);
        if (err.name === 'ValidationError') {
            const mensajes = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: mensajes.join(', '),
            });
        }
        if (err.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'El correo ya está registrado. Por favor, usa uno diferente.',
            });
        }
        res.status(500).json({
            success: false,
            message: 'Error inesperado al crear miembro.',
            error: err.message,
        });
    }
};

// Actualizar miembro
exports.actualizarMiembro = async (req, res) => {
    try {
        const { nombre, correo, fechaNacimiento } = req.body;

        const miembroActualizado = await Miembro.findByIdAndUpdate(
            req.params.id,
            { nombre, correo, fechaNacimiento },
            { new: true } // Retorna el documento actualizado
        );

        if (!miembroActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Miembro no encontrado.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Miembro actualizado exitosamente.',
            data: miembroActualizado,
        });
    } catch (err) {
        console.error('Error al actualizar miembro:', err);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar miembro.',
            error: err.message,
        });
    }
};

// Eliminar miembro
exports.eliminarMiembro = async (req, res) => {
    try {
        const miembroEliminado = await Miembro.findByIdAndDelete(req.params.id);

        if (!miembroEliminado) {
            return res.status(404).json({
                success: false,
                message: 'Miembro no encontrado.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Miembro eliminado exitosamente.',
        });
    } catch (err) {
        console.error('Error al eliminar miembro:', err);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar miembro.',
            error: err.message,
        });
    }
};