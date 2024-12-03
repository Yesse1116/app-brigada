import './navbar.css'
import { Link } from "react-router-dom";
import {useAuth} from '../Auth/authContext'
function Navbar (){
    const {logout} = useAuth;
    const handleLogout= ()=>{
      logout()
      alert ('Sesion cerrada')
    }
    return(
        <nav className='nav'>
            <ul>
                <li><Link to= "/sesion"> Inicio</Link></li>
                <li><Link to= "/calendario">Fechas Importantes</Link></li>
                <li><Link onClick={handleLogout}> Cerrar Sesion</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar