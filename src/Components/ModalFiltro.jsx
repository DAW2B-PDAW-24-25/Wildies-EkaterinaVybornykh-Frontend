import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Button, Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import BuscadorLocalidad from './BuscadorLocalidad';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { AppContext } from '../Context/AppProvider';


function ModalFiltro({
    show,
    onHide,
    header,
    tipo,
    setTipo,
    setHeader,
    setShow,
    formData,
    setFormData,
    handleFormChange,
    opcion,
    setOpcion
}) {

    const [ageDisabled, setAgeDisabled] = useState(false);
    const { deportes } = useContext(AppContext)

    function handleSwitchEdad() {
        if (ageDisabled) {
            setAgeDisabled(false);
        } else {
            setAgeDisabled(true);
        }
    }

    function handleOpcion() {
        setFormData({      //antes de enviar al back eliminar localidad
            edad_min: 30,
            edad_max: 60,
            sexo: "",
            deportes: [],
            nivel: "",
            longitud_domicilio: "",         //antes de enviar al back quitar domicilio, solo longitud
            latitud_domicilio: "",
            distanciaMax: ""
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

    function handleFiltrar(){

    }

    return (

        <Modal show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {tipo === "opcion" &&

                    <ToggleButtonGroup type="radio" name="tipo" value={opcion} onChange={(val) => setOpcion(val)} className='d-flex justify-content-center'>
                        <ToggleButton id="tbg-btn-1" value={"wildies"} className='rounded-pill me-4' variant='outline-secondary'>
                            Wildies
                        </ToggleButton>
                        <ToggleButton id="tbg-btn-2" value={"eventos"} className='rounded-pill' variant='outline-secondary'>
                            Aventuras
                        </ToggleButton>
                    </ToggleButtonGroup>
                }

                {tipo === "form" &&
                    <Form>
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
                        <Form.Group controlId="edad-range">
                            <Form.Label>Sexo</Form.Label>
                            <ToggleButtonGroup type="radio" name="tipo" value={formData.sexo} onChange={(val) => setFormData({ ...formData, sexo: val })} className='d-flex justify-content-center'>
                                <ToggleButton id="tbg-btn-1" value={"mujer"} className='rounded-pill me-2' variant='outline-secondary'>
                                    Mujer
                                </ToggleButton>
                                <ToggleButton id="tbg-btn-2" value={"hombre"} className='rounded-pill me-2' variant='outline-secondary'>
                                    Hombre
                                </ToggleButton>
                                <ToggleButton id="tbg-btn-3" value={"indiferente"} className='rounded-pill' variant='outline-secondary'>
                                    Indiferente
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Form.Group>
                        <hr />

                        <Form.Group controlId="deportes">
                            <Form.Label>Deporte</Form.Label>
                            <ToggleButtonGroup
                                type="checkbox"
                                value={formData.deportes}
                                onChange={(val) => setFormData({ ...formData, deportes: val })}
                                className="d-flex flex-wrap row ms-2"
                            >
                                {deportes?.map((deporte) => {
                                    return <ToggleButton id={deporte.id} value={deporte.id} className="me-1 mb-2 rounded-pill col-3" variant='outline-secondary'>
                                        {deporte.nombre}
                                    </ToggleButton>
                                })}
                            </ToggleButtonGroup>
                        </Form.Group>

                    </Form>
                }

                {tipo === "eventos"}
            </Modal.Body>
            <Modal.Footer>
                {tipo === "opcion" &&
                    <Button variant="secondary" onClick={handleOpcion}>
                        Aceptar
                    </Button>
                }

                {tipo === "form" &&
                    <Button variant="secondary" onClick={handleFiltrar}>
                        Aceptar
                    </Button>
                }

            </Modal.Footer>
        </Modal>

    );
}


export default ModalFiltro