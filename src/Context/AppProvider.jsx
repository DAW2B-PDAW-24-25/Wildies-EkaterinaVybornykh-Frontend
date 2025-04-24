import React, { useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react';
import { CgSmartHomeBoiler } from 'react-icons/cg';
export const AppContext = createContext();
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';



function AppProvider({ children }) {
    const [usuarioLogueado, setUsuarioLogueado] = useState("");
    const [idUsuarioLogueado, setIdUsuarioLogueado] = useState(() => JSON.parse(localStorage.getItem('idUsuario')));
    const [idPerfil, setIdPerfil] = useState("");
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [wildies, setWildies] = useState([]);     //otros usuarios
   const [wildie, setWildie]=useState([]);
    const [eventos, setEventos] = useState([]);
    const [evento, setEvento] = useState({});
    const [deportes, setDeportes] = useState([]);
    const [tipoUsuarios, setTipoUsuarios] = useState("inicio");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});          //filtro usuario, eventos //todo cuidad con usar en otros sitios
    const [opcion, setOpcion] = useState("");
    const [ageDisabled, setAgeDisabled] = useState(false);
    const [tipoEventos, setTipoEventos] = useState("inicio");
    const [accionEvento, setAccionEvento]=useState("");


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


   

    useEffect(() => {
        cargarUsuarioLogueado();
    }, []);

    useEffect(() => {
        cargarDeportes();
    }, [])

    useEffect(() => {
        cargarEventosInicio();
    }, []);

    useEffect(() => {
        cargarUsuariosInicio();
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
            setWildies(data.data);

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
          
            setWildies(data.data);

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

    async function aplicarFiltros() {
        const { localidad, ...datos } = formData;
        let response = "";
        if (opcion === "wildies") {
            response = await fetch(`${API_URL}/usuariosFiltrados/${usuarioLogueado.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            });
        } else {
            response = await fetch(`${API_URL}/eventosFiltrados/${usuarioLogueado.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            });
        }

        if (!response.ok) {
            console.log("Error al recibir usuarios filtrados");
            setTipoModal("error");
            setModalHeader("Ha ocurrido un error");
            setShow(true);

        } else {
            const data = await response.json();
            if (opcion === "wildies") {
                setWildies(data.data)
            } else {
                setEventos(data.data)
            }
        }
        setAgeDisabled(false);
        setOpcion("");
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
            wildies,
            setWildies,
            eventos,
            setEventos,
            deportes,
            tipoUsuarios,
            setTipoUsuarios,
            aplicarFiltros,
            formData,
            setFormData,
            opcion,
            setOpcion,
            ageDisabled,
            setAgeDisabled,
            idPerfil,
            setIdPerfil,
            tipoEventos,
            setTipoEventos,
            evento,
            setEvento,
            wildie,
            setWildie,
            accionEvento,
            setAccionEvento
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider