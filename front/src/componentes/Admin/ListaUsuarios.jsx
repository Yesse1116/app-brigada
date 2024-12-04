import React, { useEffect, useState } from 'react';
import api from '../api/api';
import UserRoleForm from './UserRoleForm';

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                await api.get('/admin/usuarios', { withCredentials: true });
                setUsuarios(response.data.data);
            } catch (err) {
                setError('Error al cargar los usuarios.');
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario._id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.rol}</td>
                            <td>
                                <UserRoleForm usuario={usuario} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaUsuarios;
