import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Form.css";

/**
 * Komponenta za kontakt formu s podrškom za EmailJS, WhatsApp integraciju,
 * SEO Schema Markup i Honeypot zaštitu od spama.
 */
const Form = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /**
   * Pomoćna funkcija za validaciju podataka prije slanja.
   * @param {string} type - Kanal slanja ('email' ili 'whatsapp')
   * @returns {Object|null} - Vraća podatke ako su validni, inače null.
   */
  const validateData = (type) => {
    const formData = new FormData(formRef.current);
    const name = formData.get("user_name").trim();
    const email = formData.get("user_email").trim();
    const message = formData.get("message").trim();
    const botCheck = formData.get("_honey");

    // 1. Honeypot provjera (ne šaljemo ništa ako je bot popunio skriveno polje)
    if (botCheck) {
      console.warn("Spam detected");
      setResult("success"); // Prevarimo bota
      formRef.current.reset();
      return null;
    }

    // 2. Osnovna validacija (Ime i poruka su uvijek obavezni)
    if (!name || !message) {
      alert("Molimo unesite vaše ime i poruku.");
      return null;
    }

    // 3. Email je obavezan samo za Email kanal
    if (type === "email" && !email) {
      alert("Molimo unesite email adresu za slanje pošte.");
      return null;
    }

    return { name, email, message };
  };

  /**
   * Šalje formu putem EmailJS servisa.
   */
  const sendEmail = async (e) => {
    e.preventDefault();
    const data = validateData("email");
    if (!data) return;

    setLoading(true);
    const SERVICE_ID = "service_awv49z5";
    const TEMPLATE_ID = "template_k2hbqo9";
    const PUBLIC_KEY = "1mjqFUk8mHlOwccFR";

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY,
      );
      setResult("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setResult("error");
    } finally {
      setLoading(false);
      setTimeout(() => setResult(null), 5000);
    }
  };

  /**
   * Generira i otvara WhatsApp poruku s podacima iz forme.
   */
  const handleWhatsApp = (e) => {
    e.preventDefault();
    const data = validateData("whatsapp");
    if (!data) return;

    const waNumber = "385958718497";
    const waText = `*Novi upit s weba*\n\n*Ime:* ${data.name}\n*Email:* ${data.email || "Nije naveden"}\n*Poruka:* ${data.message}`;

    window.open(
      `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`,
      "_blank",
    );
  };

  return (
    <div className="contact-form-container">
      {/* SEO: Structured Data za Google pretragu */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Bakery",
          name: "Pro-App Torte",
          description: "Domaće torte i kolači po narudžbi.",
          telephone: "+385958718497",
          areaServed: "Zagreb, Hrvatska",
          openingHours: "Mo-Fr 08:00-16:00",
        })}
      </script>

      <form ref={formRef} className="contact-form">
        <h3 className="contact-form__title">Kontaktirajte nas</h3>

        {/* HONEYPOT - Skriveno za ljude */}
        <div className="hp-field">
          <input type="text" name="_honey" tabIndex="-1" autoComplete="off" />
        </div>

        <div className="contact-form__group">
          <label htmlFor="user_name" className="contact-form__label">
            Ime i prezime *
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            className="contact-form__input"
            placeholder="Vaše ime..."
          />
        </div>

        <div className="contact-form__group">
          <label htmlFor="user_email" className="contact-form__label">
            Email (opcionalno za WA)
          </label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            className="contact-form__input"
            placeholder="vlasnik@email.com"
          />
        </div>

        <div className="contact-form__group">
          <label htmlFor="message" className="contact-form__label">
            Vaša poruka *
          </label>
          <textarea
            id="message"
            name="message"
            className="contact-form__textarea"
            rows="4"
            placeholder="Kako vam možemo pomoći?"
          />
        </div>

        <div className="contact-form__actions">
          <button
            type="button"
            onClick={sendEmail}
            className="btn-action btn-email"
            disabled={loading}
          >
            {loading ? "Slanje..." : "Pošalji na Email"}
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="btn-action btn-whatsapp"
          >
            Pošalji na WhatsApp
          </button>
        </div>

        {result === "success" && (
          <div className="contact-form__alert contact-form__alert--success">
            Uspješno poslano!
          </div>
        )}
        {result === "error" && (
          <div className="contact-form__alert contact-form__alert--error">
            Greška pri slanju.
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
