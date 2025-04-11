import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, Image } from 'react-bootstrap';
import { AppContext } from '../Context/AppProvider';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { useRef } from 'react';
import { GOOGLE_API_KEY } from '../App';
import { API_URL } from '../App';

const libraries = ["places"]; // Necesario para Places API

function ActualizarPerfil() {

    const { usuarioLogueado, setUsuarioLogueado } = useContext(AppContext);

    const autocompleteRef = useRef(null);

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
    })

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
            })

        }


    }, [usuarioLogueado]);

    function handleFormChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleLocalidad = () => {
        const localidad = autocompleteRef.current.getPlace();
        if (localidad && localidad.geometry) {
            setFormData({
                ...formData, localidad: localidad.formatted_address,
                latitud_domicilio: localidad.geometry.location.lat(),
                longitud_domicilio: localidad.geometry.location.lng()
            });

        }
    };

    async function enviarDatos() {
        let datos = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            fecha_nacimiento: formData.fecha_nacimiento,
            sexo: formData.sexo,
            profesion: formData.profesion,
            idiomas: formData.idiomas,
            longitud_domicilio: formData.longitud_domicilio,
            latitud_domicilio: formData.latitud_domicilio,
            foto_perfil: formData.foto_perfil,
            descripcion: formData.descripcion,
            por_que: formData.por_que
        };
        console.log(datos)
        try {
            let respuesta = await fetch(`${API_URL}/usuarios/${usuarioLogueado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
                
            })
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



    return (


        <div className='container-fluid'>
            <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 w-75'>
                <h3 className='title'>Editar perfil</h3>
                <hr />
                <Card className='rounded-0 p-0 border-0 bg-transparent'>
                    <Form>
                        <div className='row p-3'>
                            <div className='d-flex justify-content-around'>
                                <div className='col-3 text-center'>
                                    <Image src={formData.foto_perfil} roundedCircle className='image-fluid w-100 mb-3' />
                                </div>
                                <div className='d-flex flex-column justify-content-end col-md-6 text-center m-4'>
                                    <Form.Label className='mb-3'>Cambiar foto de perfil</Form.Label>
                                    <Form.Control type="file" name='foto_perfil' onChange={handleFormChange} />
                                </div>
                            </div>
                            <hr />
                            <div className='col-md-6 mt-3'>
                                <Form.Group className="mb-3 texto" controlId="nombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" name='nombre' value={formData.nombre} onChange={handleFormChange} />
                                </Form.Group>
                            </div>
                            <div className='col-md-6 mt-3 texto'>
                                <Form.Group className="mb-3" controlId="apellidos">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control type="text" name='apellidos' value={formData.apellidos} onChange={handleFormChange} />
                                </Form.Group>
                            </div>
                            <div className='col-md-6 texto'>
                                <Form.Group className="mb-3" controlId="fecha_nacimiento">
                                    <Form.Label>Fecha de nacimiento</Form.Label>
                                    <Form.Control type="date" name='fecha_nacimiento' value={formData.fecha_nacimiento} className='texto' onChange={handleFormChange} />
                                </Form.Group>
                            </div>
                            <div className='col-md-6 texto'>
                                <Form.Group className="mb-3" controlId="sexo">
                                    <Form.Label>Sexo</Form.Label>
                                    <Form.Control type="text" name='sexo' value={formData.sexo} onChange={handleFormChange} />
                                </Form.Group>
                            </div>
                            <div className='col-md-6 texto'>
                                <LoadScript
                                    googleMapsApiKey={GOOGLE_API_KEY}  // Reemplaza con tu clave de API
                                    libraries={libraries}
                                >
                                    <Form.Group className="mb-3" controlId="localidad">
                                        <Form.Label>Localidad</Form.Label>
                                        <Autocomplete
                                            onLoad={autocomplete => autocompleteRef.current = autocomplete}
                                            onPlaceChanged={handleLocalidad}
                                        >
                                            <Form.Control type="text" name='localidad' value={formData.localidad} onChange={handleFormChange} />
                                        </Autocomplete>
                                    </Form.Group>
                                </LoadScript>
                            </div>
                            <div className='col-md-6 texto'>
                                <Form.Group className="mb-3" controlId="profesion">
                                    <Form.Label>Profesión</Form.Label>
                                    <Form.Control type="text" name='profesion' value={formData.profesion} onChange={handleFormChange} />
                                </Form.Group>
                            </div>
                            <div className='col-12 texto'>
                                <Form.Group className="mb-3" controlId="idiomas">
                                    <Form.Label>Idiomas que hablo</Form.Label>
                                    <Form.Control type="text" name='idiomas' value={formData.idiomas} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="descripcion">
                                    <Form.Label>Sobre mi</Form.Label>
                                    <Form.Control type="textarea" name='descripcion' value={formData.descripcion} onChange={handleFormChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="por_que">
                                    <Form.Label>¿Por qué estoy en Wildies?</Form.Label>
                                    <Form.Control type="text" name='por_que' value={formData.por_que} onChange={handleFormChange} />
                                </Form.Group>
                            </div>
                            <div className='d-flex justify-content-center mt-3'>
                                <Button className='col-4 border-0' style={{ backgroundColor: "#C8936Eff" }} onClick={enviarDatos}>Enviar</Button>
                            </div>


                        </div>
                    </Form>
                </Card>
            </div>
        </div >

    )
}

export default ActualizarPerfil