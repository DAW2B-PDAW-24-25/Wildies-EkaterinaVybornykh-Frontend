import React, { useContext, useEffect, useState } from 'react'
import { API_URL } from '../App';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../Context/AppProvider';
import SpinnerWave from './SpinnerWave';
import { Button } from 'react-bootstrap';

function DetalleEvento() {
    const { setEvento, evento } = useContext(AppContext);
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();
    const [eventoPasado, setEventoPasado] = useState(false);


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

    if (cargando) {
        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }

    return (
        <div className='container-fluid min-vh-100 mb-5'>
            <div className='d-flex justify-content-between m-5 row'>
                <div className='d-flex col-sm-9 justify-content-between'>
                    <h1 className='title'>{evento.nombre}</h1>
                    < h4>Fecha: {evento.fecha}</h4>
                </div>
                <div className='col-sm-2 mt-2'>
                    <Button variant="secondary" className="rounded-pill">Volver atrás</Button>
                </div>

            </div>
            <hr />
            <div className='row m-5'>
                <div className='col-md-3 col-sm-6 col-12'>
                    <img src={evento.foto_portada} alt="foto" className='w-100 img-fluid rounded' />
                </div>
                <div className='col-sm-2'></div>
                <div className='col-sm-6'>

                    <p className='mt-2'><strong>Nivel mínimo: </strong> {evento.nivel}</p>
                    <p className='mt-2'><strong>Donde: </strong> {evento.localidad}</p>
                    <p className='mt-2'><strong>Máximo participantes: </strong> {evento.max_participantes}</p>
                    <p className='mt-2'><strong>Género participantes: </strong> {evento.sexo_participantes}</p>
                    <p className='mt-2'><strong>Edad: </strong>entre {evento.edad_min} y {evento.edad_max} años</p>
                    <p className='mt-2'><strong>Descripción:</strong> {evento.descripcion}</p>

                    <Button variant="secondary" className="rounded-pill">Participar</Button>
                </div>
            </div>
            <hr />
            <div>
                <h4 className='m-3'>Asistirán: </h4>
                <div className='row mt-3 ms-2'>
                    {evento.participantes.map((participante, index) => {
                        return <Link key={index} to={`/perfil/${participante.id}`} className='text-decoration-none'>
                            <div className='d-flex mb-3'>
                                <div className='me-3' style={{ width: "40px", height: "40px" }}>
                                    <img src={participante.foto_perfil} alt="foto de perfil" className='img-fluid w-100 rounded-circle' />
                                </div>
                                <div className='d-flex bg-seccion align-items-center justify-content-center rounded-pill ps-4 pe-4 pt-0 pb-0'>
                                    <p className='m-0'>{participante.nombre} {participante.apellidos}</p>
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

        </div>
    )
}

export default DetalleEvento