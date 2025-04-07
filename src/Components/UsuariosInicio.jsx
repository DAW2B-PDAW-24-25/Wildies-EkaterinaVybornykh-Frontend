import React from 'react'
import Card from 'react-bootstrap/Card';
import { FaMountain } from "react-icons/fa6";
import { GiMountainClimbing } from "react-icons/gi";
import { MdOutlineSurfing } from "react-icons/md";
import { PiBicycleFill } from "react-icons/pi";
import bikeImg from '../styles/icons/cycling.png';
import { Link } from 'react-router-dom';

function UsuariosInicio({ usuarios }) {

    return (

        <div className='container-fluid'>
            <h3 className='pb-3'>Wildies cerca</h3>
            <hr></hr>
            <div className='row pt-3'>
                {usuarios.map((usuario) => {
                    return <Link to={`/perfil/${usuario.id}`} className='col-md-3 mb-3 me-5 text-decoration-none'><Card key={usuario.id} className='rounded-0 p-0 border-0 bg-transparent'>
                        <Card.Img variant="top" src={usuario.foto_perfil} className="img-fluid w-100 rounded-0">

                        </Card.Img>
                        <Card.ImgOverlay>
                            <div >
                                <h5 className='text-light opacity-75'>{usuario.nombre}</h5>
                            </div>
                        </Card.ImgOverlay>
                        <Card.ImgOverlay>
                            {/* <div className='d-flex m-1 justify-content-center'>
                                <div>
                                    <FaMountain className='text-light m-2 opacity-75' style={{ fontSize: "20px" }} />
                                    <GiMountainClimbing className='text-light m-2 opacity-75' style={{ fontSize: "20px" }} />
                                    <MdOutlineSurfing className='text-light m-2 opacity-75' style={{ fontSize: "20px" }} />
                                    <PiBicycleFill className='text-light m-2 opacity-75' style={{ fontSize: "20px" }} />
                                    <img src={bikeImg} alt="Icono" style={{ width: '20px', height: '20px', filter: 'invert(1) brightness(1000%)', margin: "5px" }} />
                                </div>
                            </div> */}
                        </Card.ImgOverlay>

                        <Card.Body>
                            <Card.Text>
                                {usuario.localidad}
                            </Card.Text>
                            <div className='d-flex flex-wrap'>
                                <h5 className='title me-1'>Deportes: </h5>
                                {usuario.deportes.map((deporte, index) => {
                                    return <p className='me-1 texto'>{deporte.deporte} {index<usuario.deportes.length-1 ? ',': ''} </p>
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
            <div>
                <Link to="/wildiesCerca" className='text-decoration-none'>Descubrir mas...</Link>
            </div>
        </div>
    )
}

export default UsuariosInicio