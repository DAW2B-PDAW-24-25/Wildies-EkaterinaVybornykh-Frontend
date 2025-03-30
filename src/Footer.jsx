import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white py-4 mt-5 d-none d-md-block" style={{backgroundColor: " #77878Eff"}}>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col md={6} className="mb-3 mb-md-0">
            <Navbar.Brand href="/" className="text-white">
              <h4>Wildies</h4>
            </Navbar.Brand>
            <p>Explore outdoor adventures and connect with like-minded individuals.</p>
          </Col>

          <Col md={3} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="/" className="text-white">Home</Nav.Link>
              <Nav.Link href="/about" className="text-white">About</Nav.Link>
              <Nav.Link href="/contact" className="text-white">Contact</Nav.Link>
            </Nav>
          </Col>

          <Col md={3} className="mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <FaLinkedin size={24} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

