import { useState, useEffect } from "react";
import "./StranicaVjezba.css";

const Naslovnica = () => {
  const [error, setError] = useState(null);

  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch(
          "https://front2.edukacija.online/backend/wp-json/wp/v2/pages/1338",
        );
        if (!response.ok) {
          throw new Error("Ne mogu povući podatke");
        }
        const data = await response.json();
        setPage(data);
      } catch (err) {
        setError(err);
        console.log(err.message);
      }
    };

    fetchPage();
  }, []);

  if (error) return <div>{error}</div>;
  if (!page) return <p>Učitavanje...</p>;

  return <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />;
};

export default Naslovnica;
