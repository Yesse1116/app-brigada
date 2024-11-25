const mongoose = require('mongoose');

const miembroSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true }, // relacion
    fechaRegistro: { type: Date, default: Date.now }, // Fecha de registro
    codigo: { type: String, required: true },
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(), // No permite fechas futuras
            message: 'La fecha de nacimiento debe ser en el pasado',
        },
    },
    
}, { timestamps: true });
    


module.exports = mongoose.model('Miembro', miembroSchema);
