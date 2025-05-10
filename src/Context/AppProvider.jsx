import React, { useContext, useEffect } from 'react'
import { createContext } from 'react'
import { useState } from 'react';
import { CgSmartHomeBoiler } from 'react-icons/cg';
export const AppContext = createContext();
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';
import { RegContext } from './RegProvider';



function AppProvider({ children }) {
    const { usuarioLogueado, setUsuarioLogueado, token } = useContext(RegContext);
    const [idPerfil, setIdPerfil] = useState("");
    const [wildies, setWildies] = useState([]);     //otros usuarios
    const [wildie, setWildie] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [evento, setEvento] = useState({});
    const [tipoUsuarios, setTipoUsuarios] = useState("inicio");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});          //filtro usuario, eventos: cuidado con usar en otros sitios
    const [opcion, setOpcion] = useState("");
    const [ageDisabled, setAgeDisabled] = useState(false);
    const [tipoEventos, setTipoEventos] = useState("inicio");
    const [accionEvento, setAccionEvento] = useState("");
    const [amistades, setAmistades] = useState({});

    useEffect(() => {
        if (usuarioLogueado) {
            cargarEventosInicio();

        }
    }, [usuarioLogueado]);

    useEffect(() => {
        if (usuarioLogueado) {
            cargarUsuariosInicio();
        }

    }, [usuarioLogueado]);

    useEffect(() => {
        if (usuarioLogueado) {
            cargarAmistades();
            const intervalId = setInterval(cargarAmistades, 10000);
            return () => clearInterval(intervalId);
        }

    }, [usuarioLogueado])

    useEffect(() => {
        console.log("Amistades: ", amistades)
    }, [amistades])

    async function cargarAmistades() {
        let response = await fetch(`${API_URL}/amistades/${usuarioLogueado.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.log("Error al cargar amistades")
        } else {
            let data = await response.json();
            setAmistades(data);
        }
    }

    async function cargarUsuariosInicio() {
        try {
            let response = await fetch(`${API_URL}/usuarios/usuariosCercaConLimite/${usuarioLogueado.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

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
            let response = await fetch(`${API_URL}/eventos/eventosCercaConLimite/${usuarioLogueado.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }

            let data = await response.json();
            setEventos(data.data);

        } catch (error) {
            console.error("Error usuarios:", error);
        }
    }

    async function cargarUsuariosCerca() {

        try {
            let response = await fetch(`${API_URL}/usuarios/usuariosCerca/${usuarioLogueado.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            } else {
                let data = await response.json();

                setWildies(data.data);

            }


        } catch (error) {
            console.error("Error usuarios:", error);
        }
    }

    async function cargarEventosCerca() {
        try {
            let response = await fetch(`${API_URL}/eventos/eventosCerca/${usuarioLogueado.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            } else {
                let data = await response.json();
                setEventos(data.data);
            }


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
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(datos)
            });
        } else {
            response = await fetch(`${API_URL}/eventosFiltrados/${usuarioLogueado.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
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

    async function cancelarPremium() {

        let response = await fetch(`${API_URL}/usuarios/cancelarPremium/${usuarioLogueado.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return false;

        } else {
            let data = await response.json();
            setUsuarioLogueado(data.data);
            return true;
        }
    }



    return (
        <AppContext.Provider value={{
            cargarUsuariosInicio,
            cargarEventosInicio,
            cargarUsuariosCerca,
            cargarEventosCerca,
            wildies,
            setWildies,
            eventos,
            setEventos,
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
            setAccionEvento,
            amistades,
            setAmistades,
            cancelarPremium
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider