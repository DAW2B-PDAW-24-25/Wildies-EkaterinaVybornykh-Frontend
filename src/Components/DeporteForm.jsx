import React from 'react';
import { useState } from 'react';

function DeporteForm({ usuarioLogueado, deporte }) {

    
    return (
        <Form>
            {deporte.parametros.map((parametro, index) => {
                <Form.Group key={index} className="mb-3" controlId={parametro.nombre}>
                    <Form.Label>{parametro.nombre}: </Form.Label>
                    <Form.Control type="text" id={parametro.id} />
                </Form.Group>
            })}

        </Form>

    )
}

export default DeporteForm