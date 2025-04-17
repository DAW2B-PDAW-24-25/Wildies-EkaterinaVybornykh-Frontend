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

function Inicio() {

    const { usuarioLogueado, eventos, setTipoUsuarios, setTipoEventos } = useContext(AppContext);
    let navigate = useNavigate();

    async function handleUsuarios() {
        setTipoUsuarios("cerca")
        navigate(`/resultadosUsuarios/${usuarioLogueado.id}`);
    }

    async function handleEventos() {
        setTipoEventos("cerca")
        navigate(`/resultadosEventos/${usuarioLogueado.id}`);
    }

    return (

        <div className='container-fluid mt-3'>
            <div className='col-md-8 mx-auto'>
                <Buscador />
            </div>

            <div className='bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mb-4 flex-column' >
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