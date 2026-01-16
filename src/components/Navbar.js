import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // Dodajemo novu putanju u naš konfiguracijski niz
  const links = [
    { path: '/', label: 'Početna' },
    { path: '/blog', label: 'Blog' },
    { path: '/blog/mladen-grdovic', label: 'Vijesti' }, // Nova stavka
    { path: '/Onama', label: 'O nama' },
    { path: '/Kontakt', label: 'Kontakt' },
    { path: '/users', label: 'Users' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src="img/header/logo.svg" alt="logo" height="20" className="me-2" />
          PRO-App
        </NavLink>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink 
                  to={link.path} 
                  className={({ isActive }) => 
                    isActive ? "nav-link active fw-bold border-bottom border-danger" : "nav-link"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          
          {/* Desna strana navbara za ikone (SignIn/Cart) iz tvog HTML-a */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;