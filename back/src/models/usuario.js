const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    fechaNacimiento: { 
        type: Date, 
        required: false, 
        validate: {
            validator: (value) => value <= new Date(), // Validación para fechas pasadas
            message: 'La fecha de nacimiento debe ser en el pasado',
        },
    },
}, 
{ timestamps: true });

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = mongoose.model('Usuario', usuarioSchema);
