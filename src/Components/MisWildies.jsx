import React, { useContext } from 'react'
import { Card, Image } from 'react-bootstrap'
import { AppContext } from '../Context/AppProvider'
import { useNavigate } from 'react-router-dom';

function MisWildies() {
    const { amistades, usuarioLogueado } = useContext(AppContext);
    const navigate = useNavigate();
    function handlePerfil(id) {
        navigate(`/perfil/${id}`)
    }
    return (
        <div className='container-fluid min-vh-100'>
            <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 w-sm-75 mb-5'>
                <h3 className='title'>Mis Wildies</h3>
                <hr />
                <Card className='rounded-0 p-0 border-0 bg-transparent'>
                    <div className='row mb-4 w-100'>
                        {
                            amistades.data.map((amigo) => {
                                if (amigo.estado === "pendiente" || amigo.estado === "aceptado") {
                                    return (
                                        <div
                                            key={amigo.amistad_id} // siempre una key única
                                            className='d-flex align-items-center rounded-pill ms-4 mt-4 p-2 col-sm-6'
                                            role="button"
                                            onClick={() => handlePerfil(amigo.amigo_id)}
                                        >
                                            <div className='me-2'>
                                                <Image src={amigo.foto_perfil} alt="Foto perfil" className="avatar_small" />
                                            </div>
                                            <div className='m-0'>
                                                <h5 className='m-0 texto'>{amigo.nombre} {usuarioLogueado.apellidos}</h5>
                                            </div>
                                        </div>
                                    );
                                }
                                return null; 
                            })
                        }
                    </div>

                </Card>
            </div>
        </div>
    )
}

export default MisWildies