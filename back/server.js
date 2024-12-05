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
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Habilitar el uso de cookies con CORS
}));

// Configuración de sesión
app.use(session({
    secret: 'tu-secreto-aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
);


// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB Atlas"))
  .catch((err) => console.error("Error al conectar a MongoDB Atlas:", err));


// Importar rutas
const authRoutes = require('./src/routes/authRoutes');
const eventRoutes = require('./src/routes/eventRoutes')

// Registrar rutas
app.use("/auth", authRoutes);
app.use("/calendario", eventRoutes);


// Ruta principal
app.get('/', (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({
            success: false,
            message: "Debes iniciar sesión para acceder a esta página.",
        });
    }
});

// Manejo de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada.",
    });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
