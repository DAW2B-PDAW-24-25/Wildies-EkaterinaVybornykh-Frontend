import React, { useContext, useEffect } from 'react'
import { Container, Dropdown, Image } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { AppContext } from './Context/AppProvider';
import { useNavigate } from 'react-router-dom';

function AppNavbar() {
    const { usuarioLogueado } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Usuario en Navbar: ", usuarioLogueado.id)
    }, [usuarioLogueado])
    return (
        <Navbar>
            <Container className='me-5 ms-4 mt-2 mb-0 p-0'>
                <Navbar.Brand href="#home"></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="bg-transparent border-0 p-0 m-0 inline-flex">
                            <div className='d-flex flex-column align-items-center'>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <div className='me-2'>
                                        <Image src={usuarioLogueado.foto_perfil} alt="Foto perfil" className="avatar_small" />
                                    </div>
                                    <div className='m-0'>
                                        <h5 className='m-0 texto'>{usuarioLogueado.nombre}, {usuarioLogueado.apellidos}</h5>
                                    </div>
                                </div>
                                {/*  <div className='text-center ms-2'>
                                    <p className='p-0'>{usuarioLogueado.localidad}</p>
                                </div> */}
                            </div>


                        </Dropdown.Toggle>

                        <Dropdown.Menu className='m-0 border-0 shadow opacity-75'>
                            <Dropdown.Item className='texto' onClick={() => navigate(`/perfil/${usuarioLogueado.id}`)}>Perfil</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" className='texto'>Cerrar sesión</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar