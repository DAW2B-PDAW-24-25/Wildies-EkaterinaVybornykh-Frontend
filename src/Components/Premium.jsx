import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Modal } from 'react-bootstrap';
import { API_URL } from '../App';
import { RegContext } from '../Context/RegProvider';

function Premium() {
    const { id } = useParams();
    const { setUsuarioLogueado, token } = useContext(RegContext);
    const [modalHeader, setModalHeader] = useState("");
    const [modalBody, setModalBody] = useState("");
    const [tipoModal, setTipoModal] = useState("");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function convertirAPremium() {
        let response = await fetch(`${API_URL}/usuarios/premium/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            console.log("Error al convertir a premium")
            setTipoModal("error");
            setModalHeader("Ha ocurrido un error");
            setModalBody("Ponte en contacto con nuestro equipo");
            handleShow();
        } else {

            let data = await response.json();
            setTipoModal("exito")
            setModalHeader("");
            setModalBody("Ya puedes disfrutar de tus ventajas Premium");
            handleShow();
            setUsuarioLogueado(data.data);
            
        }
    }

    function handlePremiumButton() {
        setTipoModal("aviso");
        setModalHeader("Estás a un paso de Premium");
        setModalBody("Se te van a cobrar 19,99€");
        handleShow();
    }

    function handleExito(){
        handleClose();
        navigate('/');
    }

    return (
        <div className='container-fluid min-vh-100'>
            <div className='d-flex justify-content-end mt-2 mb-3 me-5'>
                <Button variant="secondary" className="shadow" onClick={() => navigate(-1)}>Volver</Button>
            </div>
            <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 w-sm-75 mb-5 bg-seccion w-75'>
                <Card className='rounded-0 p-0 border-0 bg-transparent'>
                    <div className='row mb-4 w-100'>
                        <div className="w-100">
                            <h3 className='title'>Conviértete en Premium</h3>
                            <hr />
                            <h5 className='texto mb-4'><strong>Ventajas de ser premium: </strong></h5>
                            <ul>
                                <li className='texto mb-2'>Crea tus propias aventuras</li>
                                <li className='texto mb-2'>Consigue acceso a un mapa interactivo de todas tus actividades</li>
                                <li className='texto mb-2'>Sube y comparte fotos de tus aventuras</li>
                            </ul>
                            <h5 className='texto mb-4'><strong>Precio: </strong>19.99€ al año</h5>
                            <div className='d-flex justify-content-center'>
                                <Button variant='secondary' className="rounded-pill shadow" onClick={handlePremiumButton}>Hazte Premium</Button>
                            </div>

                        </div>
                    </div>
                </Card>
            </div>
            <Modal show={show}>
                <h3 className='title m-3'>
                    {modalHeader}
                </h3>
                <Modal.Body>
                    {modalBody}
                </Modal.Body>
                <div className='d-flex justify-content-end m-3'>
                    {
                        tipoModal === "aviso" &&
                        <Button variant="secondary" className='me-2 shadow' onClick={convertirAPremium}>
                            Aceptar
                        </Button>
                    }
                    {
                        tipoModal === "exito" &&
                        <Button variant="secondary" className='me-2 shadow' onClick={handleExito}>
                            Aceptar
                        </Button>
                    }

                    <Button variant="secondary" className='me-2 shadow' onClick={handleClose}>
                        Cancelar
                    </Button>
                </div>




            </Modal>
        </div>

    )
}
export default Premium