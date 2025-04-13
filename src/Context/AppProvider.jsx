import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react';
import { CgSmartHomeBoiler } from 'react-icons/cg';
export const AppContext = createContext();
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';



function AppProvider({ children }) {
    const [usuarioLogueado, setUsuarioLogueado] = useState("");
    const [idUsuarioLogueado, setIdUsuarioLogueado] = useState(() => JSON.parse(localStorage.getItem('idUsuario')))
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const navigate=useNavigate();

    function login(datosUsuario, token) {
        setIdUsuarioLogueado(datosUsuario.id);
        setUsuarioLogueado(datosUsuario);
        setToken(token);
        localStorage.setItem('idUsuario', datosUsuario.id);
        localStorage.setItem('token', token);
    };

    function logout(){
        setIdUsuarioLogueado("");
        setUsuarioLogueado("");
        setToken("");
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('token');
        navigate("/inicioSesion");
    }


    useEffect(() => {
        if (idUsuarioLogueado) {
            cargarUsuario();
        }
    }, [idUsuarioLogueado]);

    async function cargarUsuario() {
        try {
            let respuesta = await fetch(`${API_URL}/usuarios/${idUsuarioLogueado}`);
            if (!respuesta === 'OK') {
                console.log("Error al cargar usuario registrado");
            } else {
                let data = await respuesta.json();
                setUsuarioLogueado(data.data);
            }
        } catch (error) {
            console.error("Error usuarios:", error);
        }
    }

    return (
        <AppContext.Provider value={{
            usuarioLogueado, setUsuarioLogueado, login, token, logout
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider