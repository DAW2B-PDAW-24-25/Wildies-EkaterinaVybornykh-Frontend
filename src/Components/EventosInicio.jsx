import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function UsuariosInicio({ eventos }) {
    return (

        <div className='container-fluid'>
            <h3 className='pb-3'>Eventos cerca</h3>
            <hr></hr>
            <div className='row pt-3'>
                {eventos.map((evento) => {
                    return <Link to={`/detalleEvento/${evento.id}`} className='col-md-3 mb-3 me-5 text-decoration-none'><Card key={evento.id} className='rounded-0 p-0 border-0 bg-transparent'>
                        <Card.Img variant="top" src={evento.foto_portada} className="img-fluid w-100 rounded-0" />
                        <Card.Body>
                            <div>
                                <h5 className='title'>{evento.deporte} (nivel {evento.nivel})</h5>
                            </div>
                            <div className='d-flex'>
                                <h5 className='title me-1'>Fecha :</h5> <p>{evento.fecha}</p>
                            </div>
                            <Card.Text>
                                <h5 className='title'>Donde :</h5> {evento.localidad}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    </Link>
                })}

            </div>
            <div>
            <div>
                <Link to="/eventosCerca"  className='text-decoration-none'>Descubrir mas...</Link>
            </div>
            </div>
        </div>
    )
}

export default UsuariosInicio