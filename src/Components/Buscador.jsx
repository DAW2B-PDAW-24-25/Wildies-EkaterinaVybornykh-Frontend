import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FaGear } from "react-icons/fa6";
import { RegContext } from '../Context/RegProvider';
import { useContext } from 'react';

function Buscador() {
  const {usuarioLogueado}=useContext(RegContext);
    return (

        <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1" className='rounded-start-pill'><FaGear className='title'/></InputGroup.Text>
        <Form.Control className='rounded-end-pill opacity-75'
          placeholder="Buscar wildies..."
          aria-label="buscador"
        />
      </InputGroup>
   
  )
}

export default Buscador