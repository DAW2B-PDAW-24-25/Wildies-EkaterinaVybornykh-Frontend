import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context/AppProvider';
import { BiLeaf } from "react-icons/bi";
import { GoBriefcase } from "react-icons/go";
import { LuLanguages } from "react-icons/lu";
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../App';

function Perfil() {
  const { id } = useParams();
  const { usuarioLogueado, logout, setIdPerfil } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const [modalTipo, setModalTipo] = useState("");

  useEffect(() => {
    setIdPerfil(id);
    console.log("id", id)
    console.log("idLogueado", usuarioLogueado.id)
  }, [id]);

  const esMiPerfil = usuarioLogueado?.id == id;

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

  async function eliminarPerfil() {
    setShow(false);
    const respuesta = await fetch(`${API_URL}/usuarios/${usuarioLogueado.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //"Authorization": `Bearer ${token}`         //todo ACTIVAR TOKEN
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

  return (
    <div className='container-fluid min-vh-100'>
      <div className='row m-3'>
        <div className='col-3 text-center'>
          <Image src={usuarioLogueado.foto_perfil} className='avatar mb-3' />
          <p>{usuarioLogueado.localidad}</p>
        </div>
        <div className='d-flex flex-column col-9 text-center justify-content-between'>
          <h1 className='mt-2'>{usuarioLogueado.nombre} {usuarioLogueado.apellidos}</h1>
          <div className='d-flex justify-content-center mb-md-5'>
            <Link to={`/deportesUsuario/${id}`}><Button variant="outline-secondary" className=' me-2'>Deportes</Button></Link>
            <Button variant="outline-secondary" className=' me-2'>Fotos</Button>
            {esMiPerfil &&
              <>
                <Link to={`/editarPerfil/${usuarioLogueado.id}`}>
                  <Button variant="outline-secondary" className=' me-2'>Editar Perfil</Button>
                </Link>
                <Button variant="outline-secondary" onClick={modalEliminar}>Eliminar perfil</Button>
              </>
            }


          </div>
        </div>
      </div>
      <hr />
      <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3'>
        <div className='d-flex flex-column justify-content-center col-md-6'>
          <div className='d-flex justify-content-start'>
            <BiLeaf className='me-2' /><p>Edad: {usuarioLogueado.edad} años</p>
          </div>
          <div className='d-flex justify-content-start'>
            <GoBriefcase className='me-2' /><p>Profesión: {usuarioLogueado.profesion}</p>
          </div>
          <div className='d-flex justify-content-start'>
            <LuLanguages className='me-2' /><p>Hablo: {usuarioLogueado.idiomas}</p>
          </div>
        </div>
        <div className='col-md-6'>
          <div>
            {usuarioLogueado.deportes.map((deporte, index) => {

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
          <p>{usuarioLogueado.descripcion}</p>
        </div>
      </div>
      <div className='row bg-seccion p-3 rounded shadow d-flex ms-3 me-3 mt-4 mb-5'>
        <h3 className='title'>¿Por qué estoy en wildies?</h3>
        <hr />
        <div>
          <p>{usuarioLogueado.por_que}</p>
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

export default Perfil