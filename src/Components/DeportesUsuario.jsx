import React from 'react';
import { useContext, useState } from 'react';
import { AppContext } from '../Context/AppProvider';
import { Button } from 'react-bootstrap';
import ModalDeportes from './ModalDeportes';
import { API_URL } from '../App';

function DeportesUsuario() {
    const { usuarioLogueado, setUsuarioLogueado } = useContext(AppContext);
    const [modalShow, setModalShow] = useState(false);
    const [modalTipo, setModalTipo] = useState("");
    const [modalHeader, setModalHeader] = useState("");
    const [deporte, setDeporte] = useState("");

    const [usuarioDeporteId, setUsuarioDeporteId] = useState("");
    const [idDeporte, setIdDeporte] = useState("");

    function modalEliminar(e) {
        setModalTipo("eliminar");
        setModalHeader("Se va a eliminar el deporte");
        setUsuarioDeporteId(e.currentTarget.id);
        setModalShow(true);
    }

    async function eliminarDeporte() {
        setModalShow(false);
        const response = await fetch(`${API_URL}/usuarios/${usuarioLogueado.id}/${usuarioDeporteId}`, {
            method: "DELETE",
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token}` 
        });
        if (!response.ok) {
            mostrarModalError();
        } else {
            setModalTipo("exito");
            setModalHeader("El deporte eliminado con éxito");

            const data = await response.json();
            setUsuarioLogueado(data.data);
            setModalShow(true);
        }
    }

    function mostrarModalError() {
        setModalTipo("error");
        setModalHeader("Ha ocurrido un error. Ponte en contacto con nuestro equipo");

        setModalShow(true);
    }

    function modalAgregarDeporte() {
        setModalTipo("nuevo");
        setModalHeader("Elige un deporte");
        setModalShow(true);
    }

    async function agregarDeporte() {
        const response = await fetch(`${API_URL}/usuarios/${usuarioLogueado.id}/${idDeporte}`, {
            method: "POST",
            "Content-Type": "application/json",
            //"Authorization": `Bearer ${token}` 
        })
        if (!response.ok) {
            mostrarModalError();
        } else {
            const data = await response.json();
            setUsuarioLogueado(data.data);
            cargarDeporte();
            setModalTipo("deporteForm");
            setModalHeader("Contesta a este breve cuestionario");
            setModalShow(true);         
        }
    }

    async function cargarDeporte() {
        const response = await fetch(`${API_URL}/deportes/${idDeporte}`);
        if (!response.ok) {
            mostrarModalError();
        } else {
            const data = await response.json();
            setDeporte(data.data);
        }
    }

    return (
        <div className='container-fluid min-vh-100'>
            <div className='d-flex justify-content-between m-4 align-items-center'>
                <div>
                    <h1>Deportes que practico</h1>
                </div>
                <div className='me-3'>
                    <Button variant='outline-secondary' onClick={modalAgregarDeporte}>Añadir deporte</Button>
                </div>

            </div>

            <hr />
            {usuarioLogueado.deportes.length === 0 &&
                <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4'>
                    <h3>Todavía no has añadido deportes</h3>
                </div>
            }
            {usuarioLogueado.deportes.map((deporte) => {
                return <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4'>
                    <div className='d-flex m-2 justify-content-between'>
                        <h3 className='title'>{deporte.deporte}</h3>
                        {deporte.nivel &&
                            <h5 className='me-4'>Nivel: {deporte.nivel}</h5>}
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <div>
                            {deporte.parametros.map((parametro) => {
                                return <div className='d-flex'>
                                    <p><strong>{parametro.nombre}:</strong> {parametro.valor}</p>
                                </div>
                            })}
                        </div>
                        <div>
                            {!deporte.nivel &&
                                <Button variant='outline-secondary' className='me-2'>Realizar Test</Button>
                            }

                            <Button variant='outline-secondary' className='me-2' id={deporte.usuario_deporte_id}>Editar</Button>
                            <Button variant='outline-secondary' id={deporte.usuario_deporte_id} className='me-2' onClick={modalEliminar}>Eliminar</Button>
                        </div>
                    </div>


                </div>

            })}

            <ModalDeportes
                show={modalShow}
                onHide={() => setModalShow(false)}
                tipo={modalTipo}
                header={modalHeader}
                eliminarDeporte={eliminarDeporte}
                agregarDeporte={agregarDeporte}
                idDeporte={idDeporte}
                setIdDeporte={setIdDeporte}
                usuarioLogueado={usuarioLogueado}
                deporte={deporte}
                setDeporte={setDeporte}
            />
        </div>
    )
}

export default DeportesUsuario