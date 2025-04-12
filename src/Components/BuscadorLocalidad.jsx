import React from 'react';
import { Form } from 'react-bootstrap';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { useRef } from 'react';
import { GOOGLE_API_KEY } from '../App';
const libraries = ["places"]; // Necesario para Places API

function BuscadorLocalidad({ formData, setFormData, handleFormChange }) {
    const autocompleteRef = useRef(null);
    const handleLocalidad = () => {
        const localidad = autocompleteRef.current.getPlace();
        if (localidad && localidad.geometry) {
            setFormData({
                ...formData, localidad: localidad.formatted_address,
                latitud_domicilio: localidad.geometry.location.lat(),
                longitud_domicilio: localidad.geometry.location.lng()
            });

        }
    };
    return (
        <LoadScript
            googleMapsApiKey={GOOGLE_API_KEY}
            libraries={libraries}
        >
            <Autocomplete
                onLoad={autocomplete => autocompleteRef.current = autocomplete}
                onPlaceChanged={handleLocalidad}
            >
                <Form.Group className="mb-3" controlId="localidad">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control type="text" name='localidad' value={formData.localidad} onChange={handleFormChange} className='texto'/>
                </Form.Group>
            </Autocomplete>
        </LoadScript>
    )
}

export default BuscadorLocalidad