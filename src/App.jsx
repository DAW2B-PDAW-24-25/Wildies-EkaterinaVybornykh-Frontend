import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppNavbar from './AppNavbar'
import './App.scss'
import Footer from './Footer'
import Inicio from './Components/Inicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppProvider from './Context/AppProvider';
import Perfil from './Components/Perfil';
import ActualizarPerfil from './Components/ActualizarPerfil';
import InicioSesion from './Components/InicioSesion';
import DeportesUsuario from './Components/DeportesUsuario';
export const API_URL = import.meta.env.VITE_BACKEND_URL;
export const GOOGLE_API_KEY = "AIzaSyBLNBtVh6RVdXhPX2mPA5hQct1zv_axmkY";




function App() {

  const theme = createTheme({
    typography: {
      fontFamily: '$font-text',
    },
    palette: {
      text: {
        primary: '$text-color'
      },
    },
  });

  return (
    <BrowserRouter>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <div className='d-flex'>
            <AppNavbar />
            <div className="main w-100">
              <Routes>
                <Route path='/inicioSesion' element={<InicioSesion />} />
                <Route path="/" element={<Inicio />} />
                <Route path="/perfil/:idUsuario" element={<Perfil />} />
                <Route path='/editarPerfil/:idUsuario' element={<ActualizarPerfil />} />
                <Route path="/detalleEvento/:idEvento" />
                <Route path='/deportesUsuario/:idUsuario' element={<DeportesUsuario/>}/>
              </Routes>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </AppProvider>
    </BrowserRouter>

  )
}

export default App
