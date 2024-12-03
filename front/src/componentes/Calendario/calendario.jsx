import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Navbar from "../Navbar/Navbar";

const Calendario = () => {
  const [events, setEvents] = useState([
    { title: "Partido de fútbol", start: "2024-11-01", end: "2024-11-01" },
    { title: "Evento comunitario", start: "2024-12-05", end: "2024-11-05" },
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Introduce el título del evento:");
    if (title) {
      setEvents([...events, { title, start: info.dateStr }]);
    }
  };

  return (
    <div>
    <Navbar />
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
      editable={true}
    />
    </div>
  );
};

export default Calendario;
