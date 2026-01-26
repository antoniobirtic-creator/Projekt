import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/posts?_embed")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Greška:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleClear = () => {
    setSearchTerm("");
  };

  const filteredPosts = posts.filter((post) =>
    post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <CenteredContainer>
        <Loader />
      </CenteredContainer>
    );
  }

  return (
    <div className="blog-page">
      <div className="container">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center my-4 gap-3">
          <h1 className="m-0">Šareni Blog Iz WordPress</h1>

          <div className="search-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Pretraži članke..."
              className="form-control search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-button"
                onClick={() => setSearchTerm("")}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
        </div>

        <div className="row">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="blog-post col-md-4 mb-4">
                <Link to={`/post/${post.slug}`}>
                  <img
                    src={
                      post._embedded?.["wp:featuredmedia"]?.[0]?.media_details
                        ?.sizes?.full?.source_url
                    }
                    alt={post.title.rendered}
                    className="img-fluid rounded shadow-sm"
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

                <h2 className="mt-2">
                  {" "}
                  <Link
                    to={`/post/${post.slug}`}
                    className="text-decoration-none text-dark"
                  >
                    {post.title.rendered}
                  </Link>
                </h2>

                <div
                  className="excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
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
            ))
          ) : (
            <div className="col-12 text-center my-5">
              <h3>Nema rezultata za "{searchTerm}"</h3>
            </div>
          )}
        </div>
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
