import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { path: '/', label: 'Početna' },
    { path: '/blog', label: 'Blog' },
    { path: '/blog/mladen-grdovic', label: 'Vijesti' }, 
    { path: '/Onama', label: 'O nama' },
    { path: '/Kontakt', label: 'Kontakt' },
    { path: '/users', label: 'Users' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <NavLink className="navbar-brand" color="white" to="/">
          <img src="img/logo.jpg" alt="logo" height="20" className="me-2" />
          PRO-App
        </NavLink>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink 
                  to={link.path} 
                  end 
                  className={({ isActive }) => 
                    isActive ? "nav-link active fw-bold border-bottom border-danger pb-2" : "nav-link pb-2"
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