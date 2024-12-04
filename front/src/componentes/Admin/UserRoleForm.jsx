import React, { useState } from 'react';
import api from '../api/api';

const UserRoleForm = ({ usuario }) => {
    const [nuevoRol, setNuevoRol] = useState(usuario.rol);
    const [mensaje, setMensaje] = useState(null);

    const cambiarRol = async (e) => {
        e.preventDefault();
        try {
            await api.post(
                `/admin/usuarios/cambiar-rol/${usuario._id}`,
                { nuevoRol },
                { withCredentials: true }
            );
            setMensaje(response.data.message);
        } catch (err) {
            setMensaje('Error al actualizar el rol.');
        }
    };

    return (
        <form onSubmit={cambiarRol}>
            <select value={nuevoRol} onChange={(e) => setNuevoRol(e.target.value)}>
                <option value="normal">Usuario</option>
                <option value="administrador">Administrador</option>
            </select>
            <button type="submit">Cambiar</button>
            {mensaje && <p>{mensaje}</p>}
        </form>
    );
};

export default UserRoleForm;
