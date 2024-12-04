const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const session = require("express-session");
const bodyParser =require ('body-parser')

// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Configuración de Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/usuarios", (req, res) => {
    const session = { user: { nombre: "lucianoAdmin", rol: "administrador" } }; // Simula una sesión
  
    if (session) {
      res.status(200).json({ success: true, usuario: session.user }); // Cambia `session` a `usuario`
    } else {
      res.status(404).json({ success: false, message: "Sesión no encontrada" });
    }
  });
  
// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173',
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
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB para la App Brigada"))
    .catch((err) => console.error("Error al conectar:", err));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const miembroRoutes = require("./routes/miembroRoutes");
const adminRoutes = require('./routes/adminRoutes');
const eventRoutes = require('./routes/eventRoutes')

// Registrar rutas
app.use("/auth", authRoutes);
app.use("/miembros", miembroRoutes);
app.use("/admin", adminRoutes);
app.use("/calendario", eventRoutes);


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
