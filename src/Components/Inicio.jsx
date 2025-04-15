import React, { useEffect, useState } from 'react'
import UsuariosInicio from './UsuariosInicio';
import { API_URL } from '../App.jsx'
import EventosInicio from './EventosInicio.jsx';
import Buscador from './Buscador.jsx';
import { AppContext } from '../Context/AppProvider.jsx';
import { useContext } from 'react';
import { BiLogIn } from 'react-icons/bi';

function Inicio() {

    const { usuarioLogueado, login } = useContext(AppContext);
    const [usuarios, setUsuarios] = useState([]);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        cargarUsuario();
    }, []);

    useEffect(() => {
        cargarUsuarios();
    }, []);
    useEffect(() => {
        cargarEventos();
    }, []);

    async function cargarUsuario() {             // TODO pasar al formulario de login
        try {
            let response = await fetch(`${API_URL}/usuarios/1`);
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }
            let data = await response.json();
            let usuario = await data.data;
            login(usuario, "123");
        }
        catch (error) {
            console.error("Error usuarios:", error);
        }
    }

    async function cargarUsuarios() {
        try {
            let response = await fetch(`${API_URL}/usuarios/usuariosCercaConLimite/1`);        //todo cambiar 1 por usuarioLogeado.id

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            setUsuarios(data.data);

        } catch (error) {
            console.error("Error usuarios:", error);
        }
    }
    async function cargarEventos() {
        try {
            let response = await fetch(`${API_URL}/eventos/eventosCercaConLimite/1`);     //todo cambiar 1 por usuarioLogeado.id

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            setEventos(data.data);

        } catch (error) {
            console.error("Error usuarios:", error);
        }
    }


    return (

        <div className='container-fluid mt-3'>
            <div className='col-md-8 mx-auto'>
                <Buscador />
            </div>

            <div className='bg-seccion p-3 rounded shadow d-flex ms-3 me-3'>
                <UsuariosInicio usuarios={usuarios} />
            </div>
            <div className='bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-5'>
                <EventosInicio eventos={eventos} />
            </div>
        </div>
    )
}

export default Inicio