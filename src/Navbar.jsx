import React from 'react'
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { IoSearch } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { FaRegCalendar } from "react-icons/fa6";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { CgBorderBottom, CgProfile } from "react-icons/cg";

function Navbar() {
  const Enlace = styled(Nav.Link)`
  display: flex;
  `

  return (
    <div className='container.fluid p-0 ps-sm-5'>
      <div className='d-sm-none' style={{borderBottom: "1px solid rgb(193, 203, 207);"}}></div>
      <div className='navContainer'>
        <Nav defaultActiveKey="/home" className="sidebar pt-sm-5">
          <div className='d-none d-sm-block'>
            <h1 className='title web-name mb-5 mt-2'>
              WILDIES
            </h1>
          </div>
          <div className='linkContainer p-0 pb-sm-5 pt-sm-5'>
            <Enlace as={Link} to="/">
              <IoSearch style={{ fontSize: "25px", marginRight: "10px"}} /> 
              <p className='d-none d-sm-block'>Buscar</p>
            </Enlace>
            <Enlace as={Link} to="/perfil">
              <LiaUserFriendsSolid style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Mis wildies</p>
            </Enlace>
            <Enlace as={Link} to="/configuracion">
              <FaRegCalendar style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Próximas aventuras</p> 
            </Enlace>
            <Enlace as={Link} to="/configuracion">
              <FaRegSquarePlus style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Crear aventura</p>
            </Enlace>
            <Enlace as={Link} to="/configuracion">
              <FiMapPin style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Mapa</p>
            </Enlace>
          </div>
          <div className='linkContainer'>
            <Enlace as={Link} to="/configuracion">
              <MdLogout style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Cerrar sesión</p>
            </Enlace>
            <Enlace as={Link} to="/configuracion">
              <CgProfile style={{ fontSize: "25px", marginRight: "10px" }} /> <p className='d-none d-sm-block'>Perfil</p>
            </Enlace>
          </div>
        </Nav>
        </div>
    </div>




  );
}

export default Navbar