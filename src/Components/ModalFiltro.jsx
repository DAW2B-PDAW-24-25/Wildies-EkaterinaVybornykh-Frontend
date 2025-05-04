import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Button, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import BuscadorLocalidad from './BuscadorLocalidad';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { AppContext } from '../Context/AppProvider';
import { useNavigate } from 'react-router-dom';
import SpinnerWave from './SpinnerWave';
import { RegContext } from '../Context/RegProvider';


function ModalFiltro({
    show,
    onHide,
    header,
    tipo,
    setTipo,
    setHeader,
    setShow,
    handleFormChange,

}) {

    const {
        usuarioLogueado,
        setTipoUsuarios,
        formData,
        setFormData,
        opcion,
        setOpcion,
        ageDisabled,
        setAgeDisabled,
        setTipoEventos,
        aplicarFiltros
    } = useContext(AppContext)

    const { deportes } = useContext(RegContext);

    const navigate = useNavigate();

    const [cargando, setCargando] = useState(false);

    function handleSwitchEdad() {
        if (ageDisabled) {
            setAgeDisabled(false);
            setFormData({ ...formData, edad_min: 30, edad_max: 60 })
        } else {
            setAgeDisabled(true);
            setFormData({ ...formData, edad_min: 18, edad_max: 100 })
        }
    }

    function handleOpcion() {
        setFormData({
            edad_min: 30,
            edad_max: 60,
            sexo: "",
            deportes: [],
            nivel: 0,
            longitud_domicilio: "",
            latitud_domicilio: "",
            distanciaMax: "",
            localidad: ""
        })
        setTipo("form");
        setHeader("Preferencias de búsqueda");
        setShow(true);
    }

    function handleSliderChange(name) {
        return (event, newValue) => {
            if (name === "edad") {
                setFormData({ ...formData, edad_min: newValue[0], edad_max: newValue[1] });
            } else if (name === "distancia") {
                setFormData({ ...formData, distanciaMax: newValue });
            }
        };
    };

    async function handleFiltrar(e) {
        e.preventDefault();
        setCargando(true);
        if (opcion === "wildies") {
            setTipoUsuarios("filtro");
            await aplicarFiltros();
            setCargando(false);
            onHide();
            navigate(`/resultadosUsuarios/${usuarioLogueado.id}`)
        } else {
            setTipoEventos("filtro");
            await aplicarFiltros();
            setCargando(false);
            onHide();
            navigate(`/resultadosEventos/${usuarioLogueado.id}`)
        }
    }

    if (cargando) {

        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }

    return (

        <Modal show={show}
            onHide={onHide}
            scrollable
            centered
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                {tipo === "opcion" &&

                    <ToggleButtonGroup type="radio" name="tipo" value={opcion} onChange={(val) => setOpcion(val)} className='d-flex justify-content-center'>
                        <ToggleButton id="tbg-btn-1" value={"wildies"} className='rounded-pill me-4 shadow' variant='outline-secondary'>
                            Wildies
                        </ToggleButton>
                        <ToggleButton id="tbg-btn-2" value={"eventos"} className='rounded-pill shadow' variant='outline-secondary'>
                            Aventuras
                        </ToggleButton>
                    </ToggleButtonGroup>
                }

                {tipo === "form" &&
                    <Form onSubmit={handleFiltrar}>
                        <BuscadorLocalidad
                            formData={formData}
                            setFormData={setFormData}
                            handleFormChange={handleFormChange}
                        />
                        <hr />
                        <Form.Group controlId="edad-range">
                            <Form.Label>Distancia</Form.Label>
                            <Slider className='slider'
                                valueLabelDisplay="auto"
                                min={0}
                                max={200}
                                value={formData.distanciaMax}
                                getAriaLabel={() => "Distancia"}
                                onChange={handleSliderChange("distancia")}

                            />
                        </Form.Group>
                        <hr />
                        <Form.Group controlId="edad-range">
                            <Form.Label>Edad</Form.Label>
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
                        <hr />
                        <Form.Group controlId="sexo">
                            <Form.Label>Sexo</Form.Label>
                            <ToggleButtonGroup type="radio" name="sexo" value={formData.sexo} onChange={(val) => setFormData({ ...formData, sexo: val })} className='d-flex justify-content-center'>
                                <ToggleButton id="tbg-btn-1" value={"mujer"} className='rounded-pill me-2 shadow' variant='outline-secondary'>
                                    Mujer
                                </ToggleButton>
                                <ToggleButton id="tbg-btn-2" value={"hombre"} className='rounded-pill me-2 shadow' variant='outline-secondary'>
                                    Hombre
                                </ToggleButton>
                                <ToggleButton id="tbg-btn-3" value={"indiferente"} className='rounded-pill shadow' variant='outline-secondary'>
                                    Indiferente
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>
                        <hr />

                        <Form.Group controlId="deportes">
                            <Form.Label>Deporte</Form.Label>
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
                        </Form.Group>
                        <hr />
                        <Form.Group controlId="nivel">
                            <Form.Label>Nivel mínimo</Form.Label>
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
                        <div className='d-flex justify-content-end'>
                            <Button variant="secondary" type='submit' className='mt-4'>
                                Aceptar
                            </Button>
                        </div>

                    </Form>
                }

            </Modal.Body>
            <Modal.Footer>
                {tipo === "opcion" &&
                    <Button variant="secondary" onClick={handleOpcion}>
                        Aceptar
                    </Button>
                }
                {tipo === "error" &&
                    <Button variant="secondary" onClick={onHide}>
                        Aceptar
                    </Button>
                }

            </Modal.Footer>
        </Modal>

    );
}


export default ModalFiltro