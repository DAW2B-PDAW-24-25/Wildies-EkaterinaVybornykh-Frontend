import { dialogClasses, Slider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { LuBadgePlus } from "react-icons/lu";
import { AppContext } from '../Context/AppProvider';
import BuscadorLocalidad from './BuscadorLocalidad';
import { Button, Card, Form, Image, Modal, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PiEnvelopeSimpleOpenThin, PiEyeClosedFill } from 'react-icons/pi';
import { API_URL } from '../App';
import { RegContext } from '../Context/RegProvider';

function EventoForm() {
  const { id } = useParams();
  const { setEvento, evento } = useContext(AppContext);
  const { usuarioLogueado } = useContext(RegContext);
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
  const { deportes } = useContext(RegContext);
  const [ageDisabled, setAgeDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [tipoModal, setTipoModal] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (id) {
      setFormData({
        deporte_id: evento.deporte_id,
        nombre: evento.nombre,
        fecha: evento.fecha,
        sexo_participantes: evento.sexo_participantes,
        longitud_domicilio: evento.longitud,
        latitud_domicilio: evento.latitud,
        nivel: evento.nivel,
        edad_min: evento.edad_min,
        edad_max: evento.edad_max,
        max_participantes: evento.max_participantes,
        descripcion: evento.descripcion,
        foto_portada: evento.foto_portada,
        localidad: evento.localidad

      })

    } else {
      setFormData({
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

      })
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    e.preventDefault();
    const form = e.currentTarget.form;
    if (!formData.fecha || new Date(formData.fecha) < new Date()) {
      console.log("No pasé validacion de fecha")
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    if (form.checkValidity() === false || !formData.deporte_id || !formData.localidad) {
      console.log("No pasé validacion")
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
    if (formData.foto_portada) {
      datos.append('foto_portada', formData.foto_portada);
    }

    for (let [clave, valor] of datos.entries()) {
      console.log(`${clave}:`, valor);
    }


    try {
      let respuesta = "";
      if (id) {
        respuesta = await fetch(`${API_URL}/eventos/${id}/${usuarioLogueado.id}`, {
          method: 'POST',
          body: datos
        });
      } else {
        respuesta = await fetch(`${API_URL}/crearEvento/${usuarioLogueado.id}`, {
          method: 'POST',
          body: datos
        });
      }

      if (!respuesta.ok) {
        console.log('Error al enviar los datos');
      } else {
        let data = await respuesta.json();
        console.log('Respuesta de la API:', data);
        setEvento(data.data)
        setTipoModal("exito");
        if (id) {
          setModalHeader("Evento editado con éxito!")
        } else {
          setModalHeader("Evento creado con éxito!")
        }

        handleShow();
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleSubirFoto() {
    setTipoModal("form");
    setModalHeader("Subir foto de portada");
    handleShow();
  }

  function handleFoto(e) {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData({ ...formData, foto_portada: file })

    }
  }

  function handleExito() {
    handleClose();
    navigate(`/detalleEvento/${evento.id}`)
  }

  useEffect(() => {
    console.log("Evento:", evento)
  }, [evento])



  return (
    <div className='container-fluid'>
      <div className='row p-4 rounded shadow d-flex ms-3 me-3 mt-4 w-sm-75 mb-5 bg-light'>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            {
              id
                ? <h3 className='title'>Edita aventura</h3>
                : <h3 className='title'>Crea aventura</h3>
            }

          </div>
          <div className='col-sm-2 mt-2 mb-3'>
            <Button variant="secondary" className="shadow" onClick={() => navigate(-1)}>Volver</Button>
          </div>
        </div>
        <hr />
        <Card className='rounded-0 p-3 border-0 bg-transparent'>
          <Form noValidate validated={false}>
            <div className='row p-2 d-flex justify-content-center'>
              <div className='col-lg-4 col-6'>
                <div style={{ width: "100%", height: "150px" }}
                  className='bg-secondary rounded d-flex justify-content-center align-items-center'
                  role="button"
                  onClick={handleSubirFoto}
                >
                  {formData.foto_portada
                    ? <Image src={formData.foto_portada instanceof File
                      ? URL.createObjectURL(formData.foto_portada)
                      : formData.foto_portada}
                      className='rounded'
                      style={{ 
                        width: '100%',
                        height: '100%', 
                        objectFit: "cover" }}
                    />
                    :
                    <div className='text-center'>
                      <LuBadgePlus className='text-light mb-2' style={{ fontSize: "4vh" }} />
                      <p className='text-light'>Añadir foto</p>
                    </div>
                  }
                </div>
              </div>

              <div className='col-sm-6 col-lg-8'>
                <Form.Group className=" mt-4 texto d-flex flex-column align-items-center" controlId="nombre">
                  <Form.Label className='mb-sm-4 text-center w-100'>Dale nombre a tu aventura</Form.Label>
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
              </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{modalHeader}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {
                  tipoModal === "form" &&
                  <Form.Control type="file" name='foto_portada' onChange={handleFoto} accept="image/*" />
                }
              </Modal.Body>
              <Modal.Footer>
                {tipoModal === "form"
                  ? <Button variant="secondary" onClick={handleClose}>
                    Guardar
                  </Button>
                  : <Button variant="secondary" onClick={handleExito}>
                    Aceptar
                  </Button>
                }

              </Modal.Footer>

            </Modal>


            <hr />

            <div className='row'>

              <div className='mt-4 mb-4 texto'>
                <Form.Group controlId="deportes">
                  <Form.Label>Elige un deporte</Form.Label>
                  <ToggleButtonGroup
                    type="radio"
                    name="deporte"
                    value={formData.deporte_id}
                    onChange={(val) => setFormData({ ...formData, deporte_id: val })}
                    className="d-flex flex-wrap gap-2 ms-2"
                  >
                    {deportes?.map((deporte) => (
                      <ToggleButton
                        key={deporte.id}
                        id={`deporte-${deporte.id}`}
                        value={deporte.id}
                        className="rounded-pill shadow"
                        variant="outline-secondary"
                      >
                        {deporte.nombre}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Form.Group>

                {validated && !formData.deporte_id && (
                  <div className="invalid-feedback d-block">Elige un deporte</div>
                )}

              </div>
              <div className='mb-5 mt-2'>
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
              <div className='col-sm-6 texto mt-4 mb-4'>
                <Form.Group className="texto" controlId="fecha">
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
                    {formData.fecha ? 'La fecha de evento no puede ser inferior a la fecha actual' : 'Elige una fecha'}
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className='col-sm-6 texto mt-4 mb-4'>
                <BuscadorLocalidad
                  formData={formData}
                  setFormData={setFormData}
                  handleFormChange={handleFormChange}

                />
                {validated && !formData.localidad && (
                  <div className="invalid-feedback d-block m-0">Ubicación es obligatoria</div>
                )}


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
                  required
                  isInvalid={validated && !formData.sexo_participantes}
                >
                  <option>Selecciona...</option>
                  <option value="mujer">Mujer</option>
                  <option value="hombre">Hombre</option>
                  <option value="indiferente">Indiferente</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
              </div>

              <div className='col-sm-6 texto mb-4 mt-3'>
                <Form.Group controlId="edad-range">
                  <Form.Label>Número máximo de participantes</Form.Label>
                  <Form.Control type='number'
                    max={1000}
                    min={2}
                    name='max_participantes'
                    value={formData.max_participantes}
                    onChange={handleFormChange}
                    required
                    isInvalid={validated && !formData.max_participantes && formData.max_participantes < 2 && formData.max_participantes > 1000}
                  >
                  </Form.Control>
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio.
                </Form.Control.Feedback>
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
              <div className='d-flex justify-content-center mt-3'>
                <Button className='col-4 border-0' style={{ backgroundColor: "#C8936Eff" }} type='submit' onClick={enviarDatos}>{id ? `Editar` : 'Crear'}</Button>
              </div>
            </div>
          </Form>

        </Card>
      </div >
    </div >
  )
}

export default EventoForm