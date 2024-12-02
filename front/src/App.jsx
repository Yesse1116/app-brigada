import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer'
import Navbar from './componentes/Navbar/Navbar'
import Seccion from './componentes/Seccion/seccion';
import './App.css'
import Calendario from './componentes/Calendario/calendario';
import Login from './componentes/Auth/Login';
import Register from './componentes/Auth/Register';

function App() {

  return (
    
    <Router>
      <div className="container">
        <Header />
        <Navbar /> 
        <main>
          <Routes>
            <Route path='/login'element= {<Login />}/>
            <Route path='/register'element= {<Register />}/>
          <Route path="/" element={<Seccion />}/>
          <Route path='/calendario' element={<Calendario />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  
  )
}

export default App
