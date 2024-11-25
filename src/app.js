const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const dotenv = require("dotenv");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const hbs = require("hbs");


// Cargar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Configuración de Handlebars
app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      formatDate: (date) => {
        if (!date) return ""; // Maneja fechas nulas
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(date).toLocaleDateString("es-ES", options);
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Registro de helpers adicionales
hbs.registerHelper('ifCond', function (v1, v2, options) {
  return v1 === v2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper('eq', (a, b) => {
    return a === b;
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración de sesión y Flash
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mi_secreto",
    resave: false,
    saveUninitialized: false, // No crea sesiones vacías
  })
);
app.use(flash());

// Middleware para mensajes flash y sesión de usuario
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.usuario = req.session && req.session.usuario ? req.session.usuario : null; // Usuario logueado
  next();
});

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
// Rutas de administración
app.use("/admin", adminRoutes);

// Ruta principal
app.get('/', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/auth/login'); // Redirige al login si no está logueado
  }

  if (req.session.usuario.rol === 'administrador') {
    return res.render('admin/dashboard', { usuario: req.session.usuario });
  }

  // Para usuarios normales
  res.render('usuario/dashboard', { usuario: req.session.usuario });
});


// Exportar la aplicación
module.exports = app;
