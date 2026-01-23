import { useState, useEffect } from "react";

const Naslovnica = () => {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/pages/612")
      .then((response) => response.json())
      .then((data) => {
        setPage(data);
        console.log(data);
      });
  }, []);

  if (!page) return <div>Učitavanje...</div>;

  return <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />;
};

export default Naslovnica;
