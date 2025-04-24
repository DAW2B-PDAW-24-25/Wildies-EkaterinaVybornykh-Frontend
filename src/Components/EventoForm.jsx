import { dialogClasses, Slider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { LuBadgePlus } from "react-icons/lu";
import { AppContext } from '../Context/AppProvider';
import BuscadorLocalidad from './BuscadorLocalidad';
import { Button, Card, Form, Image, Modal, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PiEyeClosedFill } from 'react-icons/pi';
import { API_URL } from '../App';


function EventoForm() {
  const { usuarioLogueado, setEvento } = useContext(AppContext);
  const [formData, setFormData] = useState({
    deporte_id: "",
    nombre: "",
    fecha: "",
    sexo_participantes: "indiferente",
    longitud_domicilio: "",
    latitud_domicilio: "",
    nivel: 0,
    edad_min: 18,
    edad_max: 100,
    max_participantes: 2,
    descripcion: "",
    foto_portada: null,
    localidad: ""

  });
  const [validated, setValidated] = useState(false);
  const { deportes } = useContext(AppContext);
  const [ageDisabled, setAgeDisabled] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  function handleSwitchEdad() {
    if (ageDisabled) {
      setAgeDisabled(false);
      setFormData({ ...formData, edad_min: 30, edad_max: 60 })
    } else {
      setAgeDisabled(true);
      setFormData({ ...formData, edad_min: 18, edad_max: 100 })
    }
  }
  function handleSliderChange(name) {
    return (event, newValue) => {
      setFormData({ ...formData, edad_min: newValue[0], edad_max: newValue[1] });
    };
  };

  async function enviarDatos(e) {        
    const form = e.currentTarget.form;
    if (!formData.fecha || new Date(formData.fecha) < new Date()) {
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

    const datos = new FormData();
    datos.append('deporte_id', formData.deporte_id);
    datos.append('nombre', formData.nombre);
    datos.append('fecha', formData.fecha);
    datos.append('sexo_participantes', formData.sexo_participantes);
    datos.append('longitud', formData.longitud_domicilio);
    datos.append('latitud', formData.latitud_domicilio);
    datos.append('nivel', formData.nivel);
    datos.append('edad_min', formData.edad_min);
    datos.append('edad_max', formData.edad_max);
    datos.append('max_participantes', formData.max_participantes);
    datos.append('descripcion', formData.descripcion);
    datos.append('foto_portada', formData.foto_portada);

    for (let [clave, valor] of datos.entries()) {
      console.log(`${clave}:`, valor);
    }

    try {
      let respuesta = await fetch(`${API_URL}/crearEvento/${usuarioLogueado.id}`, {
        method: 'POST',
        body: datos
      });
      if (!respuesta.ok) {
        console.log('Error al enviar los datos');
      }
      let data = await respuesta.json();
      console.log('Respuesta de la API:', data);
      setEvento(data.data)
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleFoto(e) {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({ ...formData, foto_portada: file })
     
    }
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  return (
    <div className='container-fluid'>
      <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 w-sm-75 mb-5'>
        <h3 className='title'>Crea aventura</h3>
        <hr />
        <Card className='rounded-0 p-3 border-0 bg-transparent'>
          <Form noValidate validated={false}>
            <div className='row p-3'>
              <div className='col-sm-6'>
                <div style={{ width: "250px", height: "150px" }}
                  className='bg-secondary rounded d-flex justify-content-center align-items-center'
                  role="button"
                  onClick={handleShow}
                >
                  {formData.foto_portada
                    ? <Image src={formData.foto_portada instanceof File
                      ? URL.createObjectURL(formData.foto_portada)
                      : formData.foto_portada}
                      className='rounded'
                    />
                    :
                    <div className='text-center'>
                      <LuBadgePlus className='text-light mb-2' style={{ fontSize: "4vh" }} />
                      <p className='text-light'>Añadir foto</p>
                    </div>
                  }
                </div>
              </div>

              <div className='col-sm-6'>
                <Form.Group className="mb-3 texto" controlId="nombre">
                  <Form.Label className='mb-4 text-center w-100'>Dale nombre a tu aventura</Form.Label>
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
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Subir foto de portada</Modal.Title>
              </Modal.Header>

              <Modal.Body><Form.Control type="file" name='foto_portada' onChange={handleFoto} accept="image/*" /></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Guardar
                </Button>
              </Modal.Footer>

            </Modal>
            <hr />

            <div className='row'>

              <div className='mt-3 mb-4 texto'>
                <Form.Group controlId="deportes">
                  <Form.Label>Elige un deporte</Form.Label>
                  <ToggleButtonGroup
                    type="radio"
                    name='deporte'
                    value={formData.deporte_id}
                    onChange={(val) => setFormData({ ...formData, deporte_id: val })}
                    className="d-flex flex-wrap row ms-2"
                    required
                    isInvalid={validated && !formData.deporte_id}
                  >
                    {deportes?.map((deporte) => {
                      return <ToggleButton key={deporte.id} 
                      id={`deporte-${deporte.id}`} 
                      value={deporte.id} 
                      className="me-1 mb-2 rounded-pill shadow col-3" 
                      variant='outline-secondary'>
                        {deporte.nombre}
                      </ToggleButton>
                    })}
                  </ToggleButtonGroup>
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>

              </div>
              <div className='mb-4'>
                <Form.Group controlId="nivel">
                  <Form.Label className='texto'>Nivel mínimo</Form.Label>
                  <ToggleButtonGroup type="radio" name="nivel" value={formData.nivel} onChange={(val) => setFormData({ ...formData, nivel: val })} className='d-flex justify-content-center'>
                    {
                      [0, 1, 2, 3, 4, 5].map((nivel) => {
                        return <ToggleButton key={nivel} id={`nivel-${nivel}`} value={nivel} className='rounded-pill me-2 p-0 shadow' variant='outline-secondary'>
                          {nivel}
                        </ToggleButton>
                      })
                    }
                  </ToggleButtonGroup>
                </Form.Group>
              </div>
              <hr />
              <div className='col-sm-6 texto mb-3'>
                <Form.Group className="mb-3 texto" controlId="fecha_nacimiento">
                  <Form.Label>Cuando</Form.Label>
                  <Form.Control
                    type="date"
                    name='fecha'
                    value={formData.fecha}
                    className='texto'
                    onChange={handleFormChange}
                    required
                    isInvalid={validated && (!formData.fecha || new Date(formData.fecha) < new Date())}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formData.fecha ? 'La fecha de evento no puede ser inferior a la fecha actual' : 'Este campo es obligatorio.'}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className='col-sm-6 texto'>
                <BuscadorLocalidad
                  formData={formData}
                  setFormData={setFormData}
                  handleFormChange={handleFormChange}
                  required
                  isInvalid={validated && !formData.localidad}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>

              </div>

              <hr />
              <div className='col-sm-6 texto mt-3'>
                <Form.Label>Sexo de participantes</Form.Label>
                <Form.Select
                  className="mb-3 texto"
                  aria-label="Sexo"
                  name='sexo_participantes'
                  value={formData.sexo_participantes}
                  onChange={handleFormChange}
                >
                  <option>Selecciona...</option>
                  <option value="mujer">Mujer</option>
                  <option value="hombre">Hombre</option>
                  <option value="indiferente">Indiferente</option>
                </Form.Select>
              </div>

              <div className='col-sm-6 texto mb-4 mt-3'>
                <Form.Group controlId="edad-range">
                  <Form.Label>Número máximo de participantes</Form.Label>
                  <Form.Control type='number' 
                  max={1000} 
                  min={2} 
                  name='max_participantes'
                  value={formData.max_participantes} 
                  onChange={handleFormChange}>
                  </Form.Control>
                 
                </Form.Group>
              </div>
              <div className=' texto mb-4 mt-3'>
                <Form.Group controlId="edad-range">
                  <Form.Label>Edad de los participantes</Form.Label>
                  <div className='row'>
                    <div className='col-7 me-2'>
                      <Slider className='slider'
                        valueLabelDisplay="auto"
                        min={18}
                        max={100}
                        value={[formData.edad_min, formData.edad_max]}
                        getAriaLabel={() => "Edad"}
                        onChange={handleSliderChange("edad")}
                        disabled={ageDisabled}
                      />
                    </div>
                    <div className='col-4 ms-2 d-flex align-items-center'>
                      <Form.Check className='switch'
                        type="switch"
                        id="indiferente"
                        label="Indiferente"
                        onChange={handleSwitchEdad}
                      />
                    </div>
                  </div>
                </Form.Group>
              </div>
              <hr />
              <div className='col-12 texto mt-3'>
                <Form.Group className="mb-3" controlId="descripcion">
                  <Form.Label>Cuentales a todos sobre tu aventura</Form.Label>
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
              </div>
              <Link to={`/perfil/${usuarioLogueado.id}`} className='d-flex justify-content-center mt-3' style={{ textDecoration: "none" }}>
                <Button className='col-4 border-0' style={{ backgroundColor: "#C8936Eff" }} type='submit' onClick={enviarDatos}>Crear</Button>
              </Link>
            </div>
          </Form>

        </Card>
      </div >
    </div >
  )
}

export default EventoForm