import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import './App.scss'
import Footer from './Footer'
import Inicio from './Components/Inicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppProvider from './Context/AppProvider';
import Perfil from './Components/Perfil';
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
    <AppProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div className='d-flex'>
            <Navbar />
            <div className="main w-100">
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/perfil/:idUsuario" element={<Perfil />} />
                <Route path="/detalleEvento/:idEvento" />
              </Routes>
              <Footer />
            </div>

          </div>


        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>

  )
}

export default App
