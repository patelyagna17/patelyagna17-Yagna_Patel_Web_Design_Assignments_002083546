import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import "./navbar.css";

function NavbarComponent({ onLogout }) {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Link to="/home" className="navbar-brand">
          Growth
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/jobs" className="nav-link">Jobs</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/companies" className="nav-link">Company Showcase</Link>
          </Nav>
          
          <Nav className="ms-auto">
            <Logout onLogout={onLogout} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;