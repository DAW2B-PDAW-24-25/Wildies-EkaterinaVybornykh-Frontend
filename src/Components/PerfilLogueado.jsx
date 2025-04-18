import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiLeaf } from "react-icons/bi";
import { GoBriefcase } from "react-icons/go";
import { LuLanguages } from "react-icons/lu";
import {Button, Image, Modal} from "react-bootstrap"

function PerfilLogueado({ usuario, logout, eliminarPerfil, modalTipo, modalMensaje, setModalTipo, setModalMensaje }) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <div className='row m-3'>
                <div className='col-3 text-center'>
                    <Image src={usuario.foto_perfil} className='avatar mb-3' />
                    <p>{usuario.localidad}</p>
                </div>
                <div className='d-flex flex-column col-9 text-center justify-content-between'>
                    <h1 className='mt-2'>{usuario.nombre} {usuario.apellidos}</h1>
                    <div className='d-flex justify-content-center mb-md-5'>
                        <Link to={`/deportesUsuario/${usuario.id}`}><Button variant="outline-secondary" className=' me-2 rounded-pill shadow'>Deportes</Button></Link>
                        <Button variant="outline-secondary" className=' me-2 rounded-pill shadow'>Fotos</Button>
                        <Link to={`/editarPerfil/${usuario.id}`}>
                            <Button variant="outline-secondary" className=' me-2 rounded-pill shadow'>Editar Perfil</Button>
                        </Link>
                        <Button variant="outline-secondary" className='rounded-pill shadow' onClick={modalEliminar}>Eliminar perfil</Button>
                    </div>
                </div>
            </div>
            <hr />
            <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3'>
                <div className='d-flex flex-column justify-content-center col-md-6'>
                    <div className='d-flex justify-content-start'>
                        <BiLeaf className='me-2' /><p>Edad: {usuario.edad} años</p>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <GoBriefcase className='me-2' /><p>Profesión: {usuario.profesion}</p>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <LuLanguages className='me-2' /><p>Hablo: {usuario.idiomas}</p>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div>
                        {usuario.deportes.map((deporte, index) => {
                            return <p key={index}>
                                {deporte.deporte} {deporte.nivel && `: nivel ${deporte.nivel}`}
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