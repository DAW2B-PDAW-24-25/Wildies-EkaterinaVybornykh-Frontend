import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppProvider'
import UsuariosInicio from './UsuariosInicio';
import { Link } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import SpinnerWave from './SpinnerWave';
import Pagination from 'react-bootstrap/Pagination';
import '../styles/Paginacion.scss'

function ResultadosEventos() {
    const { eventos, cargarEventosCerca, tipoEventos, aplicarFiltros } = useContext(AppContext);
    const [cargando, setCargando] = useState(false);
    const [paginaActual, setPaginaActual] = useState(1);
    const [eventosPorPagina] = useState(12);

    const hayResultados = eventos.length !== 0;

    const indiceUltimo = paginaActual * eventosPorPagina;
    const indicePrimero = indiceUltimo - eventosPorPagina;
    const eventosPagina = eventos.slice(indicePrimero, indiceUltimo);
    const totalPaginas = Math.ceil(eventos.length / eventosPorPagina);
    const paginacion = [];
    for (let number = 1; number <= totalPaginas; number++) {
        paginacion.push(
            <Pagination.Item
                key={number}
                active={number === paginaActual}
                onClick={() => setPaginaActual(number)}
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

    useEffect(() => {
        if (tipoEventos === "filtro") {
            setCargando(true);
            aplicarFiltros();
            setCargando(false);
        }
    }, [tipoEventos]);

    async function cargar() {
        setCargando(true);
        if (tipoEventos === "cerca") {
            await cargarEventosCerca();
        }
        if (tipoEventos === "filtro") {
            await aplicarFiltros();
        }

        setCargando(false);
    }

    useEffect(() => {
        console.log("Eventos: ", eventos)
    }, [eventos])

    if (cargando) {

        return <div className='container-fluid min-vh-100'>
            <SpinnerWave />
        </div>
    }

    return (
        hayResultados ? (
            <div className='container-fluid min-vh-100'>
                <div className='row pt-3 m-5'>
                    {eventosPagina.map((evento) => {
                        return <Link to={`/detalleEvento/${evento.id}`} className='col-md-3 mb-3 me-5 text-decoration-none'><Card key={evento.id} className='rounded-0 p-0 border-0 bg-transparent'>
                            <Card.Img variant="top" src={evento.foto_portada} className="img-fluid w-100 rounded-0" style={{ height: "250px", objectFit: "cover" }} />
                            <Card.Body>
                                <div>
                                    <h5 className='title'>{evento.deporte} (nivel {evento.nivel})</h5>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <h5 className='title me-1 mt-0 mb-0'>Fecha :</h5> <p className='m-0'>{evento.fecha_form}</p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <h5 className='title me-1 mt-2'>Donde : </h5> <p className='m-0'>{evento.localidad}</p>
                                </div>
                            </Card.Body>
                        </Card>
                        </Link>
                    })}

                </div>
                <div className="d-flex justify-content-center">
                    <Pagination className='pagination'>
                        <Pagination.Prev onClick={() => paginaActual > 1 && setPaginaActual(paginaActual - 1)} />
                        {paginacion}
                        <Pagination.Next onClick={() => paginaActual < totalPaginas && setPaginaActual(paginaActual + 1)} />
                    </Pagination>
                </div>

            </div>
        ) : (<div className='container-fluid min-vh-100'>
            <div className='m-5 text-center'>
                <h3>No se han encontrado resultados para esta búsqueda</h3>
            </div>

        </div>)

    )
}

export default ResultadosEventos