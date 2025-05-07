import React, { useContext, useState } from 'react'
import { Button, Form, Image, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import logo from '/images/logo4.png'
import BuscadorLocalidad from './BuscadorLocalidad';
import { RegContext } from '../Context/RegProvider';
import { API_URL } from '../App';
import { useNavigate } from 'react-router-dom';

function InicioSesion() {
    const { deportes, login } = useContext(RegContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [tipoModal, setTipoModal] = useState("");
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        email: "",
        fecha_nacimiento: "",
        sexo: "",
        longitud_domicilio: "",
        latitud_domicilio: "",
        localidad: "",
        descripcion: "",
        por_que: "",
        password: "",
        // passwordConfirmation: "",
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

    async function handleRegister(e) {
        e.preventDefault();
        const form = e.currentTarget.form;
        if (!formData.fecha_nacimiento || calcularEdad(formData.fecha_nacimiento) < 18) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }

        let datos = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            email: formData.email,
            password: formData.password,
            fecha_nacimiento: formData.fecha_nacimiento,
            sexo: formData.sexo || '',
            longitud_domicilio: formData.longitud_domicilio || '',
            latitud_domicilio: formData.latitud_domicilio || '',
            descripcion: formData.descripcion,
            por_que: formData.por_que,
            deportes: formData.deportes
        };
        
        try {
            let respuesta = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al enviar los datos');
            } else {
                setErrorMessage("");
                let data = await respuesta.json();
                console.log('Respuesta de la API:', data);
                login(data.usuario, data.token)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleRegisterButton() {
        setHeader("Crear cuenta")
        setTipoModal("reg");
        handleShow();
    }

    function handleLoginButton() {
        setHeader("Iniciar sesión")
        setTipoModal("login");
        handleShow();
    }

    function handleLogin() {

    }

    return (
        <div className='container-fluid portada'>
            <div className='d-flex justify-content-between align-items-center p-4'>
                <div className='ms-5'>
                    <Image src={logo} alt='logo' style={{ height: "80px" }} />
                </div>
                <div className='d-flex'>
                    <Button className="btn-montana rounded-pill px-4 py-2 text-light me-2" onClick={handleLoginButton}>
                        Inicia sesión
                    </Button>
                </div>
            </div>
            <div className="text-center mt-5 text-light">
                <div className="text-center mt-5">
                    {/* <h1 className="fade-in-text-1">
                        <span>Explorar.</span> <span>Sentir.</span> <span>Conectar.</span>
                    </h1>
                    <h2 className="fade-in-text-2">
                        <span>Donde</span> <span>empieza</span> <span>la</span> <span>libertad...</span>
                    </h2> */}
                    <Button className="btn-montana rounded-pill px-4 py-2 text-light mt-2 " onClick={handleRegisterButton}> {/* Añadir fade-in-boton  */}
                        Crea una cuenta
                    </Button>
                </div>
            </div>
            <Modal show={show}
                scrollable
                centered
                backdrop="static"
            >
                <Modal.Title className='m-3 title'>{header}</Modal.Title>
                <Modal.Body className='modal-body'>
                    {
                        tipoModal === "reg"
                            ? <Form onSubmit={handleRegister}>
                                <Form.Group controlId="nombre" className='mb-2'>
                                    <Form.Label>Nombre</Form.Label>
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
                                <Form.Group controlId="apellidos" className='mb-2'>
                                    <Form.Label>Apellidos</Form.Label>
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
                                <Form.Group controlId="email" className='mb-2'>
                                    <Form.Label>Email</Form.Label>
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
                                <Form.Group controlId="password" className='mb-2'>
                                    <Form.Label>Contraseña</Form.Label>
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
                                        Contraseña es obligatoria
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-2 texto" controlId="fecha_nacimiento">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name='fecha_nacimiento'
                                        value={formData.fecha_nacimiento}
                                        className='texto'
                                        onChange={handleFormChange}
                                        required
                                        isInvalid={validated && (!formData.fecha_nacimiento || calcularEdad(formData.fecha_nacimiento) < 18)}
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
                                <Form.Label>Sexo</Form.Label>
                                <Form.Select
                                    className="mb-2 texto"
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
                                <Form.Group controlId="deportes">
                                    <Form.Label>Elige deportes</Form.Label>
                                    <ToggleButtonGroup
                                        type="checkbox"
                                        name='deporte'
                                        value={formData.deportes}
                                        onChange={(val) => setFormData({ ...formData, deportes: val })}
                                        className="d-flex flex-wrap row ms-3"
                                    >
                                        {deportes?.map((deporte) => {
                                            return <ToggleButton
                                                key={deporte.id}
                                                id={`deporte-${deporte.id}`}
                                                value={deporte.id}
                                                className="me-1 mb-2 rounded-pill shadow col-3 p-0"
                                                variant='outline-secondary'>
                                                {deporte.nombre}
                                            </ToggleButton>
                                        })}
                                    </ToggleButtonGroup>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="descripcion">
                                    <Form.Label>Descríbete brevemente</Form.Label>
                                    <Form.Control
                                        type="textarea"
                                        name='descripcion'
                                        value={formData.descripcion}
                                        onChange={handleFormChange}
                                        className='texto'
                                        required
                                        isInvalid={validated && !formData.descripcion}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Este campo es obligatorio.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-2" controlId="por_que">
                                    <Form.Label>¿Por qué quieres formar parte de nuestra comunidad?</Form.Label>
                                    <Form.Control
                                        type="textarea"
                                        name='por_que'
                                        value={formData.por_que}
                                        onChange={handleFormChange}
                                        className='texto'
                                        required
                                        isInvalid={validated && !formData.por_que}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Este campo es obligatorio.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {
                                    errorMessage !== "" &&
                                    <div style={{ backgroundColor: "#fadbd8" }} className='mt-2 mb-2 rounded-pill shadow p-2 text-center'>{errorMessage}</div>
                                }

                                <div className='d-flex justify-content-end'>
                                    <Button variant="secondary" type='submit' className='mt-4 me-3' onClick={handleRegister}>
                                        Aceptar
                                    </Button>
                                    <Button variant="secondary" type='submit' className='mt-4' onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </div>
                            </Form>
                            : <Form onSubmit={handleLogin}>
                                <Form.Group controlId="email" className='mb-2'>
                                    <Form.Label>Email</Form.Label>
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
                                <Form.Group controlId="password" className='mb-2'>
                                    <Form.Label>Contraseña</Form.Label>
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
                                        Contraseña es obligatoria
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {
                                    errorMessage !== "" &&
                                    <div style={{ backgroundColor: "#fadbd8" }} className='mt-2 mb-2 rounded-pill shadow p-2 text-center'>{errorMessage}</div>
                                }

                                <div className='d-flex justify-content-end'>
                                    <Button variant="secondary" type='submit' className='mt-4 me-3'>
                                        Aceptar
                                    </Button>
                                    <Button variant="secondary" type='submit' className='mt-4' onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </div>
                            </Form>
                    }

                </Modal.Body>
            </Modal>
        </div>

    )
}

export default InicioSesion