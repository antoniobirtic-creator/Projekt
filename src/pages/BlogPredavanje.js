import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./BlogPredavanje.css";

const BlogPredavanje = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch(
      "https://front2.edukacija.online/backend/wp-json/wp/v2/users?per_page=20",
    )
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    setLoading(true);

    const per_page = 9;
    let url = `https://front2.edukacija.online/backend/wp-json/wp/v2/posts?_embed&per_page=${per_page}&page=${currentPage + 1}`;

    if (selectedCategory) url += `&categories=${selectedCategory}`;
    if (selectedUser) url += `&author=${selectedUser}`;

    fetch(url)
      .then((res) => {
        const totalPages = res.headers.get("X-WP-TotalPages");
        setPageCount(totalPages ? Number(totalPages) : 0);

        return res.json();
      })
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Greška pri dohvatu:", err);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, selectedUser, currentPage]);

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
        {pageCount > 1 && (
          <div className="pagination-wrapper d-flex justify-content-center my-5">
            <ReactPaginate
              previousLabel={"Prethodna"}
              nextLabel={"Sljedeća"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={(data) => {
                setCurrentPage(data.selected);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPredavanje;
