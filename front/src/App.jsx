import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer'
import Navbar from './componentes/Navbar/Navbar'
import Seccion from './componentes/Seccion/seccion';
import './App.css'
import Carrusel from './componentes/Carrussel/carrusel';

function App() {

  return (
    
    <Router>
      <div className="container">
        <Header />
        <Navbar /> 
        <main>
          <Routes>
          <Route path="/" element={<Seccion />}/>
          <Route path='/calendario' element={<Carrusel />}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  
  )
}

export default App
