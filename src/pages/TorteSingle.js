import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./TorteSingle.css";

const TorteSingle = () => {
  const { slug } = useParams();
  const [torta, setTorta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTorta = async () => {
      try {
        const response = await fetch(
          `https://front2.edukacija.online/backend/wp-json/wp/v2/torte?slug=${slug}&_embed`,
        );
        const data = await response.json();
        if (data.length > 0) {
          setTorta(data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Greška pri dohvaćanju torte:", error);
        setLoading(false);
      }
    };
    fetchTorta();
  }, [slug]);

  useEffect(() => {
    if (torta && torta.title?.rendered) {
      const privremeniDiv = document.createElement("div");
      privremeniDiv.innerHTML = torta.title.rendered;
      const cistiNaslov = privremeniDiv.textContent;

      document.title = `${cistiNaslov} | Miki Sweet Factory`;
    }

    return () => {
      document.title = "Miki Sweet Factory | Najbolje Torte";
    };
  }, [torta]);

  if (loading) return <div className="loader">Učitavam slasticu...</div>;
  if (!torta)
    return <div className="container mt-5">Torta nije pronađena.</div>;

  const { cijena_po_komadu, vrijeme_izrade, kratki_opis } = torta.acf || {};
  const slika = torta._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="torte-single-page py-5">
      <div className="container">
        <Link to="/torte" className="btn btn-link text-danger mb-4 p-0">
          ← Povratak na ponudu
        </Link>

        <div className="row g-5 align-items-center">
          {/* Lijeva strana: Slika */}
          <div className="col-lg-6">
            <div className="image-wrapper shadow-lg rounded-4 overflow-hidden">
              <img
                src={slika}
                alt={torta.title.rendered}
                className="img-fluid w-100"
              />
            </div>
          </div>

          {/* Desna strana: Informacije */}
          <div className="col-lg-6">
            <div className="ps-lg-4">
              <div className="mb-2">
                {torta._embedded?.["wp:term"]?.[0]?.map((term) => (
                  <span
                    key={term.id}
                    className="badge bg-danger-subtle text-danger me-2 uppercase-badge"
                  >
                    {term.name}
                  </span>
                ))}
              </div>

              <h1
                className="display-4 text-center fw-bold mb-3"
                dangerouslySetInnerHTML={{ __html: torta.title.rendered }}
              />

              <p className="lead text-muted text-center mb-4">{kratki_opis}</p>

              <div className="data-box d-flex gap-5 text-center py-4 border-top border-bottom mb-4">
                <div>
                  <span className="d-block text-muted small text-uppercase fw-bold">
                    Cijena
                  </span>
                  <span className="fs-2 fw-bold text-success">
                    {cijena_po_komadu} €
                  </span>
                </div>
                <div>
                  <span className="d-block text-muted small text-uppercase fw-bold">
                    Vrijeme izrade
                  </span>
                  <span className="fs-4 fw-semibold">{vrijeme_izrade}</span>
                </div>
              </div>

              <div
                className="content-rich mb-5"
                dangerouslySetInnerHTML={{ __html: torta.content.rendered }}
              />

              <button className="btn btn-danger btn-lg px-5 py-3 rounded-pill fw-bold shadow">
                Naruči odmah
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TorteSingle;
