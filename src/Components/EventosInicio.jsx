import React, { useContext, useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppProvider';
import SpinnerWave from './SpinnerWave';
import { RegContext } from '../Context/RegProvider';

function EventosInicio() {

    const { eventos, cargarEventosCerca, cargarEventosInicio, tipoEventos } = useContext(AppContext);
    const { usuarioLogueado } = useContext(RegContext);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (usuarioLogueado) {
            cargar();
        }
    }, [usuarioLogueado]);

    async function cargar() {
        if (tipoEventos === "inicio") {
            setCargando(true);
            await cargarEventosInicio();
            setCargando(false);
        }
    }

    if (cargando) {

        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }
    return (

        <div className='container-fluid'>
            <h3 className='pb-3'>Eventos cerca</h3>
            <hr></hr>
            <div className='row pt-3'>
                {eventos.map((evento, index) => {
                    return <Link key={index} to={`/detalleEvento/${evento.id}`} className='col-md-3 mb-3 me-5 text-decoration-none'><Card key={evento.id} className='rounded-0 p-0 border-0 bg-transparent'>
                        <Card.Img variant="top" src={evento.foto_portada} className="img-fluid w-100 rounded-0" style={{ height: "250px", objectFit: "cover" }} />
                        <Card.Body>
                            <div>
                                <h5 className='title'>{evento.deporte} (nivel {evento.nivel})</h5>
                            </div>
                            <div className='d-flex align-items-center'>
                                <h5 className='title me-1 mt-0 mb-0'>Fecha :</h5> <p className='m-0'>{evento.fecha_form}</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <h5 className='title me-1 mt-2'>Donde : </h5> <p className='m-0'>{evento.localidad}</p>
                            </div>

                        </Card.Body>
                    </Card>
                    </Link>
                })}

            </div>
        </div>
    )
}

export default EventosInicio