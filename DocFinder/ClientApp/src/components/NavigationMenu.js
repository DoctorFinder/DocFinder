import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
//import { Container } from 'reactstrap'

export function Navigation() {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="#home">Medicmundo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="justify-content-end" as="ul">
                    <Nav.Item as="li">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                            <Nav.Link as={Link} to="/Search">Search</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="Login/Sign Up" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/Login/Patient">Patient</NavDropdown.Item>
                        <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/Login/Doctor">Doctor</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
                </Container>
        </Navbar>
    )
}



