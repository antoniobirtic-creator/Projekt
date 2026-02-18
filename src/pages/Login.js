import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // WP zahtijeva JWT plugin za ovaj endpoint
      const response = await fetch(
        "https://front2.edukacija.online/backend/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await response.json();

      if (response.ok && data.token) {
        // Pohrana tokena u localStorage - Senior standard za WP REST API
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_nicename", data.user_nicename);

        // Nakon uspješnog logina, idemo na admin
        navigate("/admin");
      } else {
        setError(data.message || "Neispravno korisničko ime ili lozinka.");
      }
    } catch (err) {
      setError("Problem s povezivanjem na server.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Panel Login</h2>
        {error && <p className="error-msg">{error}</p>}

        <div className="input-group">
          <label>Korisničko ime</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Lozinka</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn">
          Prijavi se
        </button>
      </form>
    </div>
  );
};

export default Login;
