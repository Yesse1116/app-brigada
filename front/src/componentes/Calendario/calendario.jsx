import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es"; // Español
import Navbar from "../Navbar/Navbar";
import api from '../api/api';
import './Calendario.css';

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null); // Estado para el evento a editar
  const [showEditForm, setShowEditForm] = useState(false); // Estado para mostrar/ocultar el formulario de edición
  const [selectedEvent, setSelectedEvent] = useState(""); // Estado para el evento seleccionado

  // Cargar los eventos desde el servidor o localStorage
  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem("calendarEvents");
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      } else {
        api.get("/calendario")
          .then(response => {
            setEvents(response.data);
            localStorage.setItem("calendarEvents", JSON.stringify(response.data));
          })
          .catch(error => console.error("Error al cargar eventos desde el servidor:", error));
      }
    } catch (error) {
      console.error("Error al leer eventos de localStorage:", error);
      setEvents([]);
    }
  }, []);

  // Guardar eventos en localStorage cuando se actualizan
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    }
  }, [events]);

  // Manejar la creación de un nuevo evento
  const handleDateClick = async (info) => {
    const title = prompt("Introduce el título del evento:");
    if (title) {
      const newEvent = { title, start: info.dateStr, end: info.dateStr };
      try {
        const response = await api.post("/calendario", newEvent);
        const createdEvent = response.data;
        const updatedEvents = [...events, { ...createdEvent, id: createdEvent._id }];
        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error al crear el evento:", error);
      }
    }
  };

  // Manejar la eliminación de un evento
  const handleEventClick = async (info) => {
    if (window.confirm(`¿Eliminar el evento "${info.event.title}"?`)) {
      try {
        await api.delete(`/calendario/${info.event.id}`);
        const updatedEvents = events.filter((event) => event._id !== info.event.id);
        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error al eliminar el evento:", error);
      }
    }
  };

  // Manejar la edición de un evento
  const handleSelectEvent = (eventId) => {
    const eventToEdit = events.find(event => event._id === eventId);
    setSelectedEvent(eventToEdit);
    setShowEditForm(true);
  };

  // Actualizar un evento
  const handleSaveEdit = async () => {
    if (selectedEvent) {
      const updatedEvent = {
        title: selectedEvent.title,
        start: selectedEvent.start,
        end: selectedEvent.end,
      };

      try {
        const response = await api.put(`/calendario/${selectedEvent._id}`, updatedEvent);
        const updatedEvents = events.map((event) =>
          event._id === response.data._id ? response.data : event
        );
        setEvents(updatedEvents);
        setShowEditForm(false); // Cerrar el formulario
        setSelectedEvent(null); // Limpiar la selección
      } catch (error) {
        console.error("Error al actualizar el evento:", error);
      }
    }
  };

  return (
    <div className="calendar-container">
      <Navbar />
      
      {/* Botón para mostrar el formulario de edición */}
      <button onClick={() => setShowEditForm(!showEditForm)}>
        {showEditForm ? "Cerrar Edición" : "Editar Evento"}
      </button>

      {/* Mostrar select para elegir un evento a editar */}
      {showEditForm && (
        <div className="edit-event-container">
          <select
            onChange={(e) => handleSelectEvent(e.target.value)}
            value={selectedEvent ? selectedEvent._id : ""}
          >
            <option value="">Seleccionar evento</option>
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.title} - {new Date(event.start).toLocaleDateString()}
              </option>
            ))}
          </select>

          {selectedEvent && (
            <div className="edit-event-form">
              <input
                type="text"
                value={selectedEvent.title}
                onChange={(e) =>
                  setSelectedEvent({ ...selectedEvent, title: e.target.value })
                }
              />
              <button onClick={handleSaveEdit}>Guardar Cambios</button>
              <button onClick={() => setShowEditForm(false)}>Cancelar</button>
            </div>
          )}
        </div>
      )}

      {/* Calendario */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        height="auto"
        locale={esLocale}
      />
    </div>
  );
};

export default Calendario;
