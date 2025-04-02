import React, { useEffect, useState } from 'react'
import UsuariosInicio from './UsuariosInicio';
import {API_URL} from './App.jsx';

function Inicio() {

    const [usuario, setUsuario] = useState(1);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    async function cargarUsuarios() {
        try {
            let response = await fetch(`${API_URL}/api/usuarios/usuariosCerca/${usuario}`);

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            setUsuarios(data);

        } catch (error) {
            console.error("Error usuarios:", error);
        }
    }


    return (
        <div className='container m-3'>
            <UsuariosInicio usuarios={usuarios}/>

        </div>
    )
}

export default Inicio