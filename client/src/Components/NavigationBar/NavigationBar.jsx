// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### JWT-Decode ### ===== --- ===== //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { NavLink, useLocation } from "react-router-dom";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

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
  const user = useSelector((state) => state.user);
  const location = useLocation();
  console.log({ path: location.pathname });
  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [isAdmin, setIsAdmin] = useState(false);
  let [waiting, setWaiting] = useState(true);
  let [isAuth, setIsAuth] = useState(false);

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  const getUserRole = async () => {
    let token = localStorage.getItem("token");
    let decoded = await jwt_decode(token);
    if (decoded.data.role === "admin") setIsAdmin(true);
  };

  useEffect(() => {
    setWaiting(true);

    if (location.pathname === "/register" || location.pathname === "/login")
      setIsAuth(true);
    else setIsAuth(false);
    getUserRole();

    setWaiting(false);
  }, [location.pathname]);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //
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
        {!isAuth && (
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
              {isAdmin && (
                <Nav.Link as={NavLink} to="/user-auth" className="text-white">
                  User-Authority
                </Nav.Link>
              )}
              {Object.keys(user).length === 0 && (
                <Nav.Link as={NavLink} to="/login" className="text-white">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
