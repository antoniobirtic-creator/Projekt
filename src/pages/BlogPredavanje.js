import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogPredavanje.css";

/**
 * BlogPredavanje komponenta služi za dinamički prikaz postova s WordPress API-ja.
 * Podržava kombinirano filtriranje po kategorijama i autorima koristeći REST API parametre.
 */
const BlogPredavanje = () => {
  // --- STATE MANAGEMENT ---
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  // Filteri se inicijaliziraju na null (prikaz svih podataka)
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * Inicijalno dohvaćanje taksonomija (kategorije) i resursa (korisnici).
   * Izvršava se samo jednom pri montiranju komponente (Mounting).
   */
  useEffect(() => {
    // Dohvaćanje kategorija za filtriranje
    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) =>
        console.error("Kritična greška pri dohvatu kategorija:", err),
      );

    // Dohvaćanje autora - povećan limit na 20 radi izbjegavanja paginacije na malim setovima
    fetch(
      "https://front2.edukacija.online/backend/wp-json/wp/v2/users?per_page=20",
    )
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) =>
        console.error("Kritična greška pri dohvatu korisnika:", err),
      );
  }, []);

  /**
   * Glavni Data Fetching Effect.
   * Ovisi o stanju filtera. Koristi Template Literals za dinamičku izgradnju URL-a.
   */
  useEffect(() => {
    setLoading(true);

    // Base URL s uključenim _embed parametrom za dohvaćanje slika i autora u jednom pozivu
    let url =
      "https://front2.edukacija.online/backend/wp-json/wp/v2/posts?_embed";

    // Dinamičko dodavanje Query parametara (SNR pristup)
    if (selectedCategory) url += `&categories=${selectedCategory}`;
    if (selectedUser) url += `&author=${selectedUser}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Defensive programming: osiguravamo da je data uvijek niz prije mapiranja
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        // U slučaju greške čistimo prikaz da izbjegnemo prikaz starih/pogrešnih podataka
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedUser]); // Effect se ponovno pokreće na svaku promjenu filtera

  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="my-4 text-center">BlogPredavanje</h1>

        {/* --- SEKCIJA FILTRIRANJA --- */}

        {/* Kategorije */}
        {/* --- SEKCIJA FILTRIRANJA (Dropdown sustav) --- */}
        <div className="filter-wrapper mb-5 p-4 bg-white rounded shadow-sm">
          <div className="row g-3 align-items-end">
            {/* Dropdown za Kategorije */}
            <div className="col-md-5">
              <label htmlFor="categorySelect" className="form-label fw-bold">
                Kategorija:
              </label>
              <select
                id="categorySelect"
                className="form-select border-2"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Sve kategorije</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {/* Čistimo naziv kategorije od HTML entiteta */}
                    {category.name.replace(/&amp;/g, "&")}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown za Autore */}
            <div className="col-md-5">
              <label htmlFor="authorSelect" className="form-label fw-bold">
                Autor:
              </label>
              <select
                id="authorSelect"
                className="form-select border-2"
                value={selectedUser || ""}
                onChange={(e) => setSelectedUser(e.target.value || null)}
              >
                <option value="">Svi autori</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset gumb */}
            <div className="col-md-2">
              <button
                className="btn btn-outline-dark w-100"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedUser(null);
                }}
                disabled={!selectedCategory && !selectedUser}
              >
                Resetiraj
              </button>
            </div>
          </div>
        </div>

        {/* --- PRIKAZ PODATAKA --- */}
        <div className="row">
          {loading ? (
            <div className="col-12 text-center my-5">
              <div
                className="spinner-border text-danger"
                style={{ width: "3rem", height: "3rem" }}
              ></div>
              <p className="mt-3 text-muted">Učitavam</p>
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => {
              // Optimizirano izvlačenje slike koristeći Optional Chaining
              const image =
                post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
                  ?.full?.source_url;

              return (
                <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm border-0">
                    {image && (
                      <Link
                        to={`/blog/${post.slug}`}
                        className="overflow-hidden rounded-top"
                      >
                        <img
                          src={image}
                          alt={post.title.rendered}
                          className="card-img-top hover-zoom"
                        />
                      </Link>
                    )}
                    <div className="card-body d-flex flex-column">
                      <h2
                        className="h5 card-title fw-bold"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                      <div
                        className="card-text small text-muted mb-3 excerpt"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      />
                      <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {" "}
                          <strong>
                            {post._embedded?.author?.[0]?.name || "Nepoznato"}
                          </strong>
                        </small>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="btn btn-sm btn-primary px-3"
                        >
                          Saznaj više
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center my-5">
              <p className="h4 text-muted">Nažalost, ništ!</p>
              <button
                className="btn btn-outline-secondary mt-3"
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedUser(null);
                }}
              >
                Poništi sve filtere
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPredavanje;
