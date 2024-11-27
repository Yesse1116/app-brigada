import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer'
import Navbar from './componentes/Navbar/Navbar'
import './App.css'

function App() {

  return (
    
    <Router>
      <div className="container">
        <Header />
        <Navbar /> 
        <main>
          <Routes>
          <Route path="/"/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  
  )
}

export default App
