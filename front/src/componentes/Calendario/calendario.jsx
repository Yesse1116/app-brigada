import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es"; // Español
import Navbar from "../Navbar/Navbar";
import api from '../api/api';
import './Calendario.css'

const Calendario = () => {
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("calendarEvents", JSON.stringify(events));
    }
  }, [events]);

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

  return (
    <div className="calendar-container">
      <Navbar />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        height="auto"
        locale={esLocale} // Idioma configurado
/>

    </div>
  );
};

export default Calendario;
