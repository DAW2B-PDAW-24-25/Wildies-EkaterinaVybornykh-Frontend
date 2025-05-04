import React, { useState } from 'react'
import { Button, Form, Image, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import logo from '/images/logo4.png'
import BuscadorLocalidad from './BuscadorLocalidad';

function InicioSesion() {
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        fechaNacimiento: "",
        sexo: "",
        longitud_domicilio: "",
        latitud_domicilio: "",
        localidad: "",
        descripcion: "",
        por_que: "",
        password: "",
        passwordConfirmation: "",
        deportes: []

    });
    const [header, setHeader] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
     const [validated, setValidated] = useState(false);

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth();
        if (mes < nacimiento.getMonth() || (mes === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    }

    async function handleRegister() {
        
    }

    return (
        <div className='container-fluid portada'>

            <div className='d-flex justify-content-between align-items-center p-4'>
                <div className='ms-5'>
                    <Image src={logo} alt='logo' style={{ height: "80px" }} />
                </div>
                <div className='d-flex'>
                    <Button className="btn-montana rounded-pill px-4 py-2 text-light me-2">
                        Inicia sesión
                    </Button>

                </div>

            </div>
            <div className="text-center mt-5 text-light">
                <div className="text-center mt-5">
                    <h1 className="fade-in-text-1">
                        <span>Explorar.</span> <span>Sentir.</span> <span>Conectar.</span>
                    </h1>
                    <h2 className="fade-in-text-2">
                        <span>Donde</span> <span>empieza</span> <span>la</span> <span>libertad...</span>
                    </h2>
                    <Button className="btn-montana rounded-pill px-4 py-2 text-light mt-2 fade-in-boton">
                        Crea una cuenta
                    </Button>
                </div>
            </div>
            <Modal show={show}
               
                scrollable
                centered
                backdrop="static"
            >

                <Modal.Title>{header}</Modal.Title>

                <Modal.Body className='modal-body'>


                    <Form onSubmit={handleRegister}>
                        <Form.Group controlId="nombre">
                            <Form.Label className='mb-sm-4 text-center w-100'>Nombre</Form.Label>
                            <Form.Control
                                className='texto'
                                type="text"
                                name='nombre'
                                value={formData.nombre}
                                onChange={handleFormChange}
                                required
                                isInvalid={validated && !formData.nombre}

                            />
                            <Form.Control.Feedback type="invalid">
                                Nombre es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="nombre">
                            <Form.Label className='mb-sm-4 text-center w-100'>Apellidos</Form.Label>
                            <Form.Control
                                className='texto'
                                type="text"
                                name='apellidos'
                                value={formData.apellidos}
                                onChange={handleFormChange}
                                required
                                isInvalid={validated && !formData.apellidos}
                            />
                            <Form.Control.Feedback type="invalid">
                                El campo apellidos es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label className='mb-sm-4 text-center w-100'>email</Form.Label>
                            <Form.Control
                                className='texto'
                                type="email"
                                name='email'
                                value={formData.email}
                                onChange={handleFormChange}
                                required
                                isInvalid={validated && !formData.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                Email es obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3 texto" controlId="fecha_nacimiento">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                name='fecha_nacimiento'
                                value={formData.fechaNacimiento}
                                className='texto'
                                onChange={handleFormChange}
                                required
                                isInvalid={validated && (!formData.fechaNacimiento || calcularEdad(formData.fechaNacimiento) < 18)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formData.fecha_nacimiento ? 'Debes ser mayor de 18 años.' : 'Este campo es obligatorio.'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <BuscadorLocalidad
                            formData={formData}
                            setFormData={setFormData}
                            handleFormChange={handleFormChange}
                        />


                        <hr />

                        <Form.Label>Sexo</Form.Label>
                        <Form.Select
                            className="mb-3 texto"
                            aria-label="Sexo"
                            name='sexo'
                            value={formData.sexo}
                            onChange={handleFormChange}
                        >
                            <option>Selecciona...</option>
                            <option value="mujer">Mujer</option>
                            <option value="hombre">Hombre</option>
                            <option value="otro">Otro</option>
                        </Form.Select>
                        <hr />

                        {/* <Form.Group controlId="deportes">
                            <Form.Label>Deportes</Form.Label>
                            <ToggleButtonGroup
                                type="checkbox"
                                name='deporte'
                                value={formData.deportes}
                                onChange={(val) => setFormData({ ...formData, deportes: val })}
                                className="d-flex flex-wrap row ms-2"
                            >
                                {deportes?.map((deporte) => {
                                    return <ToggleButton key={deporte.id} id={`deporte-${deporte.id}`} value={deporte.id} className="me-1 mb-2 rounded-pill shadow col-3" variant='outline-secondary'>
                                        {deporte.nombre}
                                    </ToggleButton>
                                })}
                            </ToggleButtonGroup>
                        </Form.Group> */}
                        <hr />

                        <div className='d-flex justify-content-end'>
                            <Button variant="secondary" type='submit' className='mt-4'>
                                Aceptar
                            </Button>
                        </div>

                    </Form>


                </Modal.Body>
                <Modal.Footer>
                   
                        <Button variant="secondary" onClick={handleClose}>
                            Aceptar
                        </Button>
                  

                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default InicioSesion