import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOrderEmail = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Vaša košarica je prazna.");
      return;
    }

    setIsSending(true);

    const orderId = Math.floor(100000 + Math.random() * 900000);

    // SNR: Generiramo HTML tablicu za email.
    // Email klijenti najbolje procesiraju tablice s inline CSS-om.
    const orderItemsHTML = `
      <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif;">
        <thead>
          <tr style="border-bottom: 2px solid #333;">
            <th style="text-align: left; padding: 10px;">Proizvod</th>
            <th style="text-align: center; padding: 10px;">Količina</th>
            <th style="text-align: right; padding: 10px;">Cijena</th>
          </tr>
        </thead>
        <tbody>
          ${cart
            .map(
              (item) => `
            <tr style="border-bottom: 1px solid #ddd;">
              <td style="padding: 10px; display: flex; align-items: center;">
                <img src="${item.thumbnail}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 10px;" />
                <span>${item.title}</span>
              </td>
              <td style="padding: 10px; text-align: center;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right;">${(item.price * item.quantity).toFixed(2)} €</td>
            </tr>
          `,
            )
            .join("")}
        </tbody>
      </table>
    `;

    const templateParams = {
      order_id: orderId,
      customer_name: `${formData.firstName} ${formData.lastName}`,
      customer_email: formData.email,
      customer_address: `${formData.address}, ${formData.city}`,
      order_items: orderItemsHTML, // Šaljemo HTML string
      total_price: `${(totalAmount || 0).toFixed(2)} €`,
    };

    try {
      await emailjs.send(
        "service_awv49z5",
        "template_6hq0bi4",
        templateParams,
        "1mjqFUk8mHlOwccFR",
      );

      alert(`Narudžba #${orderId} je uspješno poslana!`);
      clearCart();
      navigate("/shop");
    } catch (error) {
      console.error("Greška pri slanju narudžbe:", error);
      alert("Došlo je do greške prilikom slanja narudžbe.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Dovrši narudžbu</h2>
      <div className="row g-5">
        <div className="col-md-7">
          <form
            onSubmit={sendOrderEmail}
            className="bg-white p-4 rounded-4 shadow-sm border"
          >
            <h5 className="mb-4">Podaci za dostavu</h5>
            <div className="row g-3">
              <div className="col-6">
                <label className="small fw-bold">Ime</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control shadow-none"
                  placeholder="npr. Ivan"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-6">
                <label className="small fw-bold">Prezime</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control shadow-none"
                  placeholder="Horvat"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12">
                <label className="small fw-bold">Email adresa</label>
                <input
                  type="email"
                  name="email"
                  className="form-control shadow-none"
                  placeholder="ivan.horvat@email.com"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-8">
                <label className="small fw-bold">Ulica i kućni broj</label>
                <input
                  type="text"
                  name="address"
                  className="form-control shadow-none"
                  placeholder="Ulica lipa 10"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-4">
                <label className="small fw-bold">Grad</label>
                <input
                  type="text"
                  name="city"
                  className="form-control shadow-none"
                  placeholder="Zagreb"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn btn-danger btn-lg w-100 rounded-pill fw-bold"
                  disabled={isSending}
                >
                  {isSending ? "Obrađujem..." : "Potvrdi i plati"}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card bg-light border-0 p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold mb-3">Pregled narudžbe</h5>
            <div
              className="order-items-scroll"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <h6 className="mb-0 small fw-bold">{item.title}</h6>
                      <small className="text-muted">
                        Količina: {item.quantity}
                      </small>
                    </div>
                  </div>
                  <span className="fw-bold text-dark">
                    {(item.price * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-3">
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Ukupno:</span>
                <span className="text-danger">
                  {(totalAmount || 0).toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
