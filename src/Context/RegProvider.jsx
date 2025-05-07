import React, { useState, useEffect } from 'react'
import { createContext } from 'react';
export const RegContext = createContext();
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';

function RegProvider({ children, setHayToken }) {
    const [deportes, setDeportes] = useState([]);
    const [usuarioLogueado, setUsuarioLogueado] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        cargarDeportes();
    }, [])

    useEffect(() => {
        if (localStorage.getItem("idWildie") && localStorage.getItem("tokenWildie")) {
            cargarUsuarioLogueado();
        }
    }, []);

    useEffect(() => {
        if (usuarioLogueado) {
            navigate('/');
        }
    }, [usuarioLogueado])

    useEffect(() => {
        console.log(usuarioLogueado)
    }, [usuarioLogueado])

    function login(datosUsuario, token) {
        setUsuarioLogueado(datosUsuario);
        setToken(token);
        localStorage.setItem('idWildie', datosUsuario.id);
        localStorage.setItem('tokenWildie', token);
        setHayToken(true);
        navigate("/");
    };

    function logout() {
        setUsuarioLogueado("");
        setToken("");
        localStorage.removeItem('idWildie');
        localStorage.removeItem('tokenWildie');
        setHayToken(false);
        navigate("/inicioSesion");
    }

    async function cargarUsuarioLogueado() {
        let idLogueado = localStorage.getItem("idWildie");
        let token = localStorage.getItem("tokenWildie")
        try {
            let response = await fetch(`${API_URL}/usuarios/${idLogueado}`);
            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }
            let data = await response.json();
            setUsuarioLogueado(data.data);
            setToken(token)
        }
        catch (error) {
            console.error("Error usuarios:", error);
        }
    }

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
    return (
        <RegContext.Provider
            value={{
                deportes,
                usuarioLogueado,
                setUsuarioLogueado,
                token,
                setToken,
                login,
                logout
            }}
        >
            {children}
        </RegContext.Provider>
    )
}

export default RegProvider