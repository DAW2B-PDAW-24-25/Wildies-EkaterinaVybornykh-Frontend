import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { RegContext } from '../Context/RegProvider';
import { Button } from 'react-bootstrap';
import ModalDeportes from './ModalDeportes';
import { API_URL } from '../App';
import { useParams } from 'react-router-dom';
import DeportesWildie from './DeportesWildie';

function DeportesUsuario() {
    const { usuarioLogueado, setUsuarioLogueado, token } = useContext(RegContext);
    const [modalShow, setModalShow] = useState(false);
    const [modalTipo, setModalTipo] = useState("");
    const [modalHeader, setModalHeader] = useState("");
    const [deporte, setDeporte] = useState("");
    const [parametros, setParametros] = useState({})
    const [usuarioDeporteId, setUsuarioDeporteId] = useState("");
    const [idDeporte, setIdDeporte] = useState("");
    const [parametrosDeporte, setParametrosDeporte] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [respuestas, setRespuestas] = useState([]);
    const { id } = useParams();

    const esMiPerfil = usuarioLogueado?.id == id;

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
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

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
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        if (!response.ok) {
            mostrarModalError();
        } else {
            const data = await response.json();
            setUsuarioLogueado(data.usuario);
            setUsuarioDeporteId(data.usuario_deporte.id)
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

    useEffect(() => {             //cuando se cambia el deporte, se construye objeto parametros con sus parametros y valores vacíos
        if (deporte) {
            const form = {};
            deporte.parametros.forEach(parametro => {
                if (modalTipo !== "editar") {
                    form[parametro.id] = "";
                }
            });
            setParametros(form);
        }

    }, [deporte]);

    useEffect(() => {
        const form = {};
        deporte?.parametros?.forEach(parametro => {
            let parametroDeporte = parametrosDeporte.find(p => p.parametro_id === parametro.id);
            form[parametro.id] = parametroDeporte ? parametroDeporte.valor : "";
        });
        setParametros(form);

    }, [parametrosDeporte])

    async function enviarParametros() {
        const datos = [];
        for (let clave in parametros) {
            datos.push({
                "parametro_id": clave,
                "valor": parametros[clave]
            })
        }
        const response = await fetch(`${API_URL}/usuarios/${usuarioLogueado.id}/deportes/${usuarioDeporteId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(datos)

            });
        if (!response.ok) {
            mostrarModalError();
        } else {
            const data = await response.json();
            setUsuarioLogueado(data.data)
            setModalTipo("exito");
            setModalHeader("Se han actualizado tus datos de deporte!");
            setModalShow(true);
        }

    }

    async function cargarParametrosDeporte() {
        const response = await fetch(`${API_URL}/parametrosDeporteUsuario/${usuarioDeporteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            mostrarModalError();
        } else {
            const data = await response.json();
            setParametrosDeporte(data);
            
        }
    }

    useEffect(() => {
        if (usuarioDeporteId) {
            cargarParametrosDeporte();
            cargarPreguntas();
        }

    }, [usuarioDeporteId])

    useEffect(() => {
        if (idDeporte) {
            cargarDeporte();
        }

    }, [idDeporte]);

    function modalEditar(e) {
        setModalTipo("editar");
        setUsuarioDeporteId(e.currentTarget.id);
        let idDep = e.currentTarget.getAttribute("data-deporteid");
        setIdDeporte(idDep)
        setModalHeader("Edita tu deporte");
         setModalShow(true);
    }

    async function cargarPreguntas() {
        const response = await fetch(`${API_URL}/preguntas/${usuarioDeporteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            mostrarModalError();
        } else {
            const data = await response.json();
            setPreguntas(data.data);
        }
    }

    useEffect(() => {
        if (preguntas) {
            const form = {};
            preguntas.forEach(pregunta => {
                form[pregunta.id] = "";
            });
            setRespuestas(form);

        }

    }, [preguntas]);

    async function enviarResultados() {
        let datos = [];
        for (let clave in respuestas) {
            datos.push({
                "pregunta_id": parseInt(clave),
                "respuesta_id": respuestas[clave]
            });
        }
        let response = await fetch(`${API_URL}/asignarNivel/${usuarioDeporteId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(datos)
        });
        if (!response.ok) {
            mostrarModalError();
        } else {
            const data = await response.json();
            setUsuarioLogueado(data.usuario);
            setModalTipo("exito");
            setModalHeader(`Tienes nivel ${data.nivel} en ${data.deporte}`)
            setModalShow(true);
        }
    }


    function modalTest(e) {
        setModalTipo("test");
        setUsuarioDeporteId(e.currentTarget.id);
        setModalHeader(`Contesta a las preguntas del test`);
        setModalShow(true);
    }

    return (
        esMiPerfil ?
            <div className='container-fluid min-vh-100'>
                <div className='d-flex justify-content-between m-4 align-items-center'>
                    <div>
                        <h1>Deportes que practico</h1>
                    </div>
                    {
                        (usuarioLogueado?.no_practica?.length > 0) &&
                        <div className='me-3'>
                            <Button variant='outline-secondary' className='rounded-pill shadow' onClick={modalAgregarDeporte}>Añadir</Button>
                        </div>
                    }

                </div>
                <hr />
                {usuarioLogueado?.deportes?.length === 0 &&
                    <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4'>
                        <h3>Todavía no has añadido deportes</h3>
                    </div>
                }
                {usuarioLogueado?.deportes?.map((deporte, index) => {
                    return <div key={index} className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4'>
                        <div className='d-flex m-2 justify-content-between'>
                            <h3 className='title'>{deporte.deporte}</h3>
                            {deporte.nivel &&
                                <h5 className='me-4'>Nivel: {deporte.nivel}</h5>}
                        </div>
                        <hr />
                        <div className='d-flex justify-content-between'>
                            <div>
                                {deporte.parametros.map((parametro, index) => {
                                    return <div key={index} className='d-flex'>
                                        <p><strong>{parametro.nombre}:</strong> {parametro.valor}</p>
                                    </div>
                                })}
                            </div>

                            <div className='d-flex flex-column align-content-end'>
                                {!deporte.nivel &&
                                    <Button variant='outline-secondary' className='me-2 mb-2 rounded-pill shadow pt-0 pb-0 ps-2 pe-2' id={deporte.usuario_deporte_id} onClick={modalTest}>Test</Button>
                                }
                                <Button variant='outline-secondary' className='me-2 mb-2 rounded-pill shadow pt-0 pb-0 ps-2 pe-2' id={deporte.usuario_deporte_id} data-deporteid={deporte.deporte_id} onClick={modalEditar}>Editar</Button>
                                <Button variant='outline-secondary' id={deporte.usuario_deporte_id} className='me-2 mb-2 rounded-pill shadow pt-0 pb-0 ps-2 pe-2' onClick={modalEliminar}>Eliminar</Button>
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
                    parametros={parametros}
                    setParametros={setParametros}
                    enviarParametros={enviarParametros}
                    setUsuarioDeporteId={setUsuarioDeporteId}
                    preguntas={preguntas}
                    respuestas={respuestas}
                    setRespuestas={setRespuestas}
                    enviarResultados={enviarResultados}
                />
            </div>
            : <DeportesWildie />
    )
}

export default DeportesUsuario