import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import './App.scss'
import Footer from './Footer'
import Inicio from './Components/Inicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
export const API_URL = import.meta.env.VITE_BACKEND_URL;




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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className='d-flex'>
          <Navbar />
          <div className="main w-100">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/perfil" />
            </Routes>
            <Footer />
          </div>

        </div>


      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
