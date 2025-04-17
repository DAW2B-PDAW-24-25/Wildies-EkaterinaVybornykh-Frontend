import React, { useContext, useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppProvider';
import SpinnerWave from './SpinnerWave';

function EventosInicio() {

    const { eventos, cargarEventosCerca, cargarEventosInicio } = useContext(AppContext);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargar();
    }, []);

    async function cargar() {
        setCargando(true);
        await cargarEventosInicio();
        setCargando(false);
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
                {eventos.map((evento) => {
                    return <Link to={`/detalleEvento/${evento.id}`} className='col-md-3 mb-3 me-5 text-decoration-none'><Card key={evento.id} className='rounded-0 p-0 border-0 bg-transparent'>
                        <Card.Img variant="top" src={evento.foto_portada} className="img-fluid w-100 rounded-0" />
                        <Card.Body>
                            <div>
                                <h5 className='title'>{evento.deporte} (nivel {evento.nivel})</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='title me-1'>Fecha :</h5> <p>{evento.fecha}</p>
                            </div>
                            <Card.Text>
                                <h5 className='title'>Donde :</h5> {evento.localidad}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Link>
                })}

            </div>
        </div>
    )
}

export default EventosInicio