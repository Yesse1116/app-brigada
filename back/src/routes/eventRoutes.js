const express = require("express");
const router = express.Router();
const {
    getAllEvents,
    createEvent,
    deleteEvent,
} = require("../controllers/eventController")

// Ruta para obtener todos los eventos
router.get("/", getAllEvents);

// Ruta para crear un nuevo evento
router.post("/", createEvent);

// Ruta para eliminar un evento
router.delete("/:id", deleteEvent);

module.exports = router;
