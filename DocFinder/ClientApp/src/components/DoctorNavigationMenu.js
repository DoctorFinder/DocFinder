import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';



export function DoctorNavigationMenu() {

    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="#home">Medicmundo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end" as="ul">
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="/AboutUs">Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                 </Navbar.Collapse>
            </Container>
        </Navbar>
        )

}