import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import "./Kontakt.css";

const Kontakt = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/pages/1184")
      .then((res) => res.json())
      .then((data) => {
        setInfo(data.acf);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loader-container">Slatkiši stižu...</div>;
  if (!info)
    return <div className="error-container">Podaci nisu dostupni.</div>;

  return (
    <main className="kontakt-page-wrapper">
      <div className="container py-5">
        <div className="row g-5 align-items-stretch">
          {/* LIJEVA STRANA: INFO KARTICA */}
          <section className="col-lg-5" aria-labelledby="contact-heading">
            <div className="content-card p-4 p-md-5 shadow-lg rounded-4 h-100">
              <header>
                <h1 id="contact-heading" className="display-6 fw-bold mb-2">
                  Kontaktirajte nas
                </h1>
                <p className="text-muted mb-5">
                  Miki Sweet Factory - najbolje torte u Đakovu.
                </p>
              </header>

              {/* 'address' SEO */}
              <address className="info-list" style={{ fontStyle: "normal" }}>
                {/* ADRESA */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.adresa)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="info-item mb-4 clickable-item"
                >
                  <div className="icon-box me-2">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h6>Adresa</h6>
                    <p>{info.adresa}</p>
                  </div>
                </a>

                {/* TELEFON */}
                <a
                  href={`tel:${info.telefon}`}
                  className="info-item mb-4 clickable-item"
                >
                  <div className="icon-box me-2">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h6>Telefon</h6>
                    <p>{info.telefon}</p>
                  </div>
                </a>

                {/* EMAIL */}
                <a
                  href={`mailto:${info.email}`}
                  className="info-item mb-4 clickable-item"
                >
                  <div className="icon-box me-2">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h6>Email</h6>
                    <p>{info.email}</p>
                  </div>
                </a>

                {/* RADNO VRIJEME */}
                <div className="info-item mb-4">
                  <div className="icon-box">
                    <FaClock />
                  </div>
                  <div>
                    <h6>Radno vrijeme</h6>
                    <p className="pre-line">{info.radno_vrijeme}</p>
                  </div>
                </div>

                {/* DOSTAVA - 'aside' ili 'article' jer je to zasebna informacija */}
                <article className="delivery-card mt-4 p-3 rounded-3 d-flex align-items-center gap-3">
                  <FaTruck className="fs-3 text-danger" />
                  <p className="small mb-0">{info.info_dostave}</p>
                </article>
              </address>

              {/* SOCIAL MEDIA - 'nav' jer su to vanjski navigacijski linkovi */}
              <nav
                className="social-links-wrapper mt-5"
                aria-label="Social media"
              >
                <div className="social-grid">
                  {info.facebook && (
                    <a
                      href={info.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill fb"
                    >
                      <FaFacebookF /> <span>Facebook</span>
                    </a>
                  )}

                  {info.instagram && (
                    <a
                      href={info.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill ig"
                    >
                      <FaInstagram /> <span>Instagram</span>
                    </a>
                  )}

                  {info.whatsapp && (
                    <a
                      href={`https://wa.me/${info.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="social-pill wa"
                    >
                      <FaWhatsapp /> <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </nav>
            </div>
          </section>

          {/* DESNA STRANA: MAPA */}
          <section className="col-lg-7">
            <div
              className="map-container shadow-lg rounded-4 overflow-hidden h-100"
              style={{ minHeight: "500px" }}
            >
              {info.maps_url ? (
                <iframe
                  title="Miki Sweet Factory Lokacija na mapi"
                  src={info.maps_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="h-100 d-flex align-items-center justify-content-center bg-light">
                  <p className="text-muted">Karta se učitava...</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Kontakt;
