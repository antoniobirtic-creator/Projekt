import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faSearch,
  faFilter,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Sve");
  const [priceRange, setPriceRange] = useState(1000);
  const [maxAvailablePrice, setMaxAvailablePrice] = useState(1000);

  const { addToCart } = useCart();

  // SNR Alat: Funkcija za generiranje URL sluga iz naslova
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, "") // Miče sve što nije slovo, broj ili razmak
      .replace(/ +/g, "-"); // Zamjenjuje razmake crticama
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) throw new Error("Problem s dohvaćanjem proizvoda");
        const data = await response.json();
        setProducts(data.products);

        const prices = data.products.map((p) => p.price);
        const maxP = Math.ceil(Math.max(...prices));
        setMaxAvailablePrice(maxP);
        setPriceRange(maxP);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return ["Sve", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Sve" || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (loading)
    return <div className="text-center py-5 mt-5">Učitavam ponudu...</div>;

  return (
    <div className="shop-page py-5 bg-light">
      <div className="container">
        <div className="row">
          {/* SIDEBAR */}
          <aside className="col-lg-3 mb-4">
            <div
              className="card border-0 shadow-sm p-4 sticky-top"
              style={{ top: "100px" }}
            >
              <h5 className="fw-bold mb-4">
                <FontAwesomeIcon icon={faFilter} className="me-2 text-danger" />
                Filteri
              </h5>

              <div className="mb-4">
                <label className="form-label small fw-bold">Pretraži</label>
                <div className="input-group input-group-sm border rounded-pill overflow-hidden bg-white">
                  <span className="input-group-text bg-white border-0">
                    <FontAwesomeIcon icon={faSearch} size="xs" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Kategorije</label>
                <select
                  className="form-select form-select-sm border-0 bg-light rounded-3 shadow-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label small fw-bold mb-0">
                    Cijena do:
                  </label>
                  <span className="badge bg-danger">{priceRange} €</span>
                </div>
                <input
                  type="range"
                  className="form-range custom-range"
                  min="0"
                  max={maxAvailablePrice}
                  step="1"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                />
              </div>

              <button
                className="btn btn-sm btn-outline-secondary w-100 rounded-pill"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Sve");
                  setPriceRange(maxAvailablePrice);
                }}
              >
                Resetiraj filtre
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="col-lg-9">
            <div className="row g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="col-md-6 col-xl-4">
                    <div className="card h-100 border-0 shadow-sm product-card transition-all">
                      {/* SNR: Link koristi slug u URL-u, ali šalje originalni ID kroz state */}
                      <Link
                        to={`/product/${createSlug(product.title)}`}
                        state={{ productId: product.id }}
                        className="img-container p-3 text-center d-block"
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          style={{ height: "180px", objectFit: "contain" }}
                          className="transition-all"
                        />
                      </Link>

                      <div className="card-body d-flex flex-column">
                        <Link
                          to={`/product/${createSlug(product.title)}`}
                          state={{ productId: product.id }}
                          className="text-decoration-none text-dark"
                        >
                          <h6 className="fw-bold text-truncate mb-1">
                            {product.title}
                          </h6>
                        </Link>

                        <p className="text-muted small mb-2">
                          {product.category}
                        </p>

                        <div className="price-tag text-danger fw-bold mb-3 fs-5">
                          {product.price.toFixed(2)} €
                        </div>

                        <div className="d-flex gap-2 mt-auto">
                          <Link
                            to={`/product/${createSlug(product.title)}`}
                            state={{ productId: product.id }}
                            className="btn btn-outline-dark btn-sm rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                          >
                            <FontAwesomeIcon icon={faEye} />
                            Detalji
                          </Link>
                          <button
                            className="btn btn-danger btn-sm rounded-pill p-2 px-3"
                            onClick={() => addToCart(product)}
                            title="Dodaj u košaricu"
                          >
                            <FontAwesomeIcon icon={faCartPlus} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5 w-100">
                  <h4 className="text-muted">Nema rezultata. 🔍</h4>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
