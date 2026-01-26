import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";

import "./SinglePost.css";

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(
      `https://front2.edukacija.online/backend/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPost(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Greška kod učitavanja članka:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="single-post-centered">
        <Loader />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mt-5 text-center">
        <h2>Članak nije pronađen.</h2>
        <Link to="/blog" className="btn btn-primary mt-3">
          Natrag na blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container single-post-container">
      <nav aria-label="breadcrumb">
        <Link to="/blog" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Natrag na listu
        </Link>
      </nav>

      <article className="mt-4">
        <h1 className="post-title display-4 fw-bold">{post.title.rendered}</h1>

        <div className="post-meta-fancy">
          <span className="meta-item">
            <FontAwesomeIcon icon={faUserCircle} className="me-2" />
            <strong>{post._embedded?.author?.[0]?.name}</strong>
          </span>
          <span className="meta-separator">|</span>
          <span className="meta-item">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
            {new Date(post.date).toLocaleDateString("hr-HR")}
          </span>
        </div>

        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url}
            className="post-featured-image"
            alt={post.title.rendered}
          />
        )}

        <section
          className="post-content-section"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  );
};

export default SinglePost;
