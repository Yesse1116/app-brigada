const Event = require("../models/eventSchema");

// Obtener todos los eventos
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los eventos", error });
  }
};

// Crear un nuevo evento
const createEvent = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body); // Log para depurar
    const { title, start, end } = req.body;
    const newEvent = new Event({ title, start, end });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error al crear el evento:", error); // Log del error
    res.status(400).json({ message: "Error al crear el evento", error });
  }
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el evento", error });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  deleteEvent,
};
