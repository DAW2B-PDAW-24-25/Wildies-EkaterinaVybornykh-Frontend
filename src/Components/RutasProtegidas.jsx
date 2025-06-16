import { useContext } from "react";
import { RegContext } from "../Context/RegProvider";
import { Navigate, Route, Routes } from "react-router-dom";
import InicioSesion from "./InicioSesion";
import Inicio from "./Inicio";
import Perfil from "./Perfil";
import ActualizarPerfil from "./ActualizarPerfil";
import DetalleEvento from "./DetalleEvento";
import DeportesUsuario from './DeportesUsuario';
import ResultadosUsuarios from './ResultadosUsuarios';
import ResultadosEventos from './ResultadosEventos';
import EventoForm from './EventoForm';
import Mapa from './Mapa';
import ProximosEventos from './ProximosEventos';
import Premium from './Premium';
import GestionUsuarios from './GestionUsuarios';
import GestionEventos from './GestionEventos';
import GestionDeportes from './GestionDeportes';
import About from './About';
import Contact from './Contact';
import MisWildies from "./MisWildies";

function RutasProtegidas() {
    const { usuarioLogueado } = useContext(RegContext);
    const soyAdmin = usuarioLogueado && usuarioLogueado.roles.includes('admin');
    const soyPremium = usuarioLogueado && usuarioLogueado.roles.includes('premium');
    return (
        <Routes>
            <Route path='/inicioSesion' element={<InicioSesion />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/perfil/:id" element={<Perfil />} />
            <Route path='/editarPerfil/:id' element={<ActualizarPerfil />} />
            <Route path="/detalleEvento/:id" element={<DetalleEvento />} />
            <Route path='/deportesUsuario/:id' element={<DeportesUsuario />} />
            <Route path='/resultadosUsuarios/:id' element={<ResultadosUsuarios />} />
            <Route path='/resultadosEventos/:id' element={<ResultadosEventos />} />
            <Route path='/premium/:id' element={<Premium />} />
            <Route path='/proximosEventos/:id' element={<ProximosEventos />} />
            <Route path='/misWildies/:id' element={<MisWildies />} />
            <Route path='/crearEvento' element={soyPremium ? <EventoForm /> : <Navigate to={`/premium/${usuarioLogueado.id}`} />} />
            <Route path='/editarEvento/:id' element={soyPremium ? <EventoForm /> : <Navigate to={`/premium/${usuarioLogueado.id}`} />} />
            <Route path='/mapa/:id' element={soyPremium ? <Mapa /> : <Navigate to={`/premium/${usuarioLogueado.id}`} />} />
            <Route path='/gestionUsuarios' element={soyAdmin ? <GestionUsuarios /> : <Navigate to={`/`} />} />
            <Route path='/gestionEventos' element={soyAdmin ? <GestionEventos /> : <Navigate to={`/`} />} />
            <Route path='/gestionDeportes' element={soyAdmin ? <GestionDeportes /> : <Navigate to={`/`} />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
        </Routes>
    )
}

export default RutasProtegidas