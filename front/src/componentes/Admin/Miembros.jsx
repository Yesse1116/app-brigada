import React, { useState, useEffect } from "react";
import api from "../api/api";

const Miembros = () => {
  const [miembros, setMiembros] = useState([]);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [mensaje, setMensaje] = useState({ success: "", error: "" });

  // Cargar lista de miembros al cargar el componente
  useEffect(() => {
    const fetchMiembros = async () => {
      try {
        const response = await api.get("/miembros");
        setMiembros(response.data.data);
      } catch (err) {
        console.error("Error al cargar los miembros:", err);
      }
    };

    fetchMiembros();
  }, []);

  // Crear un nuevo miembro
  const handleCrearMiembro = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/miembros", {
        nombre,
        correo,
        fechaNacimiento,
      });
      setMiembros([...miembros, response.data.data]); // Agregar el nuevo miembro a la lista
      setMensaje({ success: "Miembro creado exitosamente.", error: "" });
      setNombre("");
      setCorreo("");
      setFechaNacimiento("");
    } catch (err) {
      setMensaje({ success: "", error: err.response?.data?.message || "Error al crear el miembro." });
    }
  };

  // Eliminar miembro
  const handleEliminarMiembro = async (id) => {
    try {
      await api.delete(`/miembros/${id}`);
      setMiembros(miembros.filter((miembro) => miembro._id !== id)); // Eliminar de la lista local
      setMensaje({ success: "Miembro eliminado exitosamente.", error: "" });
    } catch (err) {
      setMensaje({ success: "", error: "Error al eliminar el miembro." });
    }
  };

  return (
    <div>
      <h1>Lista de Miembros</h1>

      {/* Mensajes */}
      {mensaje.error && <p style={{ color: "red" }}>{mensaje.error}</p>}
      {mensaje.success && <p style={{ color: "green" }}>{mensaje.success}</p>}

      {/* Formulario para agregar un miembro */}
      <form onSubmit={handleCrearMiembro}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <label>
          Correo:
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </label>
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </label>
        <button type="submit">Agregar Miembro</button>
      </form>

      {/* Tabla de miembros */}
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {miembros.map((miembro) => (
            <tr key={miembro._id}>
              <td>{miembro.nombre}</td>
              <td>{miembro.correo}</td>
              <td>{new Date(miembro.fechaNacimiento).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEliminarMiembro(miembro._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Miembros;
