import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context/AppProvider';
import { BiLeaf } from "react-icons/bi";
import { GoBriefcase } from "react-icons/go";
import { LuLanguages } from "react-icons/lu";
import { Link, useParams } from 'react-router-dom';
import { API_URL } from '../App';
import SpinnerWave from './SpinnerWave';
import PerfilWildie from './PerfilWildie';
import PerfilLogueado from './PerfilLogueado';

function Perfil() {
  const { id } = useParams();
  const { usuarioLogueado, logout, setIdPerfil, wildie, setWildie } = useContext(AppContext);
  const [modalMensaje, setModalMensaje] = useState("");
  const [modalTipo, setModalTipo] = useState("");
  const [cargando, setCargando] = useState(true);

  const esMiPerfil = usuarioLogueado?.id == id;

  useEffect(() => {
    setIdPerfil(id);
    console.log("id", id)
    console.log("idLogueado", usuarioLogueado.id)
  }, [id]);

  useEffect(()=>{
    console.log("UsuarioLogueado en perfil: ", usuarioLogueado.id)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
   // if (!esMiPerfil) {
   console.log("estoy en useEf cargar wildie")
      cargarWildie();
    //}
  }, [])



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

  async function cargarWildie() {
    setCargando(true);
    try {
      let response = await fetch(`${API_URL}/usuarios/${id}`);
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
      }
      let data = await response.json();
      setWildie(data.data);

    }
    catch (error) {
      console.error("Error usuarios:", error);
    }
    setCargando(false);
  }

  if (cargando && !esMiPerfil) {
    return <div className='container-fluid min-vh-100'>
      <SpinnerWave />
    </div>
  }

  return (
    esMiPerfil ? <PerfilLogueado
      usuario={usuarioLogueado}
      eliminarPerfil={eliminarPerfil}
      logout={logout}
      modalTipo={modalTipo}
      modalMensaje={modalMensaje}
      setModalTipo={setModalTipo}
      setModalMensaje={setModalMensaje}
    /> 
    : <PerfilWildie usuario={wildie} />
  )
}

export default Perfil