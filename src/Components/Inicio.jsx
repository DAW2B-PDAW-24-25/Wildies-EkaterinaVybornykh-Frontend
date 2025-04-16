import React, { useEffect, useState } from 'react'
import UsuariosInicio from './UsuariosInicio';
import { API_URL } from '../App.jsx'
import EventosInicio from './EventosInicio.jsx';
import Buscador from './Buscador.jsx';
import { AppContext } from '../Context/AppProvider.jsx';
import { useContext } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Inicio() {

    const { usuarioLogueado, eventos, cargarUsuariosCerca, cargarUsuariosInicio } = useContext(AppContext);
    let navigate = useNavigate();
    //const [usuarios, setUsuarios] = useState([]);
    // const [eventos, setEventos] = useState([]);

  /*   useEffect(() => {
        cargarUsuariosInicio();
    }, []) */

  /*   async function handleUsuarios() {
        await cargarUsuariosCerca();
        navigate(`/resultadosUsuarios/${usuarioLogueado.id}`);
    } */


    return (

        <div className='container-fluid mt-3'>
            <div className='col-md-8 mx-auto'>
                <Buscador />
            </div>

            <div className='bg-seccion p-3 rounded shadow d-flex ms-3 me-3 flex-column' >
                <UsuariosInicio />
                <Link to={`/resultadosUsuarios/${usuarioLogueado.id}`} className='text-decoration-none'>Descubrir mas...</Link>
            </div>
            <div className='bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-5'>
                <EventosInicio eventos={eventos} />
            </div>
        </div>
    )
}

export default Inicio