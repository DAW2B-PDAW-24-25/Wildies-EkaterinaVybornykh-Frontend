import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap';
import { API_URL } from '../App';
import { RegContext } from '../Context/RegProvider';
import SpinnerWave from './SpinnerWave';
import { useNavigate } from 'react-router-dom';

function GestionEventos() {
  const { token } = useContext(RegContext);
  const [eventos, setEventos] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    cargarEventos();
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function cargarEventos() {
    setCargando(true);
    const response = await fetch(`${API_URL}/eventos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.log('Error al recibir datos')
      setCargando(false)
    } else {
      let data = await response.json();
      setEventos(data.data);
      setCargando(false)
    }
  }

  function handleMostrarButton() {
    setMostrar(true);
  }

  function handleCrearButton() {
    navigate('/crearEvento');
  }

  function handleEditar(id) {
    navigate(`/detalleEvento/${id}`);
  }

  return (
    <div className='container-fluid-lg min-vh-100'>
      <div className='row p-3 rounded shadow d-flex ms-3 me-3 mt-4 mb-5 bg-light'>
        <h3 className='title'>Gestión de eventos</h3>
        <hr />
        <Card className='rounded-0 p-0 border-0 bg-transparent'>
          <div className='d-flex justify-content-center m-3'>
            <Button variant='outline-secondary rounded-pill shadow me-3' onClick={handleMostrarButton}>Mostrar eventos</Button>
            <Button variant='outline-secondary rounded-pill shadow' onClick={handleCrearButton}>Crear evento</Button>
          </div>
          {
            mostrar && (
              cargando
                ? <div className='container-fluid min-vh-100'>
                  <SpinnerWave />
                </div>
                : eventos?.map((evento) => {
                  return <>
                    <Table striped bordered hover>
                      <tbody>
                        <tr className='row'>
                          <th className='col-3'>Id</th>
                          <td className='col-9 text-start'>
                            <div className='ms-3 me-3'>{evento.id}</div>
                          </td>
                        </tr>
                        <tr className='row align-items-center'>
                          <th className='col-3'>Nombre</th>
                          <td className='col-9'>
                            <div className="d-flex justify-content-between align-items-center ms-3 me-3">
                              <span className='text-start'>{evento.nombre}</span>

                            </div>
                          </td>
                        </tr>
                        <tr className='row'>
                          <th className='col-3'>Fecha</th>
                          <td className='col-9 text-start'>
                            <div className='ms-3 me-3'>{evento.fecha}</div>
                          </td>
                        </tr>
                        <tr className='row'>
                          <th className='col-3'>Email creador</th>
                          <td className='col-9 text-start'>
                            <div className='ms-3 me-3'>{evento.email_creador}</div>
                          </td>
                        </tr>
                        <tr className='row'>
                          <th className='col-3'>Deporte</th>
                          <td className='col-9 text-start'>
                            <div className='ms-3 me-3'>{evento.deporte}</div>
                          </td>
                        </tr>
                        <tr className='row'>
                          <th className='col-3'>Descripción</th>
                          <td className='col-9 text-start'>
                            <div className='ms-3 me-3'>{evento.descripcion}</div>
                          </td>
                        </tr>
                        <tr className='row'>
                          <th className='col-3'>Foto portada</th>
                          <td className='col-9 text-start'>
                            <img src={evento.foto_portada} className='img-fluid w-25 ms-3 me-3 rounded'></img>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className='d-flex justify-content-center mt-2 mb-4'>
                      <div>
                        <Button variant='secondary rounded-pill shadow me-3' onClick={() => handleEditar(evento.id)}>Ir al evento</Button>
                      </div>

                    </div>
                  </>
                }
                )

            )}
        </Card>
      </div>
    </div>
  )
}

export default GestionEventos