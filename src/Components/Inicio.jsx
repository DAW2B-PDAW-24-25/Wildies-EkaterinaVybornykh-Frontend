import React, { useEffect } from 'react'
import UsuariosInicio from './UsuariosInicio';
import { API_URL } from '../App.jsx'
import EventosInicio from './EventosInicio.jsx';
import Buscador from './Buscador.jsx';
import { AppContext } from '../Context/AppProvider.jsx';
import { useContext, useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SpinnerWave from './SpinnerWave.jsx';
import { RegContext } from '../Context/RegProvider';

function Inicio() {

    const { eventos, setTipoUsuarios, setTipoEventos, cargarEventosCerca, cargarUsuariosCerca, wildies } = useContext(AppContext);
    const { usuarioLogueado } = useContext(RegContext);
    let navigate = useNavigate();
    const [cargando, setCargando] = useState(false);

    async function handleUsuarios() {
        window.scrollTo(0, 0);
        setCargando(true);
        setTipoUsuarios("cerca")
        await cargarUsuariosCerca();
        setCargando(false);
        navigate(`/resultadosUsuarios/${usuarioLogueado.id}`);
    }

    async function handleEventos() {
        window.scrollTo(0, 0);
        setCargando(true);
        setTipoEventos("cerca")
        await cargarEventosCerca();
        setCargando(false);
        navigate(`/resultadosEventos/${usuarioLogueado.id}`);
    }

    if (cargando) {

        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }

    return (

        <div className='container-fluid mt-3 min-vh-100'>
           {/*  <div className='col-md-8 mx-auto'>
                <Buscador />
            </div> */}

            <div className='bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mb-4 flex-column'>
                <UsuariosInicio />
                <Button variant="link" className='boton-link d-flex' onClick={handleUsuarios}>Descubrir mas...</Button>
            </div>
            <div className='bg-seccion p-3 rounded shadow d-flex ms-3 me-3 flex-column'>
                <EventosInicio />
                <Button variant="link" className='boton-link d-flex' onClick={handleEventos}>Descubrir mas...</Button>
            </div>
        </div>
    )
}

export default Inicio