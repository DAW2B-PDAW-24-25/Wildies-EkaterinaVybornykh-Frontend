import React, { useContext } from 'react'
import { AppContext } from '../Context/AppProvider'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function DeportesWildie() {

    const { wildie } = useContext(AppContext)
    const navigate = useNavigate();
    return (
        <div className='container-fluid min-vh-100'>
            <div className='d-flex justify-content-between m-4 align-items-center'>
                <h1>Deportes que practico</h1>
                <Button variant="secondary" className="shadow" onClick={() => navigate(-1)}>Volver</Button>
            </div>
            <hr />
            {wildie?.deportes?.length === 0 &&
                <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4'>
                    <h3>{wildie.nombre} todavía no ha añadido deportes</h3>
                </div>
            }
            {wildie?.deportes?.map((deporte, index) => {
                return (
                    <div key={index} className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4'>
                        <div className='d-flex m-2 justify-content-between'>
                            <h3 className='title'>{deporte.deporte}</h3>
                            {deporte.nivel &&
                                <h5 className='me-4'>Nivel: {deporte.nivel}</h5>
                            }
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between'>
                            <div>
                                {deporte.parametros.map((parametro, i) => {
                                    return (
                                        <div key={i} className='d-flex'>
                                            <p><strong>{parametro.nombre}:</strong> {parametro.valor}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default DeportesWildie