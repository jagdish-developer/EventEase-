import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

import logo from "../../assets/images/logo.png";

function Navbar() {
  return (
    <header className="navbar">

      {/* ================= BRAND ================= */}

      <NavLink
        to="/"
        className="navbar-brand"
      >
        <img
          src={logo}
          alt="EventEase"
          className="navbar-logo"
        />

        <span className="navbar-title">
          Event planner
        </span>
      </NavLink>


      {/* ================= NAVIGATION ================= */}

      <nav className="navbar-links">

        <NavLink
          to="/"
          className="navbar-link"
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className="navbar-link"
        >
          About us
        </NavLink>

        <NavLink
          to="/contact"
          className="navbar-link"
        >
          Contact us
        </NavLink>

        <NavLink
          to="/services"
          className="navbar-link"
        >
          Services
        </NavLink>

      </nav>


      {/* ================= LOGIN ================= */}

      <NavLink
        to="/login"
        className="navbar-login"
      >
        <span className="user-circle">
          ○
        </span>

        <span>
          Login
        </span>
      </NavLink>


      {/* ================= MOBILE MENU ================= */}

      <button
        type="button"
        className="navbar-menu"
        aria-label="Open navigation menu"
      >
        ☰
      </button>

    </header>
  );
}

export default Navbar;