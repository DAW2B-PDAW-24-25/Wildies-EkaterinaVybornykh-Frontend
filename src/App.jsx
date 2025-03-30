import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import './App.scss'
import Footer from './Footer'




function App() {

  return (

    <BrowserRouter>
      <div className='d-flex'>
        <Navbar />
        <div className="main w-100">
          <h1>Hola</h1>
          <Routes>
            <Route path="/"/>
            <Route path="/perfil"/>
          </Routes>
          <Footer/>
        </div>
        
      </div>
      
      
    </BrowserRouter>

  )
}

export default App
