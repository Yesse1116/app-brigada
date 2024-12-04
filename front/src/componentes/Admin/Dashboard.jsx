import React from "react";
import { useAuth } from "../Auth/authContext";

const Dashboard = () => {
  const { usuario, logout } = useAuth();

  if (!usuario) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {usuario.nombre}</h1>
      <p>Rol: {usuario.rol}</p>
      <ul>
        <li>
          <a href="/usuarios">Gestionar Usuarios</a>
        </li>
        <li>
          <a href="/miembros">Gestionar Miembros</a>
        </li>
      </ul>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
