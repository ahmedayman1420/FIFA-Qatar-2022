// ===== --- ===== ### React ### ===== --- ===== //
import React from "react";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { NavLink, useLocation } from "react-router-dom";

// ===== --- ===== ### React-Bootstrap ### ===== --- ===== //
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Figure from "react-bootstrap/Figure";

// ===== --- ===== ### Images ### ===== --- ===== //
import cupImg from "../../Images/logo.png";

// ===== --- ===== ### NavigationBar-Component ### ===== --- ===== //
function NavigationBar() {
  // ===== --- ===== ### Component-States ### ===== --- ===== //
  // ===== --- ===== ### Component-Functions ### ===== --- ===== //

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#8b1538",
      }}
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/home">
          <Figure className="">
            <Figure.Image width={120} height={150} alt="171x180" src={cupImg} />
          </Figure>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav
            className="ms-auto"
            style={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            <Nav.Link as={NavLink} to="/home" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="text-white">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
