import React from 'react'

function Contact() {
 return (
    <div className="container-fluid-lg m-5 min-vh-100">
      <h2 className='mt-5'>🏕️ ¡Hablemos!</h2>
      <p>¿Tienes una duda, una idea loca o simplemente quieres saludar?</p>
      <p className='mb-5'>En <strong>Wildies</strong> nos encanta escuchar a la comunidad (sí, a ti también 😎).</p>

      <h3 className='mt-5'>📬 Escríbenos</h3>
      <p><strong>Email:</strong> <a href="mailto:hola@wildies.com">hola@wildies.com</a></p>
      <p><strong>Problemas técnicos o trolls sueltos:</strong> <a href="mailto:reportes@wildies.com">reportes@wildies.com</a></p>
    </div>
  );
}

export default Contact