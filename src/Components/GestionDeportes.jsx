import React, { useContext, useState } from 'react'
import { Button, Card, Form, Modal, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { RegContext } from '../Context/RegProvider';
import { useNavigate } from 'react-router-dom';
import SpinnerWave from './SpinnerWave';
import { API_URL } from '../App';


function GestionDeportes() {
    const { token, deportes, setDeportes } = useContext(RegContext);
    const [cargando, setCargando] = useState(false);
    const [elemento, setElemento] = useState("deportes");
    const [modalTipo, setModalTipo] = useState("");
    const [header, setHeader] = useState("");
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [deporteForm, setDeporteForm] = useState({
        idDeporte: "",
        nombre: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function getNombreDeporte(id) {
        let deporte = deportes.find(deporte => deporte.id === id)
        return deporte.nombre;
    }

    function handleMostrarDeportesButton() {
        setElemento("deportes");
    }

    function handleCrearDeporteButton() {
        setErrorMessage("")
        setHeader("Introduce nombre de deporte")
        setModalTipo('crear')
        handleShow();
    }

    async function crearDeporte(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("No he pasado validación")
            e.stopPropagation();
            setValidated(true);
            return;
        }
        try {
            let respuesta = await fetch(`${API_URL}/deportes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ nombre: deporteForm.nombre }),
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al crear deporte');
            } else {
                setErrorMessage("");
                let data = await respuesta.json();
                setDeportes(data);
                console.log('Respuesta de la API:', data);
                setDeporteForm({ idDeporte: "", nombre: "" })
                 handleClose();
            }
            
           

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleEditarDeporteButton(id) {
        let nombreDeporte = getNombreDeporte(id);
        setDeporteForm({ idDeporte: id, nombre: nombreDeporte })
        setModalTipo('editar');
        setHeader("Modifica el nombre")
        handleShow();
    }

    async function editarDeporte(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("No he pasado validación")
            e.stopPropagation();
            setValidated(true);
            return;
        }
        try {
            let respuesta = await fetch(`${API_URL}/deportes/${deporteForm.idDeporte}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ nombre: deporteForm.nombre }),
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al enviar los datos');
            } else {
                setErrorMessage("");
                let data = await respuesta.json();
                setDeportes(data);

                console.log('Respuesta de la API:', data);
            }
            setDeporteForm({ idDeporte: "", nombre: "" })
            handleClose();

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleAceptarBorrar() {
        setErrorMessage("");
        handleClose();
    }

    async function handleEliminarDeporte(id) {
        setModalTipo("eliminar")
        try {
            let respuesta = await fetch(`${API_URL}/deportes/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                handleShow();
                console.log('Error al eliminar deporte');
            } else {
                setErrorMessage("");
                let data = await respuesta.json();
                setDeportes(data);

                console.log('Respuesta de la API:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleMostrarPreguntas() {

    }

    return (
        <div className='container-fluid-lg min-vh-100'>
            <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 mb-5 bg-light'>
                <h3 className='title'>Gestión de deportes</h3>
                <hr />
                <Card className='rounded-0 p-0 border-0 bg-transparent'>
                    <div className='d-flex justify-content-center m-3'>
                       {/*  <Button variant='outline-secondary rounded-pill shadow me-3' onClick={handleMostrarDeportesButton}>Mostrar deportes</Button> */}
                        <Button variant='outline-secondary rounded-pill shadow' onClick={handleCrearDeporteButton}>Crear deporte</Button>
                    </div>
                    {
                        elemento === "deportes" && (
                            deportes?.map((deporte) => {
                                return <>
                                    <Table striped bordered hover>
                                        <tbody>
                                            <tr className='row'>
                                                <th className='col-3'>Id</th>
                                                <td className='col-9 text-start'>
                                                    <div className='ms-3 me-3'>{deporte.id}</div>
                                                </td>
                                            </tr>
                                            <tr className='row align-items-center'>
                                                <th className='col-3'>Nombre</th>
                                                <td className='col-9'>
                                                    <div className="d-flex justify-content-between align-items-center ms-3 me-3">
                                                        <span className='text-start'>{deporte.nombre}</span>

                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div className='d-flex justify-content-center mt-2 mb-4'>
                                        <div>
                                            <Button variant='secondary rounded-pill shadow me-3' onClick={() => handleEditarDeporteButton(deporte.id)}>Editar</Button>
                                        </div>
                                        <div>
                                            <Button variant='secondary rounded-pill shadow me-3' onClick={() => handleEliminarDeporte(deporte.id)}>Eliminar</Button>
                                        </div>
                                        {/* <div>
                                            <Button variant='secondary rounded-pill shadow me-3' onClick={() => handleMostrarPreguntas(deporte.id)}>Mostrar preguntas</Button>
                                        </div> */}
                                    </div>
                                </>
                            }
                            )

                        )}
                </Card>
            </div>
            <Modal show={show}
                scrollable
                centered
                backdrop="static"
            >
                <Modal.Title className='m-3 title'>{header}</Modal.Title>
                {
                    (modalTipo === "editar" || modalTipo === "crear") &&
                    <Modal.Body className='modal-body'>
                        <Form noValidate validated={validated} onSubmit={modalTipo === 'editar' ? editarDeporte : crearDeporte}>
                            <Form.Group controlId="deporte" className='mb-2'>
                                <Form.Control
                                    className='texto'
                                    type="text"
                                    name='teporte'
                                    value={deporteForm.nombre}
                                    onChange={(e) => setDeporteForm({ ...deporteForm, nombre: e.target.value })}
                                    required
                                    isInvalid={validated && !deporteForm.nombre}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {deporteForm.nombre && 'Campo obligatorio'}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {
                                errorMessage !== "" &&
                                <div style={{ backgroundColor: "#fadbd8" }} className='mt-2 mb-2 rounded-pill shadow p-2 text-center'>{errorMessage}</div>
                            }
                            <div className='d-flex justify-content-end'>
                                {
                                    modalTipo === "editar" &&
                                    <Button variant="secondary" type='submit' className='mt-4 me-3'>
                                        Editar
                                    </Button>
                                }
                                {
                                    modalTipo === "crear" &&
                                    <Button variant="secondary" type='submit' className='mt-4 me-3'>
                                        Crear
                                    </Button>
                                }

                                <Button variant="secondary" className='mt-4' onClick={handleClose}>
                                    Cancelar
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                }
                {
                    modalTipo === "eliminar" &&
                    <div>
                        <h5 style={{ backgroundColor: "#fadbd8" }} className='rounded-pill shadow p-2 text-center m-3'>{errorMessage}</h5>
                        <div className='d-flex justify-content-end'>
                            <Button variant="secondary" className='mt-4 m-3' onClick={handleAceptarBorrar}>
                                Aceptar
                            </Button>
                        </div>
                    </div>


                }
            </Modal>
        </div>

    )
}

export default GestionDeportes