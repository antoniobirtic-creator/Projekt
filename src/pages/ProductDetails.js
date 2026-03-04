import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCartPlus,
  faTruck,
  faShieldHalved,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { slug } = useParams(); // Uzimamo slug iz URL-a
  const location = useLocation();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SNR: Helper funkcija za provjeru sluga (mora biti ista kao u Shop.js)
  const createSlug = useCallback((title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        let productId = location.state?.productId;

        // SNR LOGIKA: Ako nema ID-a u state-u (npr. nakon refresha), nađi ga preko sluga
        if (!productId) {
          const res = await fetch("https://dummyjson.com/products?limit=100");
          const allData = await res.json();
          const foundProduct = allData.products.find(
            (p) => createSlug(p.title) === slug,
          );
          productId = foundProduct?.id;
        }

        if (productId) {
          const response = await fetch(
            `https://dummyjson.com/products/${productId}`,
          );
          if (!response.ok) throw new Error("Proizvod nije pronađen");
          const data = await response.json();
          setProduct(data);
          setMainImage(data.images[0]);
        } else {
          setError("Proizvod nije pronađen.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug, location.state, createSlug]);

  if (loading)
    return <div className="text-center py-5 mt-5">Učitavam detalje...</div>;
  if (error || !product)
    return (
      <div className="text-center py-5 mt-5 text-danger">
        {error || "Greška."}
      </div>
    );

  return (
    <div className="product-details-page py-5 bg-white">
      <div className="container mt-4">
        {/* SNR: Back button za bolje korisničko iskustvo */}
        <Link
          to="/shop"
          className="btn btn-link text-dark text-decoration-none mb-4 p-0"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Povratak u trgovinu
        </Link>

        <div className="row g-5">
          {/* GALERIJA SLIKA */}
          <div className="col-lg-6">
            <div className="main-image-container mb-3 shadow-sm rounded-4 overflow-hidden border bg-white">
              <img
                src={mainImage}
                alt={product.title}
                className="img-fluid w-100 p-4"
                style={{ height: "450px", objectFit: "contain" }}
              />
            </div>
            <div className="thumbnail-gallery d-flex gap-2 overflow-auto pb-2">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`thumb-box border rounded-3 p-1 cursor-pointer transition-all ${
                    mainImage === img ? "border-danger shadow-sm" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    width="70"
                    height="70"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* INFORMACIJE */}
          <div className="col-lg-6">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small text-uppercase">
                <li className="breadcrumb-item">
                  <Link to="/shop" className="text-muted">
                    Shop
                  </Link>
                </li>
                <li className="breadcrumb-item active text-danger">
                  {product.category}
                </li>
              </ol>
            </nav>

            <h1 className="fw-bold mb-2">{product.title}</h1>
            <p className="text-muted mb-4">
              Brand:{" "}
              <span className="fw-bold text-dark">
                {product.brand || "N/A"}
              </span>
            </p>

            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="text-warning">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={
                      i < Math.round(product.rating)
                        ? "text-warning"
                        : "text-muted-light"
                    }
                  />
                ))}
                <span className="ms-2 text-dark fw-bold">{product.rating}</span>
              </div>
              <span className="text-muted">|</span>
              <span
                className={`fw-bold ${product.stock > 0 ? "text-success" : "text-danger"}`}
              >
                {product.availabilityStatus} ({product.stock})
              </span>
            </div>

            <div className="price-section mb-4">
              <h2 className="text-danger fw-bold mb-0">
                {product.price.toFixed(2)} €
              </h2>
              {product.discountPercentage > 0 && (
                <small className="text-muted text-decoration-line-through">
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}{" "}
                  €
                </small>
              )}
            </div>

            <p className="lead text-muted mb-5" style={{ fontSize: "1.1rem" }}>
              {product.description}
            </p>

            <button
              className="btn btn-danger btn-lg rounded-pill fw-bold py-3 px-5 w-100 w-md-auto mb-5 shadow-sm"
              onClick={() => addToCart(product)}
            >
              <FontAwesomeIcon icon={faCartPlus} className="me-2" />
              Dodaj u košaricu
            </button>

            {/* INFO BOXEVI */}
            <div className="row g-3 border-top pt-4">
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4 h-100">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="text-danger fs-4"
                  />
                  <div>
                    <h6 className="mb-0 fw-bold small">Dostava</h6>
                    <small className="text-muted">
                      {product.shippingInformation}
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4 h-100">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="text-danger fs-4"
                  />
                  <div>
                    <h6 className="mb-0 fw-bold small">Jamstvo</h6>
                    <small className="text-muted">
                      {product.warrantyInformation}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="mt-5 pt-5 border-top">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">Recenzije kupaca</h3>
            <span className="badge bg-dark rounded-pill">
              {product.reviews?.length} recenzija
            </span>
          </div>
          <div className="row g-4">
            {product.reviews?.map((rev, idx) => (
              <div key={idx} className="col-md-4">
                <div className="card h-100 border-0 bg-light p-4 rounded-4 shadow-sm">
                  <div className="text-warning mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        size="xs"
                        className={
                          i < rev.rating ? "text-warning" : "text-muted"
                        }
                      />
                    ))}
                  </div>
                  <p className="fst-italic mb-3">"{rev.comment}"</p>
                  <div className="mt-auto pt-3 border-top">
                    <h6 className="mb-0 fw-bold small">{rev.reviewerName}</h6>
                    <small
                      className="text-muted"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {new Date(rev.date).toLocaleDateString("hr-HR")}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
