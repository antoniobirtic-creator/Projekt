import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const { cartTotal, clearCart } = useCart();
  const [orderDone, setOrderDone] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    setOrderDone(true);
    clearCart();
  };

  if (orderDone)
    return (
      <div className="container py-5 text-center">
        <h2 className="text-success">Narudžba uspješna!</h2>
        <p>Hvala vam na povjerenju. Vaše slastice stižu uskoro.</p>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 border-0 shadow">
            <h2 className="mb-4">Podaci za dostavu</h2>
            <form onSubmit={handleOrder}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Ime i prezime"
                required
              />
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email adresa"
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Adresa stanovanja"
                required
              />
              <div className="bg-light p-3 rounded mb-4">
                <h5>
                  Ukupno za platiti: <strong>{cartTotal.toFixed(2)} €</strong>
                </h5>
              </div>
              <button
                type="submit"
                className="btn btn-danger btn-lg w-100 rounded-pill"
              >
                Potvrdi narudžbu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
