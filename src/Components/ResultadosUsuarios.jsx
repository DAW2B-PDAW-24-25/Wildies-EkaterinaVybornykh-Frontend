import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppProvider'
import UsuariosInicio from './UsuariosInicio';
import { Link } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import SpinnerWave from './SpinnerWave';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/Paginacion.scss'

function ResultadosUsuarios() {
    const { usuarios, cargarUsuariosCerca } = useContext(AppContext);
    const [cargando, setCargando] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const [usuariosPorPagina] = useState(12);

     // Calculamos los índices para los usuarios visibles en la página actual
     const indiceUltimo = paginaActual * usuariosPorPagina;
     const indicePrimero = indiceUltimo - usuariosPorPagina;
 
     // Solo mostramos los usuarios que corresponden a la página actual
     const usuariosPagina = usuarios.slice(indicePrimero, indiceUltimo);
 
     // Total de páginas
     const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);
     
     const paginacion = [];
 
     // Generamos los botones de la paginación
     for (let number = 1; number <= totalPaginas; number++) {
         paginacion.push(
             <Pagination.Item
                 key={number}
                 active={number === paginaActual}
                 onClick={() => setPaginaActual(number)} // Cambia la página activa
             >
                 {number}
             </Pagination.Item>
         );
     }

     useEffect(() => {
        window.scrollTo(0, 0); 
    }, [paginaActual]);


    useEffect(() => {
        cargar();
    }, []);

    async function cargar() {
        setCargando(true);
        await cargarUsuariosCerca();
        setCargando(false);
    }

    if (cargando) {

        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }

    return (
        <div className='container-fluid min-vh-100'>
            <div className='row pt-3 m-5'>
                {usuariosPagina.map((usuario) => {
                    return <Link to={`/perfil/${usuario.id}`} className='col-md-3 mb-3 me-5 text-decoration-none'>
                        <Card key={usuario.id} className='rounded-0 p-0 border-0 bg-transparent'>
                            <Card.Img variant="top" src={usuario.foto_perfil} className="img-fluid w-100 rounded-0">

                            </Card.Img>
                            <Card.ImgOverlay>
                                <div >
                                    <h5 className='text-light opacity-75'>{usuario.nombre}</h5>
                                </div>
                            </Card.ImgOverlay>

                            <Card.Body>
                                <Card.Text>
                                    {usuario.localidad}
                                </Card.Text>
                                <div className='d-flex flex-wrap'>
                                    <h5 className='title me-1'>Deportes: </h5>
                                    {usuario.deportes.map((deporte, index) => {
                                        return <p key={index} className='me-1 texto'>{deporte.deporte} {index < usuario.deportes.length - 1 ? ',' : ''} </p>
                                    })}

                                </div>

                                <Card.Text>
                                    {usuario.descripcion.split(' ').slice(0, 15).join(' ') + "..."}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                })}

            </div>
            <div className="d-flex justify-content-center">
                <Pagination className='pagination'>
                    <Pagination.Prev  onClick={() => paginaActual > 1 && setPaginaActual(paginaActual - 1)} />
                    {paginacion}
                    <Pagination.Next onClick={() => paginaActual < totalPaginas && setPaginaActual(paginaActual + 1)} />
                </Pagination>
            </div>

        </div>

    )
}

export default ResultadosUsuarios