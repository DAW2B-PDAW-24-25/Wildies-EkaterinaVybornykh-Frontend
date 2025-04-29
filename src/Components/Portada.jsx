import React from 'react'
import { Button, Image } from 'react-bootstrap'
import logo from '/images/logo4.png'

function Portada() {
    return (
        <div className='container-fluid portada'>

            <div className='d-flex justify-content-between align-items-center p-4'>
                <div className='ms-5'>
                    <Image src={logo} alt='logo' style={{ height: "80px" }} />
                </div>
                <div className='d-flex'>
                    <Button className="btn-montana rounded-pill px-4 py-2 text-light me-2">
                        Inicia sesión
                    </Button>

                </div>

            </div>
            <div className="text-center mt-5 text-light">
                <div className="text-center mt-5">
                    <h1 className="fade-in-text-1">
                        <span>Explorar.</span> <span>Sentir.</span> <span>Conectar.</span>
                    </h1>
                    <h2 className="fade-in-text-2">
                        <span>Donde</span> <span>empieza</span> <span>la</span> <span>libertad...</span>
                    </h2>
                    <Button className="btn-montana rounded-pill px-4 py-2 text-light mt-2 fade-in-boton">
                        Crea una cuenta
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Portada