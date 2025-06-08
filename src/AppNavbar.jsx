import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Dropdown, Form, Image, Modal } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { RegContext } from './Context/RegProvider';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './Context/AppProvider';
import { API_URL } from './App';

function AppNavbar() {
    const { usuarioLogueado, logout, token } = useContext(RegContext);
    const { cancelarPremium } = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [tipoModal, setTipoModal] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalHeader, setModalHeader] = useState("");
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: ""
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handlePremiumButton() {
        setTipoModal("cancelar");
        setModalHeader("Premium")
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
        handleClose();
    }

    function handlePassword() {
        setTipoModal("password")
        setModalHeader("Introduce nueva contraseña")
        handleShow();
    }

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleEditarPassword(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("No he pasado validación")
            e.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            let respuesta = await fetch(`${API_URL}/usuarios/cambiarPassword/${usuarioLogueado.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: formData.password,

                }),
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al enviar los datos');
            } else {
                setTipoModal("exito")
                setErrorMessage("");
                setModalHeader("")
                setModalMessage("Constraseña cambiada con éxito")
                let data = await respuesta.json();
                console.log('Respuesta de la API:', data);
                handleShow();
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (

        <Navbar>
            <Container className='me-3 ms-3 me-md-5 ms-md-4 mt-2 mb-0 p-0'>

                {/*   <Navbar.Brand href="#home"></Navbar.Brand> */}
                {/*  <Navbar.Toggle /> */}
                <Navbar.Collapse
                    className={usuarioLogueado && usuarioLogueado.roles.includes("premium") && !usuarioLogueado.roles.includes("admin")
                        ? "justify-content-between"
                        : "justify-content-end"}>
                    {
                        usuarioLogueado && usuarioLogueado.roles.includes("premium") && !usuarioLogueado.roles.includes("admin") &&
                        <div>
                            <Button variant="outline-secondary" className="rounded-pill shadow ms-md-4 d-none d-sm-block" onClick={handlePremiumButton}>
                                Cancelar Premium
                            </Button>
                            <div className='d-sm-none'>

                            </div>
                        </div>
                    }

                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className="bg-transparent border-0 p-0 m-0 inline-flex">
                            <div className='d-flex flex-column align-items-center'>
                                <div className='d-flex align-items-center justify-content-center'>
                                    {
                                        (usuarioLogueado && !usuarioLogueado.roles.includes("admin")) &&
                                        <div className='me-2'>
                                            <Image src={usuarioLogueado.foto_perfil} alt="Foto perfil" className="avatar_small" />
                                        </div>
                                    }

                                    <div className='m-0'>
                                        <h5 className='m-0 texto'>{usuarioLogueado.nombre} {usuarioLogueado.apellidos}</h5>
                                    </div>
                                </div>
                                {/*  <div className='text-center ms-2'>
                                    <p className='p-0'>{usuarioLogueado.localidad}</p>
                                </div> */}
                            </div>


                        </Dropdown.Toggle>

                        <Dropdown.Menu className='m-0 border-0 shadow dropdown-menu-end'>
                            {
                                (usuarioLogueado && !usuarioLogueado.roles.includes("admin")) &&
                                <Dropdown.Item className='texto' onClick={() => navigate(`/perfil/${usuarioLogueado.id}`)}>Perfil</Dropdown.Item>
                            }
                            <Dropdown.Item className='texto' onClick={handlePassword}>Cambiar contraseña</Dropdown.Item>
                            {
                                 (usuarioLogueado && usuarioLogueado.roles.includes("premium")) &&
                                <Dropdown.Item href="#/action-2" className='texto d-sm-none' onClick={handlePremiumButton}>Cancelar Premium</Dropdown.Item>
                            }
                            <Dropdown.Item href="#/action-2" className='texto' onClick={logout}>Cerrar sesión</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </Navbar.Collapse>
            </Container>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title className="title">{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='texto'>
                    {
                        (tipoModal === "cancelar" || tipoModal === "exito") &&
                        modalMessage
                    }

                    {
                        tipoModal === "password" &&
                        <Form noValidate validated={validated} onSubmit={handleEditarPassword}>
                            <Form.Group controlId="password" className='mb-2'>
                                <Form.Label>Nueva contraseña</Form.Label>
                                <Form.Control
                                    className='texto'
                                    type="password"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleFormChange}
                                    required
                                    isInvalid={validated && !formData.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formData.password ? 'password incorrecto' : 'Este campo no puede estar vacío'}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {
                                errorMessage !== "" &&
                                <div style={{ backgroundColor: "#fadbd8" }} className='mt-2 mb-2 rounded-pill shadow p-2 text-center'>{errorMessage}</div>
                            }
                            <div className='d-flex justify-content-end m-2'>
                                <Button variant="secondary" type='submit' className='me-2'>
                                    Aceptar
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                            </div>

                        </Form>
                    }
                </Modal.Body>

                {
                    tipoModal !== "password" &&
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
                }

            </Modal>
        </Navbar>
    )
}

export default AppNavbar