import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          {/* Brand i Copyright */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className="text-uppercase fw-bold">PRO-App</h5>
            <p className="small mb-0 text-secondary">
              &copy; {currentYear} Sva prava pridržana.
            </p>
          </div>

          {/* Brzi linkovi - koristimo Link umjesto a tagova */}
          <div className="col-md-4 text-center">
<ul className="list-inline mb-0">
    <li className="list-inline-item">
      <Link to="/blog" className="text-secondary text-decoration-none px-2">Blog</Link>
    </li>
    <li className="list-inline-item">
      <Link to="/Onama" className="text-secondary text-decoration-none px-2">O nama</Link>
    </li>
    <li className="list-inline-item">
      <Link to="/Kontakt" className="text-secondary text-decoration-none px-2">Kontakt</Link>
    </li>
    <li className="list-inline-item">
      <Link to="/users" className="text-secondary text-decoration-none px-2">Korisnici</Link>
    </li>
  </ul>
          </div>

          {/* Social (placeholderi) */}
          <div className="col-md-4 text-center text-md-end">
            <span className="text-secondary small">Pratite nas:</span>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mt-2">
              <i className="bi bi-github pointer"></i>
              <i className="bi bi-linkedin pointer"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;