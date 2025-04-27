import React, { useContext, useEffect, useState } from 'react'
import { API_URL } from '../App';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppProvider';
import SpinnerWave from './SpinnerWave';
import { Button, Image, Modal } from 'react-bootstrap';
import default_chica from '../styles/images/profile_default_chica.png';
import default_chico from '../styles/images/profile_default_chico.png';

function DetalleEvento() {
    const { setEvento, evento, usuarioLogueado } = useContext(AppContext);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();
    const [eventoPasado, setEventoPasado] = useState(false);
    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [tipoModal, setTipoModal] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const soyCreador = evento?.creador_id === usuarioLogueado.id;
    const soyParticipante = evento?.participantes?.some((participante) => participante.id === usuarioLogueado.id) && !soyCreador;
    const sinPlazas = evento.max_participantes <= evento.total_participantes;
    const sexoIncompatible = evento.sexo_participantes !== 'indiferente' && evento.sexo_participantes !== usuarioLogueado.sexo;
    const edadIncompatible = evento.edad_min > usuarioLogueado.edad || evento.edad_max < usuarioLogueado.edad;
    const nivelIncompatible = evento.nivel > 0 && !usuarioLogueado.deportes.some(
        (deporte) => deporte.deporte_id === evento.deporte_id && deporte.nivel >= evento.nivel
    );



    useEffect(() => {
        cargarEvento();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setEventoPasado(new Date(evento.fecha) < new Date())
    }, [evento])

    async function cargarEvento() {
        setCargando(true);
        const response = await fetch(`${API_URL}/eventos/${id}`);
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
        }
        let data = await response.json();
        setEvento(data.data);
        setCargando(false);
    }

    async function handleParticipar() {
        const response = await fetch(`${API_URL}/participar/${id}/${usuarioLogueado.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`         //todo ACTIVAR TOKEN
            }
        })
        if (!response.ok) {
            setMensaje("Ha ocurrido un error");
            setShow(true);
        } else {
            const data = await response.json();
            setEvento(data.data);
            setMensaje("¡Preparate para tu próxima aventura!");
            setShow(true);
        }
    }

    async function handleDesapuntarse() {
        const response = await fetch(`${API_URL}/desapuntarse/${id}/${usuarioLogueado.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`         //todo ACTIVAR TOKEN
            }
        })
        if (!response.ok) {
            setMensaje("Ha ocurrido un error");
            setShow(true);
        } else {
            const data = await response.json();
            setEvento(data.data);
            setMensaje("Ya no eres participante del evento");
            setShow(true);
        }
    }

    function handleEditar() {
        navigate(`/editarEvento/${id}`)
    }

    async function handleEliminar() {
        let response = await fetch(`${API_URL}/eventos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${token}`         //todo ACTIVAR TOKEN
            }
        });
        if (!response.ok) {
            setMensaje("Ha ocurrido un error");
            setShow(true);
        } else {
            setTipoModal("eliminar");
            setMensaje("Evento eliminado con exito");
            setShow(true);
        }
    }

    function handleEliminarButton() {
        setShow(false);
        setTipoModal("");
        navigate('/');
    }

    if (cargando) {
        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }

    return (
        <div className='container-fluid min-vh-100 mb-5'>
            <div className='d-flex justify-content-between m-5 row align-items-center'>
                <div className='d-flex col-sm-9 justify-content-between'>
                    <h1 className='title'>{evento.nombre}</h1>
                    < h4>Fecha: {evento.fecha_form}</h4>
                </div>
                <div className='col-sm-2 mt-2'>
                    <Button variant="secondary" className="shadow" onClick={() => navigate(-1)}>Volver</Button>
                </div>

            </div>
            <hr />
            <div className='row m-5'>
                <div className='col-md-4 col-sm-6 col-12'>
                    <img src={evento.foto_portada} alt="foto" className='w-100 img-fluid rounded' />
                </div>
                <div className='col-sm-2'></div>
                <div className='col-sm-6'>
                    <p className='mt-2'><strong>Deporte: </strong> {evento.deporte}</p>
                    <p className='mt-2'><strong>Nivel mínimo: </strong> {evento.nivel}</p>
                    <p className='mt-2'><strong>Donde: </strong> {evento.localidad}</p>
                    <p className='mt-2'><strong>Máximo participantes: </strong> {evento.max_participantes}</p>
                    <p className='mt-2'><strong>Género participantes: </strong> {evento.sexo_participantes}</p>
                    <p className='mt-2'><strong>Edad: </strong>entre {evento.edad_min} y {evento.edad_max} años</p>
                    <p className='mt-2'><strong>Descripción:</strong> {evento.descripcion}</p>
                    {soyCreador && !eventoPasado
                        ? <div className='d-flex'>
                            <Button variant="secondary" className="rounded-pill shadow me-3" onClick={handleEditar}>Editar</Button>
                            <Button variant="secondary" className="rounded-pill shadow" onClick={handleEliminar}>Eliminar</Button>
                        </div>
                        : eventoPasado
                            ? ""
                            : soyParticipante
                                ? <Button variant="secondary" className="rounded-pill shadow" onClick={handleDesapuntarse}>No asistiré</Button>
                                : sinPlazas
                                    ? <h5 style={{ backgroundColor: "#fadbd8" }} className='rounded p-2 text-center'>No quedan plazas</h5>
                                    : sexoIncompatible || edadIncompatible || nivelIncompatible
                                        ? <h5 style={{ backgroundColor: "#fadbd8" }} className='rounded p-2 text-center'>No cumples los requisitos del evento</h5>
                                        : <Button variant="secondary" className="rounded-pill shadow" onClick={handleParticipar}>Participar</Button>
                    }

                </div>
            </div>
            <hr />
            <div>
                <h4 className='m-3'>Asistirán: </h4>

                <div className='row mt-3 ms-2'>
                    {evento.participantes.map((participante, index) => {
                        return <Link key={index} to={`/perfil/${participante.id}`} className='text-decoration-none'>
                            <div className='d-flex mb-3'>
                                {
                                    participante.foto_perfil
                                        ? <Image src={participante.foto_perfil} alt="foto de perfil" className='avatar_small me-2' />
                                        : participante.sexo === "mujer"
                                            ? <Image src={default_chica} alt="foto de perfil" className='avatar_small me-2' />
                                            : <Image src={default_chico} alt="foto de perfil" className='avatar_small me-2' />
                                }


                                <div className='d-flex bg-seccion align-items-center justify-content-center rounded-pill shadow ps-4 pe-4 pt-0 pb-0'>
                                    <p className='m-0'>{participante.nombre} {participante.apellidos}
                                        {evento.creador_id === participante.id && " (creador/a)"}</p>
                                </div>
                            </div>
                        </Link>

                    })}
                </div>
            </div>
            {eventoPasado &&
                <>
                    <hr />
                    <div>
                        <p>Sección para fotos</p>
                    </div>
                </>
            }
            <Modal show={show} onHide={handleClose}>

                <Modal.Body>{mensaje}</Modal.Body>
                <Modal.Footer>
                    {tipoModal === "eliminar"
                        ? <Button variant="secondary" onClick={handleEliminarButton}>
                            Aceptar
                        </Button>
                        : <Button variant="secondary" onClick={handleClose}>
                            Aceptar
                        </Button>
                    }

                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default DetalleEvento