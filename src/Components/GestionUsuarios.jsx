import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, Modal, Table } from 'react-bootstrap'
import { API_URL } from '../App';
import { RegContext } from '../Context/RegProvider';


function GestionUsuarios() {

    const { token } = useContext(RegContext);
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [tipoModal, setTipoModal] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [usuarioBuscado, setUsuarioBuscado] = useState({})
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rol: ""
    });
    const [usuarioCreado, setUsuarioCreado] = useState({});

    useEffect(() => {
        if (usuarioBuscado !== null) {
            setFormData({
                email: usuarioBuscado.email,
                password: usuarioBuscado.password || "",
                rol: ""
            });
        } else {
            setFormData({
                email: "",
                password: "",
                rol: ""
            });
        }
    }, [usuarioBuscado])

    function handleCrearButton() {
        let passwordAleatorio = generarPassword();
        setFormData({ ...formData, password: passwordAleatorio });
        setHeader("Introduce datos de usuario")
        setTipoModal("crear")
        handleShow();
    }

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleCrear(e) {

        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("No he pasado validación")
            e.stopPropagation();
            setValidated(true);
            return;
        }
        try {
            let respuesta = await fetch(`${API_URL}/usuarios/crear`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al enviar los datos');
            } else {
                setErrorMessage("");
                setTipoModal("creadoExito")
                setHeader("Usuario creado correctamente")
                let data = await respuesta.json();
                setUsuarioCreado(data);
                console.log('Respuesta de la API:', data);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleBuscarButton() {
        setTipoModal("buscar");
        setHeader("Introduce email")
        handleShow();
    }

    async function handleBuscar(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("No he pasado validación")
            e.stopPropagation();
            setValidated(true);
            return;
        }
        try {
            let respuesta = await fetch(`${API_URL}/usuarios/buscar`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email: formData.email }),
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al enviar los datos');
            } else {
                setErrorMessage("");
                setHeader("")
                let data = await respuesta.json();
                setUsuarioBuscado(data.data);
                console.log('Respuesta de la API:', data);
                handleClose();
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function generarAleatorio() {
        let simbolos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let aleatorio = parseInt(Math.random() * simbolos.length);
        return simbolos.charAt(aleatorio);
    }

    function generarPassword() {
        let password = "";
        for (let i = 0; i < 6; i++) {
            let aleatorio = generarAleatorio();
            password += aleatorio;
        }
        return password;
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    function handleEliminarButton() {

    }

    function handleEditarEmailButton() {
        setTipoModal("cambiarEmail");
        setHeader("Introduce email")
        handleShow();
    }

    async function handleEditarEmail(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            console.log("No he pasado validación")
            e.stopPropagation();
            setValidated(true);
            return;
        }
        try {
            let respuesta = await fetch(`${API_URL}/usuarios/cambiarEmail/${usuarioBuscado.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    email: formData.email,

                }),
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al enviar los datos');
            } else {
                setErrorMessage("");
                setHeader("")
                let data = await respuesta.json();
                setUsuarioBuscado(data.data);
                console.log('Respuesta de la API:', data);
                handleClose();
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function handleCambiarPassword() {
        let passwordAleatorio = generarPassword();

        try {
            let respuesta = await fetch(`${API_URL}/usuarios/cambiarPassword/${usuarioBuscado.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: passwordAleatorio,
                }),
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al enviar los datos');
            } else {
                setTipoModal("password");
                setErrorMessage("");
                setHeader("")
                handleShow();
                let data = await respuesta.json();
                setUsuarioBuscado(data.data);
                console.log('Respuesta de la API:', data);

            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function eliminarUsuario() {
        try {
            let respuesta = await fetch(`${API_URL}/usuarios/${usuarioBuscado.id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!respuesta.ok) {
                const error = await respuesta.json();
                setErrorMessage(error.message);
                console.log('Error al enviar los datos');
            } else {
                setTipoModal("eliminar");
                setErrorMessage("");
                setHeader("")
                handleShow();
                setUsuarioBuscado({});
                console.log('Respuesta de la API:', data);

            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='container-fluid min-vh-100'>
            <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 mb-5 bg-light text-center'>
                <h3 className='title'>Gestión de usuarios</h3>
                <hr />
                <Card className='rounded-0 p-0 border-0 bg-transparent'>
                    <div className='d-flex justify-content-center m-3'>
                        <Button variant='outline-secondary rounded-pill shadow me-3' onClick={handleBuscarButton}>Buscar usuario</Button>
                        <Button variant='outline-secondary rounded-pill shadow' onClick={handleCrearButton}>Crear usuario</Button>
                    </div>
                    {
                        usuarioBuscado?.id &&
                        <>

                            <Table striped bordered hover>

                                <tbody>
                                    <tr className='row'>
                                        <th className='col-3'>Id</th>
                                        <td className='col-9 text-start'>
                                            <div className='ms-3 me-3'>{usuarioBuscado.id}</div>
                                        </td>
                                    </tr>
                                    <tr className='row align-items-center'>
                                        <th className='col-3'>Email</th>
                                        <td className='col-9'>
                                            <div className="d-flex justify-content-between align-items-center ms-3 me-3">
                                                <span className='text-start'>{usuarioBuscado.email}</span>
                                                <Button
                                                    variant="outline-secondary"
                                                    className="rounded-pill shadow px-3 py-1"
                                                    onClick={handleEditarEmailButton}
                                                >
                                                    Editar
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <th className='col-3'>Nombre</th>
                                        <td className='col-9 text-start'>
                                            <div className='ms-3 me-3'>{usuarioBuscado.nombre}</div>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <th className='col-3'>Apellidos</th>
                                        <td className='col-9 text-start'>
                                            <div className='ms-3 me-3'>{usuarioBuscado.apellidos}</div>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <th className='col-3'>Fecha nacimiento</th>
                                        <td className='col-9 text-start'>
                                            <div className='ms-3 me-3'>{usuarioBuscado.fecha_nacimiento}</div>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <th className='col-3'>Sexo</th>
                                        <td className='col-9 text-start'>
                                            <div className='ms-3 me-3'>{usuarioBuscado.sexo}</div>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <th className='col-3'>Localidad</th>
                                        <td className='col-9 text-start'>
                                            <div className='ms-3 me-3'>{usuarioBuscado.localidad}</div>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <th className='col-3'>Foto perfil</th>
                                        <td className='col-9 text-start'>
                                            <div className='ms-3 me-3'>{usuarioBuscado.foto_perfil}</div>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <th className='col-3'>Roles</th>
                                        <td className='col-9 text-start'>
                                            <div className='ms-3 me-3'>{usuarioBuscado.roles}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className='d-flex justify-content-center'>
                                <div>
                                    <Button variant='secondary rounded-pill shadow me-3' onClick={handleCambiarPassword}>Cambiar contraseña</Button>
                                </div>
                                <div>
                                    <Button variant='secondary rounded-pill shadow me-3' onClick={eliminarUsuario}>Eliminar usuario</Button>
                                </div>
                            </div>

                        </>
                    }
                </Card>
            </div>
            <Modal show={show}
                scrollable
                centered
                backdrop="static"
            >
                <Modal.Title className='m-3 title'>{header}</Modal.Title>
                <Modal.Body className='modal-body'>
                    {
                        tipoModal === "crear" &&
                        <Form noValidate validated={validated} onSubmit={handleCrear}>
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
                                    {formData.email ? 'Email incorrecto' : 'Este campo no puede estar vacío'}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {
                                errorMessage !== "" &&
                                <div style={{ backgroundColor: "#fadbd8" }} className='mt-2 mb-2 rounded-pill shadow p-2 text-center'>{errorMessage}</div>
                            }

                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                                className="mb-2 texto"
                                aria-label="Rol"
                                name='rol'
                                value={formData.rol}
                                onChange={handleFormChange}
                            >
                                <option>Selecciona...</option>
                                <option value="user">User</option>
                                <option value="premium">Premium</option>
                                <option value="admin">Admin</option>
                            </Form.Select>

                            <div className='d-flex justify-content-end'>
                                <Button variant="secondary" type='submit' className='mt-4 me-3'>
                                    Crear
                                </Button>
                                <Button variant="secondary" className='mt-4' onClick={handleClose}>
                                    Cancelar
                                </Button>
                            </div>
                        </Form>
                    }
                    {
                        tipoModal === "creadoExito" &&
                        <>
                            <div>
                                <p><strong>Email: </strong>{usuarioCreado.email}</p>
                                <p><strong>Contraseña: </strong>{usuarioCreado.password}</p>
                            </div>
                            <div className='d-flex justify-content-end m-2'>
                                <Button variant="secondary" className='mt-4' onClick={handleClose}>
                                    Aceptar
                                </Button>
                            </div>
                        </>
                    }

                    {
                        (tipoModal === "password" || tipoModal === "eliminar") &&

                        <>
                            <div>
                                {
                                    tipoModal === "password"
                                        ? <p>Contraseña cambiada con éxito</p>
                                        : <p>Usuario eliminado con éxito</p>
                                }


                            </div>
                            <div className='d-flex justify-content-end m-2'>
                                <Button variant="secondary" className='mt-4' onClick={handleClose}>
                                    Aceptar
                                </Button>
                            </div>
                        </>
                    }


                    {
                        (tipoModal === "buscar" || tipoModal === "cambiarEmail") &&
                        <Form noValidate validated={validated} onSubmit={tipoModal === "buscar" ? handleBuscar : handleEditarEmail}>

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
                                    {formData.email ? 'Email incorrecto' : 'Este campo no puede estar vacío'}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {
                                errorMessage !== "" &&
                                <div style={{ backgroundColor: "#fadbd8" }} className='mt-2 mb-2 rounded-pill shadow p-2 text-center'>{errorMessage}</div>
                            }

                            {
                                tipoModal === "buscar" &&
                                <div className='d-flex justify-content-end'>
                                    <Button variant="secondary" type='submit' className='mt-4 me-2'>
                                        Buscar
                                    </Button>
                                    <Button variant="secondary" className='mt-4' onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </div>
                            }

                            {
                                tipoModal === "cambiarEmail" &&
                                <div className='d-flex justify-content-end'>
                                    <Button variant="secondary" type='submit' className='mt-4 me-2'>
                                        Editar
                                    </Button>
                                    <Button variant="secondary" className='mt-4' onClick={handleClose}>
                                        Cancelar
                                    </Button>
                                </div>
                            }

                        </Form>
                    }
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default GestionUsuarios