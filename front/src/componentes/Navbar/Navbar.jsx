import './navbar.css'; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../Auth/authContext';

function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate(); 

    const handleLogout = () => {
        logout();
        alert('Sesión cerrada');
        navigate('/auth/login');
    };

    return (
        <nav className='nav'>
            <ul>
                <li><Link to="/sesion">Inicio</Link></li>
                <li><Link to="/calendario">Fechas Importantes</Link></li>
                <li><Link to="/auth/login" onClick={handleLogout}> Cerrar Sesion</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;