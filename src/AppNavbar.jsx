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
import { AppContext } from './Context/AppProvider';
import logo from './styles/images/logo4.png';
import ModalFiltro from './Components/ModalFiltro';
import { API_URL } from './App';


function AppNavbar() {

  const { deportes, usuarioLogueado, setUsuarios, setEventos, usuarios, formData, setFormData, setTipoUsuarios, setTipoEventos } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const [tipoModal, setTipoModal] = useState("");
  const [modalHeader, setModalHeader] = useState("");
  //const [formData, setFormData] = useState({});
  //const [opcion, setOpcion] = useState("");
  //const [ageDisabled, setAgeDisabled] = useState(false);
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

  useEffect(() => {
    console.log(formData)
  }, [formData])

  function handleInicio() {
    setTipoUsuarios('inicio');
    setTipoEventos('inicio');
    navigate('/');
  }

  return (
    <div className='p-0 ps-sm-5'>

      <div className='navContainer d-none d-sm-block'>
        <Nav defaultActiveKey="/home" className="sidebar pt-sm-5">
          <div className='d-none d-sm-block'  role="button" onClick={handleInicio}>
            <img src={logo} alt="logo" className='img-fluid w-75 opacity-75' />
          </div>
          <div className='linkContainer p-0 pb-sm-5 pt-sm-5'>
            <Button variant="link" className='boton-link d-flex' onClick={handleBuscar}>
              <IoSearch style={{ fontSize: "25px", marginRight: "10px" }} />
              <p className='d-none d-sm-block'>Buscar</p>
            </Button>
            <Enlace as={Link} to="/">
              <LiaUserFriendsSolid style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Mis wildies</p>
            </Enlace>
            <Enlace as={Link} to="/configuracion">
              <FaRegCalendar style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Próximas aventuras</p>
            </Enlace>
            <Enlace as={Link} to="/configuracion">
              <FaRegSquarePlus style={{ fontSize: "25px", marginRight: "10px" }} /><p className='d-none d-sm-block'>Crear aventura</p>
            </Enlace>
            <Enlace as={Link} to="/configuracion">
              <FiMapPin style={{ fontSize: "25px", marginRight: "10px" }} className='d-none d-sm-block' /> <p className='d-none d-sm-block'>Mapa</p>
            </Enlace>
          </div>
          <div className='linkContainer'>
            <Enlace as={Link} to="/configuracion">
              <MdLogout style={{ fontSize: "25px", marginRight: "10px" }} className='d-none d-sm-block' /> <p className='d-none d-sm-block'>Cerrar sesión</p>
            </Enlace>
            <Enlace as={Link} to={`/perfil/1`}>
              <CgProfile style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Perfil</p>
            </Enlace>
          </div>
        </Nav>
      </div>
      <Navbar bg="light" data-bs-theme="light" className="d-sm-none" fixed="bottom">
        <Nav className="d-flex justify-content-around w-100">
          <Enlace as={Link} to={`/perfil/1`}>
            <CgProfile style={{ fontSize: "25px", marginRight: "10px" }} />
          </Enlace>
          <Enlace as={Link} to="/">
            <LiaUserFriendsSolid style={{ fontSize: "25px", marginRight: "10px" }} />
          </Enlace>
          <Enlace as={Link} to="/configuracion">
            <FaRegCalendar style={{ fontSize: "25px", marginRight: "10px" }} />
          </Enlace>
          <Enlace as={Link} to="/configuracion">
            <FaRegSquarePlus style={{ fontSize: "25px", marginRight: "10px" }} />
          </Enlace>
          <Enlace as={Link} to="/configuracion">
            <MdLogout style={{ fontSize: "25px", marginRight: "10px" }} />
          </Enlace>
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
        // opcion={opcion}
        //setOpcion={setOpcion}
        deportes={deportes}

      //ageDisabled={ageDisabled}
      //setAgeDisabled={setAgeDisabled}
      />
    </div>




  );
}

export default AppNavbar