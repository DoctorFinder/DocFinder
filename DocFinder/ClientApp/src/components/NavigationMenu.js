import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MenuTypeContext } from "../context/MenuContextProvider";
import Logo from "../images/logo.png";
//import { Container } from 'reactstrap'

export function Navigation() {
  const context = useContext(MenuTypeContext);

  console.log(context);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="home">
          <img src={Logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end" as="ul">
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/AboutUs">
                About Us
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/Services">
                Services
              </Nav.Link>
            </Nav.Item>
            <NavDropdown title="Become a member" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/List/yourself">
                How to list yourself
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/List/Hospitals">
                Hospitals
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/List/physicians">
                Physician Health Care Profession
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Find" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Find/Hospitals">
                Hospital
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Find/Doctors">
                Health Care Professional
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Find/Trials">
                Clinical Trials
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Others" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/Help">
                Help
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Email">
                Email
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Legal">
                Legal
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/">
                Home
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/DoctorLogin">
                Login{" "}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
