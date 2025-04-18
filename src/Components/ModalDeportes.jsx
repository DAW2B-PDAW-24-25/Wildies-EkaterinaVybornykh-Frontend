import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Form } from 'react-bootstrap';

function ModalDeportes({
    onHide,
    show,
    tipo,
    header,
    eliminarDeporte,
    agregarDeporte,
    idDeporte,
    setIdDeporte,
    usuarioLogueado,
    deporte,
    parametros,
    setParametros,
    enviarParametros,
    preguntas,
    respuestas,
    setRespuestas,
    enviarResultados
}) {

    const [validated, setValidated] = useState(false);

    function cambiarDeporte(value) {
        setIdDeporte(value);
    }

    function handleParametros(e) {
        setParametros({ ...parametros, [e.currentTarget.id]: e.currentTarget.value })
    }

    function handleEnviar() {
        enviarParametros();
    }

    function handleRespuestas(e) {
        setRespuestas({ ...respuestas, [e.currentTarget.name]: parseInt(e.currentTarget.value) })
    }

    function handleResultado(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return;
        }
         enviarResultados();
    }


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable 
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='title'>
                    {header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    tipo === "nuevo" &&
                    <ToggleButtonGroup
                        type="radio"
                        name="opciones"
                        value={idDeporte}
                        onChange={cambiarDeporte}
                        className="d-flex flex-wrap row"
                    >
                        {
                            usuarioLogueado?.no_practica?.map((deporte) => {
                                return <ToggleButton
                                    id={deporte.id}
                                    value={deporte.id}
                                    variant='outline-secondary'
                                    className="me-2 mb-2 rounded-pill shadow col-3"
                                >
                                    {deporte.nombre}
                                </ToggleButton>
                            })
                        }
                    </ToggleButtonGroup>
                }
                {
                    (tipo === "deporteForm" || tipo === "editar") &&
                    <Form>
                        {deporte?.parametros?.map((parametro, index) => {

                            return <Form.Group key={index} className="mb-3">
                                <Form.Label>{parametro.nombre}: </Form.Label>
                                <Form.Control type="text" id={parametro.id} value={parametros[parametro.id]} onChange={handleParametros} />
                            </Form.Group>
                        })}
                    </Form>
                }
                {
                    (tipo === "test") &&
                    <Form onSubmit={handleResultado}>
                        {preguntas?.map((pregunta, index) => (
                            <div key={index} >
                                <h5>{pregunta.pregunta}</h5>
                                <div className="mb-3">
                                    {pregunta.respuestas.map((respuesta, i) => {
                                        return <>
                                            <Form.Check
                                                key={i}
                                                type="radio"
                                                id={respuesta.id}
                                                name={pregunta.id}
                                                label={respuesta.texto}
                                                value={respuesta.id}
                                                onChange={handleRespuestas}
                                                required={i === 0}
                                                isInvalid={validated && !respuestas[pregunta.id]}

                                            />
                                        </>
                                    })}

                                </div>
                            </div>
                        ))}
                        <div className='d-flex justify-content-between ms-4 me-4 mt-3'>
                            <Button type='submit' variant='outline-secondary'>Obtener resultado</Button>
                            <Button variant='outline-secondary' onClick={onHide}>Cancelar</Button>
                        </div>

                    </Form>
                }

            </Modal.Body>
            <Modal.Footer>
                {tipo === "eliminar" &&
                    <Button variant='outline-secondary' onClick={eliminarDeporte}>Eliminar</Button>
                }
                {(tipo === "error" || tipo === "exito") &&
                    <Button variant='outline-secondary' onClick={onHide}>Aceptar</Button>
                }
                {tipo === "nuevo" &&
                    <>
                        <Button variant='outline-secondary' onClick={agregarDeporte}>Añadir</Button>
                        <Button variant='outline-secondary' onClick={onHide}>Cancelar</Button>
                    </>
                }
                {(tipo === "deporteForm" || tipo === "editar") &&
                    <Button variant='outline-secondary' onClick={handleEnviar}>Enviar</Button>
                }

            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeportes