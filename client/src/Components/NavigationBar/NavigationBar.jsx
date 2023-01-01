// ===== --- ===== ### React ### ===== --- ===== //
import React, { useEffect, useState } from "react";

// ===== --- ===== ### JWT-Decode ### ===== --- ===== //
import jwt_decode from "jwt-decode";

// ======= --- ======= <| React-Router-Dom |> ======= --- ======= //
import { NavLink, useLocation } from "react-router-dom";

// ===== --- ===== ### React-Redux ### ===== --- ===== //
import { useDispatch, useSelector } from "react-redux";

// ===== --- ===== ### Stadium-Actions ### ===== --- ===== //
import { LogoutAction } from "../../Redux/Actions/UserAction";

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
  const dispatch = useDispatch();

  // ===== --- ===== ### Component-States ### ===== --- ===== //
  let [isAdmin, setIsAdmin] = useState(false);
  let [isManager, setIsManager] = useState(false);
  let [isFan, setIsFan] = useState(false);
  let [waiting, setWaiting] = useState(true);
  let [isAuth, setIsAuth] = useState(false);

  // ===== --- ===== ### Component-Functions ### ===== --- ===== //
  const getUserRole = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      let decoded = await jwt_decode(token);
      if (decoded.data.role === "admin") setIsAdmin(true);
      if (decoded.data.role === "manager") setIsManager(true);
      if (decoded.data.role === "fan") setIsFan(true);
    } else {
      setIsAdmin(false);
      setIsManager(false);
      setIsFan(false);
    }
  };

  const execute = async () => {
    setWaiting(true);
    if (location.pathname === "/register" || location.pathname === "/login")
      setIsAuth(true);
    else setIsAuth(false);
    await getUserRole();
    setWaiting(false);
  };

  useEffect(() => {
    execute();
  }, [location.pathname]);

  // ===== --- ===== ### Component-JSX ### ===== --- ===== //
  return (
    <Navbar
      expand="lg"
      className="fixed-top"
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
              {(isManager || isAdmin) && (
                <Nav.Link as={NavLink} to="/stadium" className="text-white">
                  Create Stadium
                </Nav.Link>
              )}
              {(isManager || isAdmin) && (
                <Nav.Link
                  as={NavLink}
                  to="/create-match/0"
                  className="text-white"
                >
                  Create Match
                </Nav.Link>
              )}

              {(isManager || isAdmin || isFan) && (
                <Nav.Link as={NavLink} to="/tickets" className="text-white">
                  Tickets
                </Nav.Link>
              )}

              <Nav.Link as={NavLink} to="/matches" className="text-white">
                Matches
              </Nav.Link>

              <Nav.Link as={NavLink} to="/stadiums" className="text-white">
                Stadiums
              </Nav.Link>

              {(isManager || isAdmin || isFan) && (
                <Nav.Link as={NavLink} to="/profile" className="text-white">
                  Profile
                </Nav.Link>
              )}

              {Object.keys(user).length === 0 && (
                <Nav.Link as={NavLink} to="/login" className="text-white">
                  Login
                </Nav.Link>
              )}

              {Object.keys(user).length !== 0 && (
                <Nav.Link
                  as={NavLink}
                  onClick={async () => {
                    localStorage.clear();
                    await dispatch(LogoutAction({}));
                  }}
                  to="/login"
                  className="text-white"
                >
                  Logout
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
