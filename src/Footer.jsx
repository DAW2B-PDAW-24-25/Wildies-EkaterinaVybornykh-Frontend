import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" py-4 mt-5 d-none d-md-block " /* style={{backgroundColor: " #6E90A1ff"}} */>
      <Container>
        <Row className="d-flex justify-content-between">
          <hr />
          <Col md={5} className="mb-3 mb-md-0">
            <Navbar.Brand href="/" className="text-center">
              <h4>Wildies</h4>
            </Navbar.Brand>
            <div className='text-center mt-5'>
              <p >Explore outdoor adventures and connect with like-minded individuals.</p>
            </div>

          </Col>

          <Col md={3} className="mb-3 mb-md-0 text-center">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="/" className="">Home</Nav.Link>
              <Nav.Link href="/about" className="">About</Nav.Link>
              <Nav.Link href="/contact" className="">Contact</Nav.Link>
            </Nav>
          </Col>

          <Col md={3} className="mb-md-0 text-center">
            <h5>Follow Us</h5>
            <div className='mt-3'>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" me-3">
                <FaInstagram size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

