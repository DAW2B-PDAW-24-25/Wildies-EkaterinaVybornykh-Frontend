import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import SpinnerWave from './SpinnerWave';
import { RegContext } from '../Context/RegProvider';
import { API_URL } from '../App';
import { Link } from 'react-router-dom';

function ProximosEventos() {
    const { usuarioLogueado, token } = useContext(RegContext);
    const [cargando, setCargando] = useState(false);
    const [proximosEventos, setProximosEventos] = useState([]);

    useEffect(() => {
        cargarProximosEventos();
    }, [usuarioLogueado])

    async function cargarProximosEventos() {
        setCargando(true);
        let response = await fetch(`${API_URL}/futurosEventos/${usuarioLogueado.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.log("Error al cargar eventos de usuario")
        } else {
            let data = await response.json();
            setProximosEventos(data.data);
            
        }
        setCargando(false)
    }

    if (cargando) {
        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }

    return (

        <div className='container-fluid min-vh-100'>
            {
                proximosEventos.length > 0
                    ? <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 w-sm-75 mb-5 bg-seccion'>
                        <h3 className='title'>Mis próximas aventuras</h3>
                        <hr />
                        <Card className='rounded-0 p-0 border-0 bg-transparent'>
                            {proximosEventos.map((evento) => {
                                return <Link to={`/detalleEvento/${evento.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className='row m-3' key={evento.id} >
                                        <div className='col-sm-4 me-3'>
                                            <img src={evento.foto_portada} alt="foto de portada" className='w-100 image-fluid rounded' />
                                        </div>
                                        <div className='col-sm-7 d-flex flex-column justify-content-center'>
                                            <h5 className='texto'>{evento.nombre} {`(${evento.deporte})`}</h5>
                                            <p><strong>Fecha: </strong>{new Date(evento.fecha).toLocaleDateString()}</p>
                                            <p><strong>Lugar: </strong>{evento.localidad}</p>

                                        </div>

                                    </div>
                                </Link>

                            })}

                        </Card>
                    </div>
                    : <div className='m-5 text-center'>
                        <h1 className='title'>Todavía no tienes eventos</h1>
                    </div>
            }

        </div>
    )
}

export default ProximosEventos