import { useState, useEffect } from "react";

import React from "react";
import posts from "../components/zadaci/data/blog.json";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/posts?_embed")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  console.log("Članci:", posts);
  console.log("Učitavanje:", Loading);
  console.log("Trenutna stranica:", page);

  return (
    <div className="blog-page">
      <div className="container">
        <h1>Blog</h1>
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="blog-post col-md-4 mb-4">
              <img
                src={
                  post._embedded?.["wp:featuredmedia"]?.[0]?.media_details.sizes
                    .full.source_url
                }
                alt={post.title.rendered}
                className="img-fluid"
              />
              <h2>{post.title.rendered}</h2>

              <div
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />

              <p>
                Autor: {post._embedded?.author?.[0]?.name} |
                <span>
                  {" "}
                  Objavljeno: {new Date(post.date).toLocaleDateString("hr-HR")}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
