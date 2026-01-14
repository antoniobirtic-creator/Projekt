import { useState, useEffect } from 'react';
import './Users.css';

function Users() {
  const [korisnici, setKorisnici] = useState([]);
  const [loading, setLoading] = useState(true);
  // 1. Novo stanje za tekst pretrage
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setKorisnici(data);
        setLoading(false);
      });
  }, []);

  // 2. Logika za filtriranje: stvori novi niz koji sadrži samo one koji odgovaraju pretrazi
  const filtriraniKorisnici = korisnici.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>CRM Korisnici</h2>
        <span className="badge bg-primary">{filtriraniKorisnici.length} pronađeno</span>
      </div>

      {/* 3. Input polje za pretragu */}
      <div className="mb-4">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Pretraži po imenu..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {/* 4. Mapiramo filtrirane korisnike umjesto svih */}
        {filtriraniKorisnici.map(user => (
          <div className="col-md-6 col-lg-4 mb-3" key={user.id}>
            <div className="card h-100 shadow-sm user-card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">@{user.username}</h6>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Firma:</strong> {user.company.name}
                </p>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary btn-sm">Uredi</button>
                  <button className="btn btn-outline-danger btn-sm">Obriši</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;