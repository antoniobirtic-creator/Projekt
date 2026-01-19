import React, { useState, useEffect } from "react";

const Korisnici = () => {
  const [podaci, setPodaci] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setPodaci(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Greška pri dohvaćanju:", error));
  }, []);

  if (isLoading) {
    return (
      <div class="spinner-border text-secondary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Popis korisnika (API)</h2>
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Ime</th>
            <th scope="col">Email</th>
            <th scope="col">Telefon</th>
            <th scope="col">Grad</th>
            <th scope="col">Tvrtka</th>
            <th scope="col">Adresa</th>
          </tr>
        </thead>
        <tbody>
          {podaci.map((korisnik) => (
            <tr key={korisnik.id}>
              <th scope="row">{korisnik.id}</th>
              <td>{korisnik.name}</td>
              <td>{korisnik.email}</td>
              <td>{korisnik.phone}</td>
              <td>{korisnik.address.city}</td>
              <td>{korisnik.company.name}</td>
              <td>{korisnik.address.street}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Korisnici;
