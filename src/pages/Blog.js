import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import SkeletonCard from "../components/SkeletonCard";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "Sve";

  // State za "debounced" search pojam kako ne bismo slali fetch na svako slovo
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const postsPerPage = 6;

  // 1. Debounce logika: Čekamo 500ms nakon što korisnik prestane tipkati
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. Fetch Kategorija (samo jednom pri loadu)
  useEffect(() => {
    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Greška kategorije:", err));
  }, []);

  // 3. SNR SERVER-SIDE FILTERING: Poziva se na promjenu kategorije ili debounced searcha
  useEffect(() => {
    setLoading(true);
    setPage(1);
    setHasMore(true);

    // Nađemo ID kategorije jer WP API ne prima ime nego ID
    const categoryId = categories.find((c) => c.name === selectedCategory)?.id;

    let url = `https://front2.edukacija.online/backend/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=1`;
    if (debouncedSearch)
      url += `&search=${encodeURIComponent(debouncedSearch)}`;
    if (categoryId) url += `&categories=${categoryId}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        if (data.length < postsPerPage) setHasMore(false);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [debouncedSearch, selectedCategory, categories]);

  // 4. Load More funkcija (isto ide na server)
  const loadMorePosts = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    const categoryId = categories.find((c) => c.name === selectedCategory)?.id;

    let url = `https://front2.edukacija.online/backend/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${nextPage}`;
    if (debouncedSearch)
      url += `&search=${encodeURIComponent(debouncedSearch)}`;
    if (categoryId) url += `&categories=${categoryId}`;

    fetch(url)
      .then((res) => res.json())
      .then((newData) => {
        if (newData.length < postsPerPage) setHasMore(false);
        setPosts((prev) => [...prev, ...newData]);
        setPage(nextPage);
      })
      .catch(() => setHasMore(false))
      .finally(() => setLoadingMore(false));
  };

  const updateFilters = (newCategory, newSearch) => {
    const params = {};
    if (newCategory && newCategory !== "Sve") params.category = newCategory;
    if (newSearch) params.search = newSearch;
    setSearchParams(params);
  };

  return (
    <div className="blog-page">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center my-4 gap-3">
          <h1 className="m-0">Šareni Blog Iz WordPress</h1>

          <div className="search-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Pretraži cijelu bazu..."
              className="form-control search-input"
              value={searchTerm}
              onChange={(e) => updateFilters(selectedCategory, e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-button"
                onClick={() => updateFilters(selectedCategory, "")}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </div>

        <div className="category-filters d-flex flex-wrap gap-2 mb-4">
          <button
            className={`btn btn-sm ${selectedCategory === "Sve" ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => updateFilters("Sve", searchTerm)}
          >
            Sve
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`btn btn-sm ${selectedCategory === cat.name ? "btn-danger" : "btn-outline-danger"}`}
              onClick={() => updateFilters(cat.name, searchTerm)}
              dangerouslySetInnerHTML={{ __html: cat.name }}
            />
          ))}
        </div>

        <div className="row g-4">
          {loading && page === 1 ? (
            Array(6)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          ) : posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <div key={post.id} className="col-md-6 col-lg-4 d-flex">
                  <div className="blog-post shadow-sm w-100">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={
                          post._embedded?.["wp:featuredmedia"]?.[0]
                            ?.media_details?.sizes?.full?.source_url
                        }
                        alt={post.title.rendered}
                        className="img-fluid rounded"
                      />
                    </Link>
                    <div className="categories-badge-wrapper mt-3">
                      {post._embedded?.["wp:term"]?.[0]?.map((cat) => (
                        <span
                          key={cat.id}
                          className="badge rounded-pill bg-danger-subtle text-danger me-1 fw-medium"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/post/${post.slug}`}
                      className="text-decoration-none text-dark hover-danger"
                    >
                      <h2
                        className="mt-2 h4 fw-bold"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                    </Link>
                    <div
                      className="excerpt"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                    <div className="meta text-muted small">
                      Autor: {post._embedded?.author?.[0]?.name} |{" "}
                      {new Date(post.date).toLocaleDateString("hr-HR")}
                    </div>
                    <Link
                      to={`/post/${post.slug}`}
                      className="btn btn-primary mt-3"
                    >
                      Pročitaj više
                    </Link>
                  </div>
                </div>
              ))}

              {loadingMore &&
                Array(3)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={`more-${i}`} />)}
            </>
          ) : (
            <div className="col-12 text-center my-5">
              <h3>Nema rezultata na serveru.</h3>
              <button
                className="btn btn-link text-danger"
                onClick={() => setSearchParams({})}
              >
                Poništi sve filtere
              </button>
            </div>
          )}
        </div>

        {hasMore && posts.length >= postsPerPage && (
          <div className="text-center my-5">
            <button
              className="btn btn-outline-primary btn-lg px-5"
              onClick={loadMorePosts}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>{" "}
                  Učitavam...
                </>
              ) : (
                "Učitaj više"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default Blog;
