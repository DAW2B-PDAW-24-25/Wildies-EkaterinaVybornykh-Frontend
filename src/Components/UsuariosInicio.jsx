import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppProvider';
import SpinnerWave from './SpinnerWave';
import { RegContext } from '../Context/RegProvider';

function UsuariosInicio() {

    const { wildies, cargarUsuariosInicio, tipoUsuarios } = useContext(AppContext);
    const { usuarioLogueado } = useContext(RegContext);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (usuarioLogueado) {
            cargar();
        }
    }, [usuarioLogueado]);

    async function cargar() {
        if (tipoUsuarios === "inicio") {
            setCargando(true);
            await cargarUsuariosInicio();
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
            <h3 className='pb-3'>Wildies cerca</h3>
            <hr></hr>
            <div className='row pt-3'>
                {wildies.map((usuario, index) => {
                    return <Link to={`/perfil/${usuario.id}`} key={index} className='col-md-3 mb-3 me-5 text-decoration-none'>
                        <Card key={usuario.id} className='p-0 border-0 bg-transparent'>
                            <Card.Img variant="top" src={usuario.foto_perfil} className="img-fluid w-100 rounded-0" style={{ height: "250px", objectFit: "cover" }}>

                            </Card.Img>
                            <Card.ImgOverlay>
                                <div >
                                    <h5 className='text-light opacity-75'>{usuario.nombre}</h5>
                                </div>
                            </Card.ImgOverlay>

                            <Card.Body>
                                <Card.Text>
                                    {usuario.localidad}
                                </Card.Text>
                                <div className='d-flex flex-wrap align-items-center'>
                                    <h5 className='title me-1 mb-0'>Deportes: </h5>
                                    {usuario.deportes.map((deporte, index) => {
                                        return <p key={index} className='texto m-0'>{deporte.deporte} {index < usuario.deportes.length - 1 ? ',' : ''} </p>
                                    })}

                                </div>
                                {
                                    typeof usuario?.descripcion === 'string' &&
                                    <div className='d-flex flex-wrap mt-1'>
                                        <p className='texto m-0'>{usuario.descripcion.split(' ').slice(0, 15).join(' ') + "..."}</p>
                                    </div>
                                }
                            </Card.Body>
                        </Card>
                    </Link>
                })}

            </div>

        </div>
    )
}

export default UsuariosInicio