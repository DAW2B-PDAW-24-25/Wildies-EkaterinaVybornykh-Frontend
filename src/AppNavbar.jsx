import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Dropdown, Image, Modal } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { RegContext } from './Context/RegProvider';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './Context/AppProvider';

function AppNavbar() {
    const { usuarioLogueado, logout } = useContext(RegContext);
    const { cancelarPremium } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log("Usuario en Navbar: ", usuarioLogueado.id)
    }, [usuarioLogueado])

    function handlePremiumButton() {
        setTipoModal("cancelar");
        setModalMessage("¿Quieres cancelar tu suscripción?")
        handleShow();
    }

    function handleCancelarPremium() {
          setTipoModal("");
        let cancelado = cancelarPremium();
        if (cancelado) {
            setModalMessage("Suscripción cancelada con éxito")
        } else {
            setModalMessage("Error al cancelar suscripción. Ponte en contacto con nuestro equipo")
        }
        handleShow();
    }

    return (

        <Navbar>
            <Container className='me-5 ms-4 mt-2 mb-0 p-0'>

                {/*   <Navbar.Brand href="#home"></Navbar.Brand> */}
                {/*  <Navbar.Toggle /> */}
                <Navbar.Collapse
                    className={usuarioLogueado && usuarioLogueado.roles.includes("premium")
                        ? "justify-content-between"
                        : "justify-content-end"}>
                    {
                        usuarioLogueado && usuarioLogueado.roles.includes("premium") &&

                        <Button variant="outline-secondary" className="rounded-pill shadow ms-4" onClick={handlePremiumButton}>
                            Premium
                        </Button>

                    }

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
                            <Dropdown.Item href="#/action-2" className='texto' onClick={logout}>Cerrar sesión</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </Navbar.Collapse>
            </Container>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title className="title">Premium</Modal.Title>
                </Modal.Header>
                <Modal.Body className='texto'>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    {
                        tipoModal === "cancelar" &&
                        <Button variant="secondary" onClick={handleCancelarPremium}>
                            Aceptar
                        </Button>
                    }

                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Navbar>
    )
}

export default AppNavbar