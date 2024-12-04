import { useEffect, useState } from 'react';
import axios from 'axios';

const MiembrosAdmin = () => {
    const [miembros, setMiembros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMiembros = async () => {
            try {
                const response = await axios.get('/api/miembros', {
                    withCredentials: true, // Para manejar sesiones
                });
                setMiembros(response.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error al cargar los miembros');
            } finally {
                setLoading(false);
            }
        };
        fetchMiembros();
    }, []);

    const eliminarMiembro = async (id) => {
        try {
            await axios.delete(`/api/miembros/${id}`, { withCredentials: true });
            setMiembros(miembros.filter((miembro) => miembro._id !== id));
        } catch (err) {
            console.error('Error al eliminar miembro:', err);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Administrar Miembros</h1>
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
                                <button onClick={() => eliminarMiembro(miembro._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MiembrosAdmin;
