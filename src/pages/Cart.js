import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  // SNR: Ovdje je bila greška. Izvlačimo 'totalAmount' jer si ga tako nazvao u Contextu.
  const { cart, removeFromCart, totalAmount, addToCart } = useCart();

  if (cart.length === 0)
    return (
      <div className="container py-5 text-center fade-in">
        <div className="empty-cart-icon mb-4">🛒</div>
        <h2 className="fw-bold">Vaša košarica je prazna</h2>
        <p className="text-muted">
          Izgleda da još niste odabrali svoje omiljene produkte.
        </p>
        <Link
          to="/shop"
          className="btn btn-danger btn-lg rounded-pill px-5 mt-3 shadow-sm"
        >
          Vrati se u shop
        </Link>
      </div>
    );

  return (
    <div className="container py-5 fade-in">
      <div className="row g-5">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold m-0">Košarica ({cart.length})</h1>
            <Link
              to="/shop"
              className="text-danger text-decoration-none fw-bold"
            >
              + Dodaj još proizvoda
            </Link>
          </div>

          <div className="cart-items-container">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-card mb-3 shadow-sm border-0 p-3 bg-white rounded-4"
              >
                <div className="row align-items-center">
                  <div className="col-4 col-md-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-fluid rounded-3 shadow-sm"
                    />
                  </div>
                  <div className="col-8 col-md-10">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="fw-bold mb-1">{item.title}</h5>
                        <p className="text-muted small mb-2">
                          Cijena po komadu: {item.price} €
                        </p>
                        <div className="qty-controls d-flex align-items-center gap-3">
                          <span className="badge bg-light text-dark border p-2 px-3 rounded-pill">
                            Količina: <strong>{item.quantity}</strong>
                          </span>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="fs-5 fw-bold text-danger mb-1">
                          {(item.price * item.quantity).toFixed(2)} €
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-sm btn-link text-muted p-0 text-decoration-none"
                        >
                          Ukloni ✕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div
            className="summary-card p-4 border-0 shadow-lg rounded-4 sticky-top"
            style={{ top: "100px" }}
          >
            <h4 className="fw-bold mb-4">Sažetak narudžbe</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Međuzbroj:</span>
              {/* SNR: Koristimo totalAmount i dodajemo fallback || 0 za sigurnost */}
              <span>{(totalAmount || 0).toFixed(2)} €</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Dostava:</span>
              <span className="text-success fw-bold">Besplatna</span>
            </div>
            <hr className="my-4" />
            <div className="d-flex justify-content-between mb-4">
              <span className="fs-5 fw-bold">Ukupno:</span>
              <span className="fs-4 fw-bold text-danger">
                {(totalAmount || 0).toFixed(2)} €
              </span>
            </div>
            <Link
              to="/checkout"
              className="btn btn-danger w-100 py-3 fw-bold rounded-pill shadow"
            >
              Nastavi na plaćanje
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
