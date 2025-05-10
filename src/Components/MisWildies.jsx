import React, { useContext, useEffect } from 'react'
import { Card, Image } from 'react-bootstrap'
import { AppContext } from '../Context/AppProvider'
import { useNavigate } from 'react-router-dom';
import { RegContext } from '../Context/RegProvider';

function MisWildies() {
    const { amistades } = useContext(AppContext);
    const { usuarioLogueado } = useContext(RegContext);
    const navigate = useNavigate();
    const hayPendientes = () => {
        if (amistades.length > 0) {
            for (let amistad of amistades.data) {
                if (amistad.estado == "pendiente" && amistad.solicitante_id == amistad.amigo_id) {
                    return true;
                }
            }
            return false;
        }
    }
    const hayAmigos = () => {
        if (amistades.length > 0) {
            for (let amistad of amistades?.data) {
                if (amistad.estado == "aceptado") {
                    return true;
                }
            }
            return false;
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function handlePerfil(id) {
        navigate(`/perfil/${id}`)
    }
    return (
        <div className='container-fluid min-vh-100'>

            {hayPendientes() && (
                <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 w-sm-75 mb-5 bg-seccion'>
                    <Card className='rounded-0 p-0 border-0 bg-transparent'>
                        <div className='row mb-4 w-100'>
                            <div className="w-100">
                                <h3 className='title'>Solicitudes de amistad</h3>
                                <hr />
                                {amistades.data.map((amistad) => {
                                    if (amistad.estado === "pendiente" && amistad.solicitante_id === amistad.amigo_id) {
                                        return (
                                            <div
                                                key={amistad.amigo_id}
                                                className='d-flex align-items-center rounded-pill ms-4 mt-4 p-2 col-sm-6'
                                                role="button"
                                                onClick={() => handlePerfil(amistad.amigo_id)}
                                            >
                                                <div className='me-2'>
                                                    <Image src={amistad.foto_perfil} alt="Foto perfil" className="avatar_small" />
                                                </div>
                                                <div className='m-0'>
                                                    <h5 className='m-0 texto'>{amistad.nombre} {usuarioLogueado.apellidos}</h5>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {hayAmigos() && (
                <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 mb-5 bg-seccion w-sm-75'>
                    <Card className='rounded-0 p-0 border-0 bg-transparent'>
                        <div className='row mb-4 w-100'>
                            <div className="w-100 mt-4 mb-2">
                                <h3 className='title'>Mis Wildies</h3>
                                <hr />
                                {amistades.data.map((amistad) => {
                                    if (amistad.estado === "aceptado") {
                                        return (
                                            <div
                                                key={amistad.amigo_id}
                                                className='d-flex align-items-center rounded-pill ms-4 mt-2 p-2 col-sm-6'
                                                role="button"
                                                onClick={() => handlePerfil(amistad.amigo_id)}
                                            >
                                                <div className='me-2'>
                                                    <Image src={amistad.foto_perfil} alt="Foto perfil" className="avatar_small" />
                                                </div>
                                                <div className='m-0'>
                                                    <h5 className='m-0 texto'>{amistad.nombre} {usuarioLogueado.apellidos}</h5>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {
                (!hayAmigos() && !hayPendientes()) && (
                    <div className='m-5 text-center'>
                        <h1 className='title'>Todavía no tienes wildies</h1>
                    </div>
                )}

        </div>


    )
}

export default MisWildies