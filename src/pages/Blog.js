import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import SkeletonCard from "../components/SkeletonCard";
import "./Blog.css";

// --- KONFIGURACIJA ---
const API_BASE_URL = "https://front2.edukacija.online/backend/wp-json/wp/v2";
const POSTS_PER_PAGE = 6;

// --- POMOĆNE FUNKCIJE ---
const buildPostsUrl = (page, search, categoryId) => {
  const params = new URLSearchParams({
    _embed: "1",
    per_page: POSTS_PER_PAGE,
    page: page,
  });
  if (search) params.append("search", search);
  if (categoryId) params.append("categories", categoryId);
  return `${API_BASE_URL}/posts?${params.toString()}`;
};

const Blog = () => {
  // State-ovi
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // URL Params & Search logic
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "Sve";
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Infinite Scroll Ref
  const observerRef = useRef();

  // 1. Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. Fetch Kategorija
  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Greška kategorije:", err));
  }, []);

  // 3. Centralizirani Fetch (SNR pristup s async/await)
  const fetchPosts = useCallback(
    async (targetPage, isMore = false) => {
      const categoryId = categories.find(
        (c) => c.name === selectedCategory,
      )?.id;
      const url = buildPostsUrl(targetPage, debouncedSearch, categoryId);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Neuspješan fetch");
        const data = await response.json();

        setPosts((prev) => (isMore ? [...prev, ...data] : data));
        setHasMore(data.length === POSTS_PER_PAGE);
      } catch (err) {
        console.error("Greška:", err);
        if (!isMore) setPosts([]);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearch, selectedCategory, categories],
  );

  // Reset na promjenu filtera
  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchPosts(1, false);
  }, [debouncedSearch, selectedCategory, categories, fetchPosts]);

  // 4. INFINITE SCROLL LOGIKA (Intersection Observer)
  const lastElementRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoadingMore(true);
          setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchPosts(nextPage, true);
            return nextPage;
          });
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, fetchPosts],
  );

  const updateFilters = (newCategory, newSearch) => {
    const params = {};
    if (newCategory && newCategory !== "Sve") params.category = newCategory;
    if (newSearch) params.search = newSearch;
    setSearchParams(params);
  };

  return (
    <div className="blog-page">
      <div className="container">
        {/* Header & Search */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center my-4 gap-3">
          <h1 className="m-0">Šareni Blog Iz WordPress</h1>
          <div className="search-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Pretraži..."
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

        {/* Kategorije */}
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

        {/* Grid s postovima */}
        <div className="row g-4">
          {loading && page === 1 ? (
            Array(6)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          ) : posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <div key={post.id} className="col-md-6 col-lg-4 d-flex">
                  <div className="blog-post shadow-sm w-100 p-3 bg-white rounded">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={
                          post._embedded?.["wp:featuredmedia"]?.[0]
                            ?.media_details?.sizes?.full?.source_url
                        }
                        alt={post.title.rendered}
                        className="img-fluid rounded mb-3"
                      />
                    </Link>
                    <h2
                      className="h4 fw-bold"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div
                      className="excerpt"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                    <Link
                      to={`/post/${post.slug}`}
                      className="btn btn-primary mt-auto"
                    >
                      Pročitaj više
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="col-12 text-center my-5">
              <h3>Nema rezultata.</h3>
            </div>
          )}
        </div>

        {/* INFINITE SCROLL TARGET */}
        <div ref={lastElementRef} style={{ height: "20px", margin: "20px 0" }}>
          {loadingMore && (
            <div className="text-center">
              <div className="spinner-border text-danger" role="status"></div>
              <p>Učitavam nove torte...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
