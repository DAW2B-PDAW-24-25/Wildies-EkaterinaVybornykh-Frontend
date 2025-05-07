import React, { useContext, useState, useEffect } from 'react'
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { IoSearch } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { CgBorderBottom, CgProfile } from "react-icons/cg";
import UsuariosInicio from './Components/EventosInicio';
import { GoHomeFill } from "react-icons/go";
import { PiUsersBold } from "react-icons/pi";
import { AppContext } from './Context/AppProvider';
import logo from '/images/logo4.png';
import logo_small from '/images/logo_small.png';
import ModalFiltro from './Components/ModalFiltro';
import { API_URL } from './App';
import { RegContext } from './Context/RegProvider';


function AppSidebar() {

  const { deportes,
    setUsuarios,
    setEventos,
    usuarios,
    formData,
    setFormData,
    setTipoUsuarios,
    setTipoEventos,
    setAccionEvento,
    amistades

  } = useContext(AppContext);

  const { usuarioLogueado } = useContext(RegContext);
  const [show, setShow] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Enlace = styled(Nav.Link)`
  display: flex;
  `

  function handleBuscar() {
    setTipoModal("opcion");
    setModalHeader("Elige que quieres buscar");
    setShow(true);
  }

  function handleFormChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }


  function handleInicio() {
    setTipoUsuarios('inicio');
    setTipoEventos('inicio');
    navigate('/');
  }

  function handleCrear() {
    setAccionEvento('crear');
    navigate(`/crearEvento`);
  }

  return (
    <div className='p-0'>

      <div className='navContainer d-none d-sm-block'>
        <Nav defaultActiveKey="/home" className="sidebar pt-sm-5 ps-2 ps-lg-5">

          <div className="d-none d-lg-block" role="button" onClick={handleInicio}>
            <img src={logo} alt="logo" className="img-fluid w-75 " />
          </div>
          <div className="d-none d-sm-block d-lg-none ms-1 mb-4" role="button" onClick={handleInicio}>
            <img src={logo_small} alt="logo" className="img-fluid w-75" />
          </div>
          <div className="linkContainer p-0 pb-sm-5 pt-sm-5">
            <Button variant="link" className="boton-link d-flex align-items-center pb-4 mb-3 mb-lg-0" onClick={handleBuscar}>
              <IoSearch style={{ fontSize: "25px", marginRight: "15px" }} />
              <p className="d-none d-lg-inline m-0">Buscar</p>
            </Button>
            <Enlace as={Link} to={`/misWildies/${usuarioLogueado.id}`} className="d-flex align-items-center pb-4 mb-3 mb-lg-0">
              <div className="position-relative d-flex align-items-center">
                <PiUsersBold style={{ fontSize: "25px", marginRight: "15px" }} />
                {amistades.total_pendientes > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-5px",
                    right: "5px",
                    backgroundColor: "#C8936Eff",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "10px",
                    fontWeight: "bold",
                  }}>
                    {amistades.total_pendientes}
                  </span>
                )}
              </div>
              <p className="d-none d-lg-inline m-0">Mis Wildies</p>
            </Enlace>
            <Button variant="link" className="boton-link d-flex align-items-center pb-4 mb-3 mb-lg-0" onClick={() => navigate(`/proximosEventos/${usuarioLogueado.id}`)}>
              <FaRegCalendar style={{ fontSize: "25px", marginRight: "15px" }} />
              <p className="d-none d-lg-inline m-0">Mis próximas aventuras</p>
            </Button>
            <Button variant="link" className="boton-link d-flex align-items-center pb-4 mb-3 mb-lg-0" onClick={handleCrear}>
              <FaRegSquarePlus style={{ fontSize: "25px", marginRight: "15px" }} />
              <p className="d-none d-lg-inline m-0">Crear aventura</p>
            </Button>
            <Button variant="link" className="boton-link d-flex align-items-center pb-4" onClick={() => navigate(`/mapa/${usuarioLogueado.id}`)}>
              <FiMapPin style={{ fontSize: "25px", marginRight: "15px" }} />
              <p className="d-none d-lg-inline m-0">Mapa</p>
            </Button>
          </div>
        </Nav>

      </div>
      <Navbar bg="light" data-bs-theme="light" className="d-sm-none" fixed="bottom">
        <Nav className="d-flex justify-content-around align-items-center w-100">
          <div className="d-flex justify-content-center align-items-center">
            <Enlace as={Link} to={`/`}>
              <GoHomeFill style={{ fontSize: "25px" }} />
            </Enlace>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Button variant="link" className="boton-link p-0" onClick={handleBuscar}>
              <IoSearch style={{ fontSize: "25px" }} />
            </Button>
          </div>
          <div className="d-flex justify-content-center align-items-center position-relative">
            <Enlace as={Link} to={`/misWildies/${usuarioLogueado.id}`}>
              <PiUsersBold style={{ fontSize: "25px" }} />
            </Enlace>
            {amistades.total_pendientes > 0 && (
              <span style={{
                position: "absolute",
                top: "2px",
                right: "0px",
                backgroundColor: "#C8936Eff",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "10px",
                fontWeight: "bold",
              }}>
                {amistades.total_pendientes}
              </span>
            )}
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Enlace as={Link} to={`/proximosEventos/${usuarioLogueado.id}`}>
              <FaRegCalendar style={{ fontSize: "25px" }} />
            </Enlace>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <Enlace as={Link} to={`/mapa/${usuarioLogueado.id}`}>
              <FiMapPin style={{ fontSize: "25px" }} />
            </Enlace>
          </div>
        </Nav>
      </Navbar>

      <ModalFiltro
        show={show}
        onHide={handleClose}
        header={modalHeader}
        setHeader={setModalHeader}
        tipo={tipoModal}
        setTipo={setTipoModal}
        setShow={setShow}
        formData={formData}
        setFormData={setFormData}
        handleFormChange={handleFormChange}
        deportes={deportes}
      />
    </div>
  );
}

export default AppSidebar