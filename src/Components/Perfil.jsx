import React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../Context/AppProvider';
import { BiLeaf } from "react-icons/bi";
import { GoBriefcase } from "react-icons/go";
import { LuLanguages } from "react-icons/lu";
import { Link, useParams } from 'react-router-dom';
import SpinnerWave from './SpinnerWave';
import PerfilWildie from './PerfilWildie';
import PerfilLogueado from './PerfilLogueado';
import { RegContext } from '../Context/RegProvider';
import { API_URL } from '../App';

function Perfil() {
  const { id } = useParams();
  const { setIdPerfil, wildie, setWildie } = useContext(AppContext);
  const { usuarioLogueado, token, logout } = useContext(RegContext);
  const [modalMensaje, setModalMensaje] = useState("");
  const [modalTipo, setModalTipo] = useState("");
  const [cargando, setCargando] = useState(false);

  const esMiPerfil = usuarioLogueado?.id == id;

  useEffect(() => {
    setIdPerfil(id);
    console.log("id", id)
    console.log("idLogueado", usuarioLogueado.id)
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (usuarioLogueado) {
      cargarWildie();
    }
  }, [usuarioLogueado])

  async function cargarWildie() {
    setCargando(true);
    try {
      let response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {

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
      logout={logout}
      modalTipo={modalTipo}
      modalMensaje={modalMensaje}
      setModalTipo={setModalTipo}
      setModalMensaje={setModalMensaje}
      usuarioLogueado={usuarioLogueado}
      token={token}
    />
      : <PerfilWildie usuario={wildie} />
  )
}

export default Perfil