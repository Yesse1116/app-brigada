import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './componentes/Footer/Footer'
import Sesion from './componentes/Sesion/sesion';
import './App.css'
import Calendario from './componentes/Calendario/calendario';
import Login from './componentes/Auth/Login';
import Register from './componentes/Auth/Register';
import { AuthProvider } from './componentes/Auth/authContext';
import { Navigate } from 'react-router-dom';


function App() {

  return (
    <AuthProvider>
    <Router>
      <div className="container">
        <main>
          <Routes>
            <Route path='/'element= {<Navigate to="/auth/login" />}/>
            <Route path="/auth/login" element={<Login />}/>
            <Route path='/sesion'element= {<Sesion />}/>
            <Route path='/auth/register'element= {<Register />}/>
            <Route path='/calendario' element={<Calendario />}/>
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </AuthProvider>
  )
}

export default App
