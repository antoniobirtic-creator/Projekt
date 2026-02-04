import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null); // Referenca za detekciju klika izvan navbara

  const links = [
    { path: "/", label: "Početna" },
    { path: "/blog", label: "Blog" },
    { path: "/blog-predavanje", label: "BlogPredavanje" },
    { path: "/Onama", label: "O nama" },
    { path: "/kontakt", label: "Kontakt" },
    { path: "/form", label: "Form" },
    { path: "/torte", label: "Torte" },
    { path: "/users", label: "Users" },
    { path: "/profil", label: "Profil" },
    { path: "/korisnici", label: "Korisnici" },
    { path: "/tecaj", label: "Tečajna lista" },
    {
      path: "/admin-dashboard",
      label: <FontAwesomeIcon icon={faRightToBracket} title="Admin Prijava" />,
      isIcon: true,
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // SNR Logic: Zatvaranje izbornika klikom sa strane ili tipkom Escape
  useEffect(() => {
    const handleGlobalEvents = (event) => {
      // 1. Provjera klika izvan navbara
      const isOutsideClick =
        isOpen && navRef.current && !navRef.current.contains(event.target);

      // 2. Provjera tipke Escape
      const isEscKey = event.key === "Escape";

      if (isOutsideClick || isEscKey) {
        closeMenu();
      }
    };

    // Dodajemo listenere samo kada je izbornik otvoren (optimizacija)
    if (isOpen) {
      document.addEventListener("mousedown", handleGlobalEvents);
      document.addEventListener("keydown", handleGlobalEvents);
    }

    // Cleanup funkcija: obavezno micanje listenera (sprječava memory leak)
    return () => {
      document.removeEventListener("mousedown", handleGlobalEvents);
      document.removeEventListener("keydown", handleGlobalEvents);
    };
  }, [isOpen]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top"
      ref={navRef}
    >
      <div className="container">
        {/* LOGO */}
        <NavLink
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={closeMenu}
        >
          <img
            src="img/logo.jpg"
            alt="logo"
            height="30"
            className="me-2 rounded shadow-sm"
          />
          <span className="fw-bold">PRO-App</span>
        </NavLink>

        {/* HAMBURGER (Custom SVG) */}
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

        {/* NAVIGATION LINKS */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto text-end py-3 py-lg-0">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink
                  to={link.path}
                  end
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav-link px-3 pb-2 transition-all ${
                      isActive
                        ? "active fw-bold border-bottom border-danger text-white"
                        : "text-white-50"
                    }`
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
