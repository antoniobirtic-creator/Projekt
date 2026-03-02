import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { API_URLS, authenticatedFetch } from "../api";
import "./AuthorPage.css";

const AuthorPage = () => {
  const { slug } = useParams();
  const [author, setAuthor] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const perPage = 9;

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      // 1. DOHVAT AUTORA - koristimo čisti URL + query
      const userRes = await authenticatedFetch(
        `${API_URLS.users}?slug=${slug}`,
      );
      const userData = userRes?.data;

      if (!Array.isArray(userData) || userData.length === 0) {
        setAuthor(null);
        setLoading(false);
        return;
      }

      const foundAuthor = userData[0];
      setAuthor(foundAuthor);

      // 2. DOHVAT POSTOVA - ispravna konstrukcija URL-a
      // Koristimo & jer znamo da API_URLS.posts nema upitnik
      const postsUrl = `${API_URLS.posts}?author=${foundAuthor.id}&_embed&per_page=${perPage}&page=${currentPage + 1}`;
      const postRes = await authenticatedFetch(postsUrl);

      if (postRes?.data && Array.isArray(postRes.data)) {
        setPosts(postRes.data);
        const totalPages = postRes.headers.get("X-WP-TotalPages");
        setPageCount(totalPages ? Number(totalPages) : 1);
      }
    } catch (err) {
      console.error("Greška pri učitavanju:", err);
    } finally {
      setLoading(false);
    }
  }, [slug, currentPage]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border"></div>
      </div>
    );

  if (!author)
    return (
      <div className="text-center my-5">
        <h2>Autor nije pronađen</h2>
        <Link to="/blogpredavanje">Povratak</Link>
      </div>
    );

  return (
    <div className="container my-5">
      <header className="author-header text-center p-5 mb-5 bg-white shadow-sm border rounded">
        {author.avatar_urls?.["96"] && (
          <img
            src={author.avatar_urls["96"]}
            className="rounded-circle mb-3 border"
            alt={author.name}
            style={{ width: "100px" }}
          />
        )}
        <h1 className="fw-bold">{author.name}</h1>
        <p className="text-muted">{author.description}</p>
      </header>

      <div className="row">
        <h3 className="mb-4">Objavljeni članci:</h3>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h5
                    className="fw-bold"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <div
                    className="small text-muted mb-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <Link
                    to={`/blog/${post.slug}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Pročitaj više
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted">
              Nema pronađenih članaka za ovog autora.
            </p>
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={pageCount}
            onPageChange={(data) => setCurrentPage(data.selected)}
            containerClassName={"pagination gap-2"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link rounded"}
            activeClassName={"active"}
            forcePage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
