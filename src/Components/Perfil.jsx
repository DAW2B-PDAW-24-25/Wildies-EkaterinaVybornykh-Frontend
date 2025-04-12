import React from 'react';
import { Button, Image} from 'react-bootstrap';
import { useContext } from 'react';
import { AppContext } from '../Context/AppProvider';
import { BiLeaf } from "react-icons/bi";
import { GoBriefcase } from "react-icons/go";
import { LuLanguages } from "react-icons/lu";
import { Link } from 'react-router-dom';

function Perfil() {
  const { usuarioLogueado } = useContext(AppContext);

  return (
    <div className='container-fluid'>
      <div className='row m-3'>
        <div className='col-3 text-center'>
          <Image src={usuarioLogueado.foto_perfil} className='avatar mb-3' />
          <p>{usuarioLogueado.localidad}</p>
        </div>
        <div className='d-flex flex-column col-9 text-center justify-content-between'>
          <h1 className='mt-2'>{usuarioLogueado.nombre} {usuarioLogueado.apellidos}</h1>
          <div className='d-flex justify-content-center mb-md-5'>
            <Link to={`/editarPerfil/${usuarioLogueado.id}`}>
              <Button variant="outline-secondary" className=' me-2'>Editar Perfil</Button>
            </Link>
            <Button variant="outline-secondary" className=' me-2'>Deportes</Button>
            <Button variant="outline-secondary">Fotos</Button>
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
                {deporte.deporte}: nivel {deporte.nivel}
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
    </div>
  )
}

export default Perfil