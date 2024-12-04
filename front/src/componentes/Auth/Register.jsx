import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../api/api'
import './register.css';

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await api.post("/auth/register", 
        {nombre,correo,contraseña,fechaNacimiento,});
      alert("Registro exitoso");
      navigate("/auth/login"); // Redirige al login después del registro
    } catch (error) {
      alert( "Error al registrarse"+ error.response.data);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
        </div>
        <div>
          <label>Correo Electrónico:</label>
          <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required/>
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required/>
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required/>
        </div>
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? <a href="/auth/login">Inicia sesión aquí</a>.</p>
    </div>
  );
};

export default Register;
