import './navbar.css'
import { Link } from "react-router-dom";
function Navbar (){
    return(
        <nav className='nav'>
            <ul>
                <li><Link to= "/"> Inicio</Link></li>
                <li><Link to= "/calendario">Fechas Importantes</Link></li>
            </ul>
        </nav>
    )
}
export default Navbar