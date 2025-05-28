import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiLeaf } from "react-icons/bi";
import { GoBriefcase } from "react-icons/go";
import { LuLanguages } from "react-icons/lu";
import { Button, Image, Modal } from "react-bootstrap";
import { API_URL } from '../App';



function PerfilLogueado({ usuario, logout, modalTipo, modalMensaje, setModalTipo, setModalMensaje, usuarioLogueado, token }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    async function eliminarPerfil() {
        setShow(false);
        const respuesta = await fetch(`${API_URL}/usuarios/${usuarioLogueado.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        );
        if (!respuesta.ok) {
            setModalTipo("error");
            setModalMensaje("Error al eliminar la cuenta. Ponte en contacto con nuestro equipo.");
            setShow(true);
        } else {
            let data = await respuesta.json();
            console.log(data);
            setModalTipo("exito");
            setModalMensaje("Cuenta eliminada con éxito");
            setShow(true);
        }
    }

    function modalEliminar() {
        setModalTipo("eliminar");
        setModalMensaje("Atención! Se va a eliminar el perfil");
        setShow(true);
    }

    function borrarDatos() {
        setShow(false);
        logout();
    }

    return (
        <div className='container-fluid min-vh-100'>
            <div className='row m-md-3'>
                <div className='col-12 col-md-4 d-flex flex-column align-items-center'>
                    <Image src={usuario.foto_perfil} className='avatar_big m-3' />
                    <h1 className='mt-2 d-md-none text-center'>{usuario.nombre} {usuario.apellidos}</h1>
                    <p>{usuario.localidad}</p>
                    <div className='d-flex justify-content-center mt-3 d-md-none flex-wrap'>
                        <Button variant="outline-secondary" className='me-2 mb-2 rounded-pill shadow' onClick={() => navigate(`/deportesUsuario/${usuario.id}`)}>Deportes</Button>
                        <Button variant="outline-secondary" className='me-2 mb-2 rounded-pill shadow' onClick={() => navigate(`/editarPerfil/${usuario.id}`)}>Editar</Button>
                        <Button variant="outline-secondary" className='mb-2 rounded-pill shadow' onClick={modalEliminar}>Eliminar Perfil</Button>
                    </div>
                </div>
                <div className='d-none d-md-flex flex-column col-md-8 text-center justify-content-between'>
                    <h1 className='mt-2'>{usuario.nombre} {usuario.apellidos}</h1>
                    <div className='d-flex justify-content-center mb-md-5'>
                        <Button variant="outline-secondary" className='me-2 mb-2 rounded-pill shadow' onClick={() => navigate(`/deportesUsuario/${usuario.id}`)}>Deportes</Button>
                        <Button variant="outline-secondary" className='me-2 mb-2 rounded-pill shadow' onClick={() => navigate(`/editarPerfil/${usuario.id}`)}>Editar Perfil</Button>
                        <Button variant="outline-secondary" className='rounded-pill shadow mb-2' onClick={modalEliminar}>Eliminar perfil</Button>
                    </div>
                </div>
            </div>

            <hr />
            <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3'>
                <div className='d-flex flex-column justify-content-center col-sm-6'>
                    <div className='d-flex justify-content-start'>
                        <BiLeaf className='me-2' /><p><strong>Edad:</strong> {usuario.edad} años</p>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <GoBriefcase className='me-2' /><p><strong>Profesión:</strong> {usuario.profesion}</p>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <LuLanguages className='me-2' /><p><strong>Hablo:</strong> {usuario.idiomas}</p>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <div>
                        {usuario.deportes.map((deporte, index) => {
                            return <p key={index}>
                                <strong>{deporte.deporte}</strong> {deporte.nivel && `: nivel ${deporte.nivel}`}
                            </p>
                        })}
                    </div>
                </div>
            </div>
            <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4'>
                <h3 className='title'>Sobre mí</h3>
                <hr />
                <div>
                    <p>{usuario.descripcion}</p>
                </div>
            </div>
            <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4 mb-5'>
                <h3 className='title'>¿Por qué estoy en wildies?</h3>
                <hr />
                <div>
                    <p>{usuario.por_que}</p>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{modalMensaje}</Modal.Title>
                </Modal.Header>

                {modalTipo === "eliminar" &&
                    <Modal.Body>Si eliminas el perfil vas a perder todos los datos asociados a la cuenta</Modal.Body>
                }
                <Modal.Footer>
                    {modalTipo === "eliminar" &&
                        <>
                            <Button variant="secondary" onClick={eliminarPerfil}>
                                Eliminar
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancelar
                            </Button>
                        </>
                    }
                    {modalTipo === "error" &&
                        <Button variant="secondary" onClick={handleClose}>
                            Aceptar
                        </Button>
                    }
                    {modalTipo === "exito" &&
                        <Button variant="secondary" onClick={borrarDatos}>
                            Aceptar
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PerfilLogueado