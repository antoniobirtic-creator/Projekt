import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Vraćamo sve tvoje rute u niz
  const links = [
    { path: "/", label: "Početna" },
    { path: "/blog", label: "Blog" },
    { path: "/Onama", label: "O nama" },
    { path: "/kontakt", label: "Kontakt" },
    { path: "/torte", label: "Torte" },
    { path: "/users", label: "Users" },
    { path: "/profil", label: "Profil" },
    { path: "/korisnici", label: "Korisnici" },
    { path: "/tecaj", label: "Tečajna lista" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <NavLink className="navbar-brand" to="/" onClick={closeMenu}>
          <img src="img/logo.jpg" alt="logo" height="20" className="me-2" />
          PRO-App
        </NavLink>

        <label className="hamburger d-lg-none">
          <input type="checkbox" checked={isOpen} onChange={toggleMenu} />
          <svg viewBox="0 0 32 32">
            <path
              className="line line-top-bottom"
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
            ></path>
            <path className="line" d="M7 16 27 16"></path>
          </svg>
        </label>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink
                  to={link.path}
                  end
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link active fw-bold border-bottom border-danger pb-2"
                      : "nav-link pb-2"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
