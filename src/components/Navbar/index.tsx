/** @jsxImportSource @emotion/react */
import React from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Container, Offcanvas } from 'react-bootstrap';
import styles from './styles.ts';

const NavBar: React.FC = () => {
  return (
    <div css={styles.navStyle}>
      <BootstrapNavbar expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <BootstrapNavbar.Brand href="#">Navbar</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="offcanvasNavbar" />
          <BootstrapNavbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </BootstrapNavbar.Offcanvas>
        </Container>
      </BootstrapNavbar>
    </div>
  );
};

export default NavBar;