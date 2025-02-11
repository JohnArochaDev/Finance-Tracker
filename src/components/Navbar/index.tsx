/** @jsxImportSource @emotion/react */
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.ts';

const NavBar: React.FC = () => {
  return (
    <div css={styles.navStyle}>
      <BootstrapNavbar expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <BootstrapNavbar.Brand as={Link} to="/">FiSave</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="offcanvasNavbar" />
          <BootstrapNavbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 pe-3" style={{ textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                <Nav.Link as={Link} to="/" style={{ marginBottom: '2vh', marginTop: '2vh' }}>Home</Nav.Link>
                <Nav.Link as={Link} to="/my-finances" style={{ marginBottom: '2vh' }}>My Finances</Nav.Link>
                <Nav.Link as={Link} to="/settings" style={{ marginBottom: '2vh' }}>Settings</Nav.Link>
                <Nav.Link as={Link} to="/logout" style={{ marginBottom: '2vh' }}>Log Out/Login</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </BootstrapNavbar.Offcanvas>
        </Container>
      </BootstrapNavbar>
    </div>
  );
};

export default NavBar;