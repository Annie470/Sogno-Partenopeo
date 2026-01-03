import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/SPEsteso2.png";


const NavSogno = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-grad sticky-xs-md ">
      <Container fluid>
       <img src={logo} alt="Logo" id="logo-nav" />
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border-0"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto text-end fs-5">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link ${isActive ? "tert fw-bold" : "text-light"}`
              }>
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `nav-link ${isActive ? "tert fw-bold" : "text-light"}`
              }>
              Menù
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link ${isActive ? "tert fw-bold" : "text-light"}`
              }>
              Chi Siamo
            </NavLink>
            <NavLink
              to="/write"
              className={({ isActive }) =>
                `nav-link ${isActive ? "tert fw-bold" : "text-light"}`
              }>
              Scrivici
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavSogno;
