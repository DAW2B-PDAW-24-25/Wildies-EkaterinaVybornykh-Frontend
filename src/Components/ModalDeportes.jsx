import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import DeporteForm from './DeporteForm';

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
    setDeporte }) {

    function cambiarDeporte(value) {
        setIdDeporte(value);
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
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
                            usuarioLogueado.no_practica.map((deporte) => {
                                return <ToggleButton
                                    id={deporte.id}
                                    value={deporte.id}
                                    variant='outline-secondary'
                                    className="me-2 mb-2 rounded-pill col-3"
                                >
                                    {deporte.nombre}
                                </ToggleButton>
                            })
                        }
                    </ToggleButtonGroup>
                }
                {
                    tipo === "deporteForm" &&
                    <DeporteForm
                        deporte={deporte}
                    />
                }
            </Modal.Body>
            <Modal.Footer>
                {tipo === "eliminar" &&
                    <Button variant='outline-secondary' onClick={eliminarDeporte}>Eliminar</Button>
                }
                {tipo === "error" || tipo === "exito" &&
                    <Button variant='outline-secondary' onClick={onHide}>Aceptar</Button>
                }
                {tipo === "nuevo" &&
                    <>
                        <Button variant='outline-secondary' onClick={agregarDeporte}>Añadir</Button>
                        <Button variant='outline-secondary' onClick={onHide}>Cancelar</Button>
                    </>
                }
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDeportes