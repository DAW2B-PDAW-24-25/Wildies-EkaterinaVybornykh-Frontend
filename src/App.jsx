import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import './styles/App.scss'
import Footer from './Footer'
import Inicio from './Components/Inicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppProvider from './Context/AppProvider';
import Perfil from './Components/Perfil';
import ActualizarPerfil from './Components/ActualizarPerfil';
import InicioSesion from './Components/InicioSesion';
import DeportesUsuario from './Components/DeportesUsuario';
import ResultadosUsuarios from './Components/ResultadosUsuarios';
export const API_URL = import.meta.env.VITE_BACKEND_URL;
import { GOOGLE_LIBRARIES } from './config';
export const GOOGLE_API_KEY = "AIzaSyBLNBtVh6RVdXhPX2mPA5hQct1zv_axmkY";
import UsuariosInicio from './Components/UsuariosInicio';
import ResultadosEventos from './Components/ResultadosEventos';
import DetalleEvento from './Components/DetalleEvento';
import EventoForm from './Components/EventoForm';
import Mapa from './Components/Mapa';
import { LoadScript } from '@react-google-maps/api';
import ProximosEventos from './Components/ProximosEventos';
import AppSidebar from './AppSidebar';
import AppNavbar from './AppNavbar';
import MisWildies from './Components/MisWildies';
import { useEffect, useState } from 'react';
import RegProvider from './Context/RegProvider';
import Premium from './Components/Premium';
import GestionUsuarios from './Components/GestionUsuarios';
import GestionEventos from './Components/GestionEventos';
import GestionDeportes from './Components/GestionDeportes';
import About from './Components/About';
import Contact from './Components/Contact';
import RutasProtegidas from './Components/RutasProtegidas';
const libraries = ["places"];


function App() {

  const [hayToken, setHayToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('idWildie') && localStorage.getItem('tokenWildie')) {
      setHayToken(true);
    }
  }, [])

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
    <LoadScript
      googleMapsApiKey={GOOGLE_API_KEY}
      language="es"
      libraries={GOOGLE_LIBRARIES}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <RegProvider setHayToken={setHayToken}>
            {
              !hayToken
                ? (<Routes>
                  <Route path="/" element={<Navigate to="/inicioSesion" />} />
                  <Route path='/inicioSesion' element={<InicioSesion />} />
                </Routes>
                )
                : (
                  <AppProvider>
                    <div className="background-image"></div>
                    <div className='d-flex'>
                      <AppSidebar />
                      <div className="main w-100">
                        <AppNavbar />
                        <RutasProtegidas />
                        <Footer />
                      </div>
                    </div>
                  </AppProvider>
                )
            }
          </RegProvider>
        </ThemeProvider>
      </BrowserRouter>
    </LoadScript>

  )
}

export default App
