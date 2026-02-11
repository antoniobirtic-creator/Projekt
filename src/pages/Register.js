import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ovdje će ići provjera lozinki i API poziv
    console.log("Registracija:", formData);
  };

  return (
    <div className="container-fluid register-wrapper d-flex align-items-center justify-content-center">
      <div className="card register-card border-0 shadow-lg">
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold">Kreiraj račun</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small text-muted">
                Korisničko ime
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-user text-secondary"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="npr. jdoe123"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted">
                Email adresa
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-envelope text-secondary"></i>
                </span>
                <input
                  type="email"
                  className="form-control bg-light border-start-0"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ime@primjer.com"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small text-muted">Lozinka</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-lock text-secondary"></i>
                </span>
                <input
                  type="password"
                  className="form-control bg-light border-start-0"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small text-muted">
                Potvrda lozinke
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <i className="fas fa-check-double text-secondary"></i>
                </span>
                <input
                  type="password"
                  className="form-control bg-light border-start-0"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-2 fw-bold shadow-sm"
            >
              Registriraj se
            </button>
          </form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Već imaš račun?{" "}
              <a
                href="/admin-dashboard"
                className="text-decoration-none text-dark fw-bold"
              >
                Prijavi se
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
