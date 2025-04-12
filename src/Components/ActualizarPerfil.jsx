import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, Image, Modal } from 'react-bootstrap';
import { AppContext } from '../Context/AppProvider';
import { API_URL } from '../App';
import BuscadorLocalidad from './BuscadorLocalidad';
import { Link } from 'react-router-dom';



function ActualizarPerfil() {

    const { usuarioLogueado, setUsuarioLogueado } = useContext(AppContext);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [validated, setValidated] = useState(false);

    const [fotoUrl, setFotoUrl] = useState(null);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        apellidos: "",
        fecha_nacimiento: "",
        sexo: "",
        longitud: "",
        latitud: "",
        localidad: "",
        profesion: "",
        idiomas: "",
        foto_perfil: "",
        descripcion: "",
        por_que: ""
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        if (usuarioLogueado) {
            setFormData({
                nombre: usuarioLogueado.nombre,
                apellidos: usuarioLogueado.apellidos,
                fecha_nacimiento: usuarioLogueado.fecha_nacimiento,
                sexo: usuarioLogueado.sexo,
                longitud_domicilio: usuarioLogueado.longitud_domicilio,
                latitud_domicilio: usuarioLogueado.latitud_domicilio,
                localidad: usuarioLogueado.localidad,
                profesion: usuarioLogueado.profesion,
                idiomas: usuarioLogueado.idiomas,
                foto_perfil: usuarioLogueado.foto_perfil,
                descripcion: usuarioLogueado.descripcion,
                por_que: usuarioLogueado.por_que
            });
        }

    }, [usuarioLogueado]);

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function enviarDatos(e) {
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
            fecha_nacimiento: formData.fecha_nacimiento,
            sexo: formData.sexo || '',
            profesion: formData.profesion || '',
            idiomas: formData.idiomas || '',
            longitud_domicilio: formData.longitud_domicilio || '',
            latitud_domicilio: formData.latitud_domicilio || '',
            foto_perfil: formData.foto_perfil || '',
            descripcion: formData.descripcion,
            por_que: formData.por_que
        };
        try {
            let respuesta = await fetch(`${API_URL}/usuarios/${usuarioLogueado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if (!respuesta.ok) {
                console.log('Error al enviar los datos');
            }
            let data = await respuesta.json();
            console.log('Respuesta de la API:', data);
            setUsuarioLogueado(data.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleFoto(e) {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFotoPerfil(file);
            setFotoUrl(URL.createObjectURL(file));
        }
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

    const enviarFoto = async () => {
        if (!fotoPerfil) {
            console.log("No hay foto para enviar");
            return;
        }
        const formData = new FormData();
        if (fotoPerfil) {
            formData.append('foto_perfil', fotoPerfil);
        }

        try {
            const response = await fetch(`${API_URL}/usuarios/foto/${usuarioLogueado.id}`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUsuarioLogueado({ ...usuarioLogueado, foto_perfil: data.url });
            } else {
                console.log('Error al subir la foto');
                setFotoPerfil(null);
                setFotoUrl("");
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
        setShow(false);
    };

    return (
        <div className='container-fluid'>
            <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 w-sm-75 mb-5'>
                <h3 className='title'>Editar perfil</h3>
                <hr />
                <Card className='rounded-0 p-0 border-0 bg-transparent'>

                    <div className='row p-3'>
                        <div className='d-flex flex-column align-items-center col-5 col-md-4'>
                            <div className='w-100 text-center'>
                                {fotoPerfil
                                    ? <Image src={fotoPerfil instanceof File
                                        ? URL.createObjectURL(fotoPerfil)
                                        : fotoPerfil}
                                        className='avatar mb-3 '
                                    />
                                    : <Image src={formData.foto_perfil}
                                        className='avatar mb-3 '
                                    />}
                                <Button variant="outline-secondary" onClick={handleShow}>Cambiar foto</Button>
                            </div>
                            <div></div>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Subir foto de perfil</Modal.Title>
                                </Modal.Header>
                                <Form>
                                    <Modal.Body><Form.Control type="file" name='foto_perfil' onChange={handleFoto} accept="image/*" /></Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={enviarFoto}>
                                            Guardar
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>

                        </div>
                    </div>
                    <hr />
                    <Form noValidate validated={false}>
                        <div className='row'>
                            <div className='col-md-6 mt-3'>
                                <Form.Group className="mb-3 texto" controlId="nombre">
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
                                        Este campo es obligatorio.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className='col-md-6 mt-3 texto'>
                                <Form.Group className="mb-3" controlId="apellidos">
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
                                        Este campo es obligatorio.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className='col-md-6 texto'>
                                <Form.Group className="mb-3 texto" controlId="fecha_nacimiento">
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
                            </div>
                            <div className='col-md-6 texto'>
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
                            </div>
                            <div className='col-md-6 texto'>
                                <BuscadorLocalidad
                                    formData={formData}
                                    setFormData={setFormData}
                                    handleFormChange={handleFormChange}
                                />
                            </div>
                            <div className='col-md-6 texto'>
                                <Form.Group className="mb-3" controlId="profesion">
                                    <Form.Label>Profesión</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='profesion'
                                        value={formData.profesion}
                                        onChange={handleFormChange}
                                        className='texto'
                                    />
                                </Form.Group>
                            </div>
                            <div className='col-12 texto'>
                                <Form.Group className="mb-3" controlId="idiomas">
                                    <Form.Label>Idiomas que hablo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='idiomas'
                                        value={formData.idiomas}
                                        onChange={handleFormChange}
                                        className='texto'
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="descripcion">
                                    <Form.Label>Sobre mi</Form.Label>
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
                                <Form.Group className="mb-3" controlId="por_que">
                                    <Form.Label>¿Por qué estoy en Wildies?</Form.Label>
                                    <Form.Control
                                        type="text"
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
                            </div>
                            <Link to={`/perfil/${usuarioLogueado.id}`} className='d-flex justify-content-center mt-3' style={{ textDecoration: "none" }}>
                                <Button className='col-4 border-0' style={{ backgroundColor: "#C8936Eff" }} type='submit' onClick={enviarDatos}>Enviar</Button>
                            </Link>
                        </div>
                    </Form>

                </Card>
            </div>
        </div >
    );
}

export default ActualizarPerfil;
