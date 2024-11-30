const Miembro = require('../models/miembro'); // Importa el modelo

// Función para listar miembros
const listarMiembros = async (req, res) => {
    try {
        const miembros = await Miembro.find(); // Consulta en la base de datos
        res.render('miembros/listado', { miembros }); // Renderiza la vista con los datos
    } catch (err) {
        console.error('Error al listar miembros:', err); // Imprime el error
        res.status(500).send('Error al listar miembros'); // Envía un mensaje de error
    }
};
exports.listarMiembros = async (req, res) => {
  try {
      // Obtener todos los miembros
      const miembros = await Miembro.find().populate('userId', 'nombre correo');

      res.render('miembros/listado', { miembros });
  } catch (err) {
      console.error('Error al listar miembros:', err);
      req.flash('error', 'Error al listar miembros.');
      res.redirect('/');
  }
};

// Función para crear un miembro
const crearMiembro = async (req, res) => {
  try {
      const { nombre, correo, fechaNacimiento } = req.body; // Incluye los datos del formulario

      // Generar un código único para el miembro
      const codigo = `M-${Date.now()}`;

      // Crear el miembro y guardarlo en la base de datos
      const nuevoMiembro = new Miembro({ 
          nombre, 
          correo, 
          codigo, 
          fechaNacimiento 
      });

      await nuevoMiembro.save();

      // Mensaje de éxito
      req.flash('success', 'Miembro creado exitosamente');
      res.redirect('/miembros'); // Redirige al listado de miembros
  } catch (err) {
      console.error('Error al crear miembro:', err);

      // Manejo de errores
      if (err.name === 'ValidationError') {
          // Errores de validación en los campos
          const mensajes = Object.values(err.errors).map(e => e.message);
          req.flash('error', mensajes.join(', '));
      } else if (err.code === 11000) {
          // Errores de duplicidad (correo único)
          req.flash('error', 'El correo ya está registrado. Por favor, usa uno diferente.');
      } else {
          req.flash('error', 'Error inesperado al crear miembro.');
      }

      // Redirige al formulario con mensajes de error
      res.redirect('/miembros');
  }
};

const editarMiembroForm = async (req, res) => {
  try {
      const miembro = await Miembro.findById(req.params.id); // Busca el miembro por ID
      res.render('miembros/editar', { miembro }); // Renderiza el formulario de edición
  } catch (err) {
      console.error('Error al cargar formulario de edición:', err);
      res.status(500).send('Error al cargar formulario de edición');
  }
};

const actualizarMiembro = async (req, res) => {
  try {
      const { nombre, correo, fechaNacimiento } = req.body; // Incluye fechaNacimiento
      await Miembro.findByIdAndUpdate(req.params.id, { nombre, correo, fechaNacimiento });
      req.flash('success', 'Miembro actualizado exitosamente');
      res.redirect('/miembros');
  } catch (err) {
      console.error('Error al actualizar miembro:', err);
      req.flash('error', 'Error al actualizar miembro');
      res.redirect('/miembros');
  }
};

const eliminarMiembro = async (req, res) => {
  try {
      await Miembro.findByIdAndDelete(req.params.id); // Elimina el miembro por ID
      req.flash('success', 'Miembro eliminado exitosamente');
      res.redirect('/miembros');
  } catch (err) {
      console.error('Error al eliminar miembro:', err);
      req.flash('error', 'Error al eliminar miembro');
      res.redirect('/miembros');
  }
};

// Exporta todas las funciones
module.exports = {
    listarMiembros,
    crearMiembro,
    editarMiembroForm,
    actualizarMiembro,
    eliminarMiembro,
};
