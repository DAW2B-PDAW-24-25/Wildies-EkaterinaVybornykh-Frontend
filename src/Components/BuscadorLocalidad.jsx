import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';
import { Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

function BuscadorLocalidad({ formData, setFormData, handleFormChange }) {
  const autocompleteRef = useRef(null);

  const handleLocalidad = () => {
    const localidad = autocompleteRef.current.getPlace();
    if (localidad && localidad.geometry) {
      setFormData({
        ...formData,
        localidad: localidad.formatted_address,
        latitud_domicilio: localidad.geometry.location.lat(),
        longitud_domicilio: localidad.geometry.location.lng(),
      });
    }
  };

 /*  if (!isLoaded) return <div>Cargando ubicaciones...</div>; */

  return (
    <Autocomplete
      onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
      onPlaceChanged={handleLocalidad}
    >
      <Form.Group className="mb-1" controlId="localidad">
        <Form.Label>Ubicación</Form.Label>
        <Form.Control
          type="text"
          name="localidad"
          value={formData.localidad}
          onChange={handleFormChange}
          className="texto"
        />
      </Form.Group>
    </Autocomplete>
  );
}

export default BuscadorLocalidad;
