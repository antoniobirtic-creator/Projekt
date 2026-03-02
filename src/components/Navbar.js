import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Dohvaćamo košaricu iz contexta za brojač
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const links = [
    { path: "/", label: "Početna" },
    { path: "/blog", label: "Blog" },
    { path: "/blog-predavanje", label: "BlogPredavanje" },
    { path: "/Onama", label: "O nama" },
    { path: "/kontakt", label: "Kontakt" },
    { path: "/form", label: "Form" },
    { path: "/torte", label: "Torte" },
    { path: "/shop", label: "Shop" },
    { path: "/users", label: "Users" },
    { path: "/profil", label: "Profil" },
    { path: "/korisnici", label: "Korisnici" },
    { path: "/tecaj", label: "Tečajna lista" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleGlobalEvents = (event) => {
      const isOutsideClick =
        isOpen && navRef.current && !navRef.current.contains(event.target);
      const isEscKey = event.key === "Escape";
      if (isOutsideClick || isEscKey) closeMenu();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleGlobalEvents);
      document.addEventListener("keydown", handleGlobalEvents);
    }
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

        {/* MOBILNI CART I HAMBURGER */}
        <div className="d-flex align-items-center d-lg-none gap-3">
          <NavLink
            to="/cart"
            className="text-white position-relative px-2"
            onClick={closeMenu}
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {cartItemsCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.6rem" }}
              >
                {cartItemsCount}
              </span>
            )}
          </NavLink>

          <label className="hamburger">
            <input type="checkbox" checked={isOpen} onChange={toggleMenu} />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              ></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        </div>

        {/* DESKTOP NAV */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto text-end py-3 py-lg-0 align-items-center">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink
                  to={link.path}
                  end
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `nav-link px-3 pb-2 transition-all ${isActive ? "active fw-bold border-bottom border-danger text-white" : "text-white-50"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            {/* DESKTOP CART IKONA */}
            <li className="nav-item ms-lg-3 d-none d-lg-block">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link position-relative py-2 px-3 transition-all ${isActive ? "text-danger" : "text-white"}`
                }
                onClick={closeMenu}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  size="lg"
                  title="Košarica"
                />
                {cartItemsCount > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cartItemsCount}
                  </span>
                )}
              </NavLink>
            </li>

            {/* ADMIN PRIJAVA */}
            <li className="nav-item ms-lg-2">
              <NavLink
                to="/admin-dashboard"
                className={({ isActive }) =>
                  `nav-link py-2 px-3 transition-all ${isActive ? "text-danger" : "text-white-50"}`
                }
                onClick={closeMenu}
              >
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  title="Admin Prijava"
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
