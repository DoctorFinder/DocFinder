import React, { useContext } from "react";
import { Route, useLocation, useHistory } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MenuTypeContext } from "../context/MenuContextProvider";
import Logo from "../images/logo.png";

export function DoctorNavigationMenu() {
  const context = useContext(MenuTypeContext);
  let location = useLocation();
  let history = useHistory();

  function naviagateToHome() {
    let firstIndexOfPath = location.pathname.indexOf("/");
    let doctorProfilePath =
      location.pathname.substring(0, firstIndexOfPath + 1) + "Home";
    context.dispatch({ type: "user" });
    history.push(doctorProfilePath);
  }

  return (
    <Navbar>
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img src={Logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="justify-content-end" as="ul">
            <Nav.Item as="li">
              <Nav.Link onClick={naviagateToHome}>Logout</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
