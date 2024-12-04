import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/authContext';

const ProtectedRoute = ({ children, adminOnly }) => {
    const { user } = useAuth();

    console.log("Usuario actual en ProtectedRoute:", user); // Depuración

    if (!user) {
        return <Navigate to="/auth/login" />;
    }

    if (adminOnly && user.rol !== 'administrador') {
        console.log("Acceso denegado: Rol insuficiente"); // Depuración
        return <Navigate to="/no-autorizado" />;
    }

    return children;
};


export default ProtectedRoute;
