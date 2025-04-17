import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { FaMountain } from "react-icons/fa6";
import { GiMountainClimbing } from "react-icons/gi";
import { MdOutlineSurfing } from "react-icons/md";
import { PiBicycleFill } from "react-icons/pi";
import bikeImg from '../styles/icons/cycling.png';
import { Link } from 'react-router-dom';
import { AppContext } from '../Context/AppProvider';
import SpinnerWave from './SpinnerWave';

function UsuariosInicio() {

    const { wildies, cargarUsuariosInicio } = useContext(AppContext);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargar();
    }, []);

    async function cargar() {
        setCargando(true);
        await cargarUsuariosInicio();
        setCargando(false);
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
                {wildies.map((usuario) => {
                    return <Link to={`/perfil/${usuario.id}`} className='col-md-3 mb-3 me-5 text-decoration-none'>
                        <Card key={usuario.id} className='rounded-0 p-0 border-0 bg-transparent'>
                            <Card.Img variant="top" src={usuario.foto_perfil} className="img-fluid w-100 rounded-0">

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
                                <div className='d-flex flex-wrap'>
                                    <h5 className='title me-1'>Deportes: </h5>
                                    {usuario.deportes.map((deporte, index) => {
                                        return <p key={index} className='me-1 texto'>{deporte.deporte} {index < usuario.deportes.length - 1 ? ',' : ''} </p>
                                    })}

                                </div>

                                <Card.Text>
                                    {usuario.descripcion.split(' ').slice(0, 15).join(' ') + "..."}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                })}

            </div>

        </div>
    )
}

export default UsuariosInicio