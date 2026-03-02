import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"; // SNR: Ikona za dodavanje
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Problem s dohvaćanjem proizvoda");
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-5">Učitavam ponudu...</div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;

  return (
    <div className="shop-page py-5 bg-light">
      <div className="container">
        <header className="text-center mb-5">
          <h1 className="fw-bold">Vaš Shop</h1>
          <p className="text-muted">Ekskluzivne ponude za vas</p>
        </header>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm product-card transition-all">
                <div className="img-container position-relative overflow-hidden">
                  <img
                    src={product.thumbnail}
                    className="card-img-top p-3"
                    alt={product.title}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <span className="badge bg-dark position-absolute top-0 end-0 m-2">
                    {product.category}
                  </span>
                </div>
                <div className="card-body d-flex flex-column text-center">
                  <h6 className="fw-bold mb-1 text-truncate">
                    {product.title}
                  </h6>
                  <p className="text-muted small flex-grow-1">
                    {product.description.substring(0, 50)}...
                  </p>
                  <div className="price-tag fs-5 fw-bold text-danger mb-3">
                    {product.price.toFixed(2)} €
                  </div>

                  {/* SNR: Gumb s ikonom košarice */}
                  <button
                    className="btn btn-outline-danger rounded-pill w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                    onClick={() => addToCart(product)}
                  >
                    <FontAwesomeIcon icon={faCartPlus} />
                    Dodaj u košaricu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
