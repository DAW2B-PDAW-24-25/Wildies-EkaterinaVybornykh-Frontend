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
    const [idUsuario, setIdUsuario] = useState("");    // otro usuario
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [usuarios, setUsuarios] = useState([]);     //otros usuarios
    const [eventos, setEventos] = useState([]);
    const [deportes, setDeportes] = useState([]);
    const navigate = useNavigate();

    function login(datosUsuario, token) {
        setIdUsuarioLogueado(datosUsuario.id);
        setUsuarioLogueado(datosUsuario);
        setToken(token);
        localStorage.setItem('idUsuario', datosUsuario.id);
        localStorage.setItem('token', token);
    };

    function logout() {
        setIdUsuarioLogueado("");
        setUsuarioLogueado("");
        setToken("");
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('token');
        navigate("/inicioSesion");
    }


    /*     useEffect(() => {
            if (idUsuarioLogueado) {
                cargarUsuario();
            }
        }, [idUsuarioLogueado]); */

    useEffect(() => {
        cargarUsuarioLogueado();
    }, []);

    useEffect(() => {
        cargarDeportes();
    }, [])

    useEffect(() => {
        cargarEventosInicio();
    }, []);

    async function cargarDeportes() {
        try {
            let response = await fetch(`${API_URL}/deportes`);
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }
            let data = await response.json();
            setDeportes(data)
        }
        catch (error) {
            console.error("Error usuarios:", error);
        }
    }

    useEffect(()=>{
        console.log(deportes)
    }, [deportes])


    async function cargarUsuarioLogueado() {             // TODO pasar al formulario de login
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

    async function cargarUsuariosInicio() {
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
    async function cargarEventosInicio() {
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

    async function cargarUsuario() {
        try {
            let respuesta = await fetch(`${API_URL}/usuarios/${idUsuarioLogueado}`);
            if (!respuesta.ok) {
                console.log("Error al cargar usuario registrado");
            } else {
                let data = await respuesta.json();
                setUsuarioLogueado(data.data);
            }
        } catch (error) {
            console.error("Error usuarios:", error);
        }
    }

    async function cargarUsuariosCerca() {
        try {
            let response = await fetch(`${API_URL}/usuarios/usuariosCerca/1`);        //todo cambiar 1 por usuarioLogeado.id

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            setUsuarios(data.data);

        } catch (error) {
            console.error("Error usuarios:", error);
        }
    }

    async function cargarEventosCerca() {
        try {
            let response = await fetch(`${API_URL}/eventos/eventosCerca/1`);     //todo cambiar 1 por usuarioLogeado.id

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
        <AppContext.Provider value={{
            usuarioLogueado,
            setUsuarioLogueado,
            login,
            token,
            logout,
            cargarUsuariosInicio,
            cargarEventosInicio,
            cargarUsuariosCerca,
            cargarEventosCerca,
            usuarios,
            setUsuarios,
            eventos,
            setEventos,
            deportes
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider