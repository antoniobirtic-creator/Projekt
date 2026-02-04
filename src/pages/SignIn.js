import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SingIn.css";

/**
 * SignIn komponenta koja koristi WordPress Application Passwords
 * za autentifikaciju korisnika.
 */
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // SNR Savjet: Base64 encoding je potreban za Basic Auth preko WP-a
    const credentials = btoa(`${username}:${password}`);

    try {
      const response = await fetch(
        "https://front2.edukacija.online/backend/wp-json/wp/v2/users/me",
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        },
      );

      if (response.ok) {
        const userData = await response.json();
        // Spremamo token/kredencijale u localStorage za kasnije pozive
        localStorage.setItem("adminAuth", credentials);
        localStorage.setItem("adminUser", JSON.stringify(userData));

        // Preusmjeravanje na zaštićeni Admin Dashboard
        navigate("/admin-dashboard");
      } else {
        setError("Neispravno korisničko ime ili lozinka.");
      }
    } catch (err) {
      setError("Došlo je do greške u povezivanju s poslužiteljem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleLogin}>
        <h2>Admin Prijava</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label>Korisničko ime</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Lozinka (App Password)</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Provjera..." : "Prijavi se"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
