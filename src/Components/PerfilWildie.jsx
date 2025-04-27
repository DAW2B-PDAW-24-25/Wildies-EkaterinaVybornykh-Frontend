import { React, useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { BiLeaf } from "react-icons/bi";
import { GoBriefcase } from "react-icons/go";
import { LuLanguages } from "react-icons/lu";
import { Image } from "react-bootstrap"
import { AppContext } from '../Context/AppProvider';
import { API_URL } from '../App';

function PerfilWildie({ usuario }) {

    const { amistades, setAmistades, usuarioLogueado } = useContext(AppContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const tipoAmistad = getTipoAmistad();
    const idAmistad = getIdAmistad();

    console.log("id amistad: ", idAmistad)

    useEffect(() => {
        console.log("amistades en perfil: ", amistades)
    }, [])

    function getIdAmistad() {
        for (let amistad of amistades.data) {
            if (amistad.amigo_id == id) {
                return amistad.amistad_id;
            }
        }
    }

    function getTipoAmistad() {
        if (amistades && amistades.data.length !== 0) {
            for (const amistad of amistades.data) {
                if (amistad.solicitante_id == id && amistad.amigo_id == id && amistad.estado === "pendiente") {
                    return "pendienteYo";
                } else if (amistad.amigo_id == id && amistad.estado === "aceptado") {
                    return "aceptado";
                } else if (amistad.amigo_id == id && amistad.estado === "rechazado") {
                    return "rechazado";
                } else if (amistad.amigo_id == id && amistad.solicitante_id == usuarioLogueado.id && amistad.estado === "pendiente") {
                    return "pendienteAmigo";
                }
            }
        }
        return "noSolicitado";
    }



    async function handleSolicitarAmistad() {
        let data = { "amigo_id": id }
        let response = await fetch(`${API_URL}/solicitarAmistad/${usuarioLogueado.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`         //todo ACTIVAR TOKEN
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            console.log("ERror al enviar solicitud de amistad")
        } else {
            let datos = await response.json();
            setAmistades(datos);
        }
    }

    async function handleEliminarAmistad() {
        let response = await fetch(`${API_URL}/eliminarAmistad/${usuarioLogueado.id}/${idAmistad}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`         //todo ACTIVAR TOKEN
            },

        })
        if (!response.ok) {
            console.log("ERror al enviar solicitud de amistad")
        } else {
            let datos = await response.json();
            setAmistades(datos);
        }
    }

    async function handleAceptarAmistad() {
        let response = await fetch(`${API_URL}/aceptarAmistad/${usuarioLogueado.id}/${idAmistad}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`         //todo ACTIVAR TOKEN
            },

        })
        if (!response.ok) {
            console.log("ERror al enviar solicitud de amistad")
        } else {
            let datos = await response.json();
            setAmistades(datos);
        }
    }

    async function handleRechazarAmistad() {
        let response = await fetch(`${API_URL}/rechazarAmistad/${usuarioLogueado.id}/${idAmistad}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`         //todo ACTIVAR TOKEN
            },

        })
        if (!response.ok) {
            console.log("ERror al enviar solicitud de amistad")
        } else {
            let datos = await response.json();
            setAmistades(datos);
        }
    }

    return (
        <div className='container-fluid min-vh-100'>
            <div className='row m-3'>
                <div className='col-4 text-center'>
                    <Image src={usuario.foto_perfil} className='avatar_big' />
                    <p>{usuario.localidad}</p>
                </div>
                <div className='d-flex flex-column col-8 text-center justify-content-between'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className="me-2">
                            <h1 className='mt-2'>{usuario.nombre} {usuario.apellidos}</h1>
                        </div>
                        <div>
                            <Button variant="secondary" className=' me-2  shadow' onClick={() => navigate(-1)}>Volver</Button>
                        </div>
                    </div>
                    <div className='d-md-flex justify-content-around  d-none'>
                        <div className='d-flex justify-content-center mb-md-5'>
                            <Link to={`/deportesUsuario/${usuario.id}`}><Button variant="outline-secondary" className=' me-2 rounded-pill shadow'>Deportes</Button></Link>
                            <Button variant="outline-secondary" className=' me-2 rounded-pill shadow'>Fotos</Button>
                        </div>
                        <div>
                            {
                                tipoAmistad === "pendienteAmigo"
                                    ? <h5 style={{ backgroundColor: "#bfff8a" }} className='rounded-pill shadow pt-2 pb-2 ps-3 pe-3 text-center'>Pendiente</h5>
                                    : tipoAmistad === "rechazado"
                                        ? <h5 style={{ backgroundColor: "#fadbd8" }} className='rounded-pill shadow p-2 text-center'>Amistad rechazada</h5>
                                        : tipoAmistad === "aceptado"
                                            ? <div>
                                                <Button variant="outline-secondary" className=' me-2 rounded-pill shadow' onClick={handleEliminarAmistad}>Eliminar amistad</Button>
                                            </div>
                                            : tipoAmistad === "pendienteYo"
                                                ? <div className="d-flex me-2">

                                                    <Button variant="outline-secondary" className=' me-2 rounded-pill shadow' onClick={handleAceptarAmistad}>Aceptar amistad</Button>

                                                    <Button variant="outline-secondary" className=' me-2 rounded-pill shadow' onClick={handleRechazarAmistad}>Rechazar amistad</Button>

                                                </div>

                                                : <div>
                                                    <Button variant="outline-secondary" className=' me-2 rounded-pill shadow' onClick={handleSolicitarAmistad}>Solicitar amistad</Button>
                                                </div>
                            }
                        </div>

                    </div>

                </div>
            </div>
            <div className='d-md-none d-flex justify-content-around'>
                        <div className='d-flex justify-content-center mb-md-5'>
                            <Link to={`/deportesUsuario/${usuario.id}`}><Button variant="outline-secondary" className=' me-2 rounded-pill shadow'>Deportes</Button></Link>
                            <Button variant="outline-secondary" className=' me-2 rounded-pill shadow'>Fotos</Button>
                        </div>
                        <div>
                            {
                                tipoAmistad === "pendienteAmigo"
                                    ? <h5 style={{ backgroundColor: "#bfff8a" }} className='rounded-pill shadow pt-2 pb-2 ps-3 pe-3 text-center'>Pendiente</h5>
                                    : tipoAmistad === "rechazado"
                                        ? <h5 style={{ backgroundColor: "#fadbd8" }} className='rounded-pill shadow p-2 text-center'>Amistad rechazada</h5>
                                        : tipoAmistad === "aceptado"
                                            ? <div>
                                                <Button variant="outline-secondary" className=' me-2 rounded-pill shadow' onClick={handleEliminarAmistad}>Eliminar amistad</Button>
                                            </div>
                                            : tipoAmistad === "pendienteYo"
                                                ? <div className="d-flex me-2">

                                                    <Button variant="outline-secondary" className=' me-2 rounded-pill shadow' onClick={handleAceptarAmistad}>Aceptar amistad</Button>

                                                    <Button variant="outline-secondary" className=' me-2 rounded-pill shadow' onClick={handleRechazarAmistad}>Rechazar amistad</Button>

                                                </div>

                                                : <div>
                                                    <Button variant="outline-secondary" className=' me-2 rounded-pill shadow' onClick={handleSolicitarAmistad}>Solicitar amistad</Button>
                                                </div>
                            }
                        </div>

                    </div>
            <hr />
            <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3'>
                <div className='d-flex flex-column justify-content-center col-md-6'>
                    <div className='d-flex justify-content-start'>
                        <BiLeaf className='me-2' /><p><strong>Edad:</strong> {usuario.edad} años</p>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <GoBriefcase className='me-2' /><p><strong>Profesión:</strong> {usuario.profesion}</p>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <LuLanguages className='me-2' /><p><strong>Hablo:</strong> {usuario.idiomas}</p>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div>
                        {usuario.deportes.map((deporte, index) => {

                            return <p key={index}>
                                <strong>{deporte.deporte}</strong> {deporte.nivel && `: nivel ${deporte.nivel}`}
                            </p>
                        })}
                    </div>
                </div>
            </div>
            <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4'>
                <h3 className='title'>Sobre mí</h3>
                <hr />
                <div>
                    <p>{usuario.descripcion}</p>
                </div>
            </div>
            <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4 mb-5'>
                <h3 className='title'>¿Por qué estoy en wildies?</h3>
                <hr />
                <div>
                    <p>{usuario.por_que}</p>
                </div>
            </div>
        </div>
    )
}

export default PerfilWildie