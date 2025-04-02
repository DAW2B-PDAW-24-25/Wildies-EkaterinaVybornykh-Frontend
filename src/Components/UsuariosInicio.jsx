import React from 'react'
//import Card from '@mui/material/Card';
/* import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea'; */
import Card from 'react-bootstrap/Card';

function UsuariosInicio({ usuarios }) {
    return (
        <div className='container'>
            <h3 className='pb-3'>Wildies cerca</h3>
            <div className='row'>
                {usuarios.map((usuario, index) => {
                    return <Card className='col-md-3 mb-3 me-5 rounded-0 p-0 border-0'>
                        <Card.Img variant="top" src={usuario.foto_perfil} className="img-fluid w-100 rounded-0" />
                        <Card.Body style={{backgroundColor: "#D0D5D4ff"}} className='opacity-50'>
                            <Card.Text>
                                {usuario.descripcion.split(' ').slice(0, 15).join(' ')+"..."}
                            </Card.Text>
                        </Card.Body>
                    </Card>



                })}

            </div>
        </div>
    )
}

export default UsuariosInicio