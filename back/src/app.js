const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const session = require("express-session");

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Configuración de Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "*", // Ajustar para restringir dominios en producción
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Habilitar el uso de cookies con CORS
}));

// Configuración de sesión
app.use(session({
    secret: process.env.SESSION_SECRET || "mi_secreto",
    resave: false,
    saveUninitialized: false, // No crea sesiones vacías
})
);

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB para la App Brigada"))
    .catch((err) => console.error("Error al conectar:", err));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const miembroRoutes = require("./routes/miembroRoutes");
const adminRoutes = require('./routes/adminRoutes');

// Registrar rutas
app.use("/auth", authRoutes);
app.use("/miembros", miembroRoutes);
app.use("/admin", adminRoutes);

// Ruta principal
app.get('/', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({
            success: false,
            message: "Debes iniciar sesión para acceder a esta página.",
        });
    }

    if (req.session.usuario.rol === 'administrador') {
        return res.status(200).json({
            success: true,
            message: "Bienvenido al panel de administración.",
            usuario: req.session.usuario,
        });
    }

    // Para usuarios normales
    res.status(200).json({
        success: true,
        message: "Bienvenido al panel de usuario.",
        usuario: req.session.usuario,
    });
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada.",
    });
});

// Exportar la aplicación
module.exports = app;
