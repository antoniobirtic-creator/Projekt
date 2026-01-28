import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Torte.css";

const Torte = () => {
  const [torte, setTorte] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://front2.edukacija.online/backend/wp-json/wp/v2/torte?_embed";

  useEffect(() => {
    const fetchTorte = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTorte(data);
        setLoading(false);
      } catch (error) {
        console.error("Greška:", error);
        setLoading(false);
      }
    };
    fetchTorte();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Učitavam...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header Sekcija */}
        <div className="row mb-5 text-center">
          <div className="col-lg-8 mx-auto">
            <h1 className="display-4 fw-bold text-dark">
              Miki <span className="text-danger">Sweet Factory</span>
            </h1>
            <p className="lead text-muted">
              Naše najfinije torte rađene s ljubavlju i najboljim sastojcima.
            </p>
            <div className="border-bottom border-danger border-3 w-25 mx-auto mt-3"></div>
          </div>
        </div>

        <div className="row g-4">
          {torte.map((torta) => {
            const slika =
              torta._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            const { cijena_po_komadu, vrijeme_izrade, kratki_opis } =
              torta.acf || {};

            return (
              <div key={torta.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
                  {/* 1. Slika vodi na Single stranicu */}
                  <Link
                    to={`/torta/${torta.slug}`}
                    className="text-decoration-none"
                  >
                    <div
                      className="position-relative overflow-hidden"
                      style={{ height: "250px" }}
                    >
                      <img
                        src={slika || "https://via.placeholder.com/600x400"}
                        className="card-img-top h-100 w-100 object-fit-cover"
                        alt={torta.title.rendered}
                      />
                      {torta._embedded?.["wp:term"]?.[0]?.map((term) => (
                        <span
                          key={term.id}
                          className="badge bg-danger position-absolute top-0 end-0 m-3 shadow"
                        >
                          {term.name}
                        </span>
                      ))}
                    </div>
                  </Link>

                  <div className="card-body p-4 text-center d-flex flex-column">
                    {/* 2. Naslov vodi na Single stranicu */}
                    <Link
                      to={`/torta/${torta.slug}`}
                      className="text-decoration-none text-dark hover-danger-text"
                    >
                      <h5
                        className="card-title fw-bold mb-3"
                        dangerouslySetInnerHTML={{
                          __html: torta.title.rendered,
                        }}
                      />
                    </Link>

                    <p className="card-text text-muted small mb-4">
                      {kratki_opis ||
                        "Unikatna receptura Miki Sweet Factory-a."}
                    </p>

                    <div className="mt-auto d-flex justify-content-between align-items-center card-data-footer pt-3">
                      <div className="d-flex flex-column align-items-start">
                        <span className="label-small text-muted">Cijena</span>
                        <span className="text-success fs-4 fw-bold">
                          {cijena_po_komadu ? `${cijena_po_komadu} €` : "—"}
                        </span>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <span className="label-small text-muted">Izrada</span>
                        <span className="fw-semibold text-dark">
                          {vrijeme_izrade}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer bg-transparent border-0 p-4 pt-0">
                    {/* 3. Gumb vodi na Single stranicu za detalje i narudžbu */}
                    <Link
                      to={`/torta/${torta.slug}`}
                      className="btn btn-outline-danger w-100 fw-bold py-2 rounded-pill"
                    >
                      Pogledaj detalje
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Torte;
