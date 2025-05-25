import { React, useContext, useEffect, useMemo } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useState, useRef } from "react";
import { RegContext } from "../Context/RegProvider";
import { API_URL } from "../App";
import SpinnerWave from "./SpinnerWave";
import { useNavigate } from "react-router-dom";

function Mapa() {
    const { usuarioLogueado, token } = useContext(RegContext);
    const [cargando, setCargando] = useState(true);
    const [hovered, setHovered] = useState(null);
    const [eventosUsuario, setEventosUsuario] = useState({});
    const timeoutRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        cargarEventosUsuario();
    }, [usuarioLogueado])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const center = useMemo(() => ({
        lat: Number(usuarioLogueado.latitud_domicilio),
        lng: Number(usuarioLogueado.longitud_domicilio),
    }), [usuarioLogueado]);

    async function cargarEventosUsuario() {
        let response = await fetch(`${API_URL}/eventosUsuario/${usuarioLogueado.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.log("Error al cargar eventos de usuario")
        } else {
            let data = await response.json();
            setEventosUsuario(data.data);
            setCargando(false)
        }
    }

    function handleMouseOver(id) {
        clearTimeout(timeoutRef.current);
        setHovered(id);
    };

    function handleMouseOut() {
        timeoutRef.current = setTimeout(() => {
            setHovered(null);
        }, 200);
    };


    if (cargando) {

        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }

    return (
        <GoogleMap
            mapContainerStyle={{
                width: "100%",
                height: "100vh",
            }}
            center={center}
            zoom={10}
            mapTypeId="satellite"
            options={{
                mapTypeId: "satellite",
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
                styles: [
                    {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{ visibility: "off" }],
                    },
                    {
                        featureType: "transit",
                        elementType: "all",
                        stylers: [{ visibility: "off" }],
                    },
                ],
            }}

        >
            {eventosUsuario.eventos_pasados.map((evento) => (
                <Marker
                    key={evento.id}
                    position={{ lat: Number(evento.latitud), lng: Number(evento.longitud) }}
                    onMouseOver={() => handleMouseOver(evento.id)}
                    onMouseOut={handleMouseOut}
                    onClick={() => navigate(`/detalleEvento/${evento.id}`)}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}

                >
                    {hovered === evento.id && (
                        <InfoWindow
                            position={{ lat: Number(evento.latitud), lng: Number(evento.longitud) }}
                            onCloseClick={() => setHovered(null)}
                        >
                            <div>
                                <h5>{evento.nombre}</h5>
                                <p>{new Date(evento.fecha).toLocaleDateString()}</p>
                            </div>

                        </InfoWindow>
                    )}
                </Marker>
            ))}
            {eventosUsuario.eventos_futuros.map((evento) => (
                <Marker
                    key={evento.id}
                    position={{ lat: Number(evento.latitud), lng: Number(evento.longitud) }}
                    onMouseOver={() => handleMouseOver(evento.id)}
                    onMouseOut={handleMouseOut}
                    onClick={() => navigate(`/detalleEvento/${evento.id}`)}
                    icon={{
                        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}


                >
                    {hovered === evento.id && (
                        <InfoWindow
                            position={{ lat: Number(evento.latitud), lng: Number(evento.longitud) }}
                            onCloseClick={() => setHovered(null)}
                        >
                            <div>
                                <h5>{evento.nombre}</h5>
                                <p>{new Date(evento.fecha).toLocaleDateString()}</p>
                            </div>

                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>

    );
};

export default Mapa;
