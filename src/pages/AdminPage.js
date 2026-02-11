import React, { useEffect, useState } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = localStorage.getItem("adminAuth"); // Izvlačimo auth jednom na vrhu

  // Funkcija za dohvaćanje (Read)
  const fetchAdminData = async () => {
    try {
      const response = await fetch(
        "https://front2.edukacija.online/backend/wp-json/wp/v2/posts?status=any",
        {
          headers: { Authorization: `Basic ${auth}` },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Greška:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [auth]);

  // Funkcija za brisanje (Delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Jeste li sigurni da želite obrisati ovaj post?"))
      return;

    try {
      const response = await fetch(
        `https://front2.edukacija.online/backend/wp-json/wp/v2/posts/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Basic ${auth}` },
        },
      );

      if (response.ok) {
        // SNR praksa: Umjesto ponovnog fetch-a, mičemo post iz lokalnog state-a (brže je)
        setPosts(posts.filter((post) => post.id !== id));
        alert("Post je uspješno obrisan!");
      }
    } catch (error) {
      alert("Greška pri brisanju!");
    }
  };

  // Funkcija za brzu promjenu naslova (Update - primjer)
  const handleQuickEdit = async (id) => {
    const newTitle = prompt("Unesite novi naslov:");
    if (!newTitle) return;

    try {
      const response = await fetch(
        `https://front2.edukacija.online/backend/wp-json/wp/v2/posts/${id}`,
        {
          method: "POST", // WordPress REST API koristi POST za update postojećeg resursa
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify({ title: newTitle }),
        },
      );

      if (response.ok) {
        fetchAdminData(); // Osvježi listu
      }
    } catch (error) {
      console.error("Greška pri ažuriranju:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.reload();
  };

  const deletePost = async (id) => {
    // SNR praksa: Uvijek traži potvrdu prije brisanja!
    if (
      !window.confirm("Jeste li sigurni da želite trajno obrisati ovaj upit?")
    ) {
      return;
    }

    const auth = localStorage.getItem("adminAuth");

    try {
      const response = await fetch(
        `https://front2.edukacija.online/backend/wp-json/wp/v2/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${auth}`,
          },
        },
      );

      if (response.ok) {
        // Makni obrisani post iz state-a da se odmah izbriše s ekrana bez refresh-a
        setPosts(posts.filter((post) => post.id !== id));
        alert("Post uspješno obrisan!");
      } else {
        alert("Greška: WordPress ne dopušta brisanje ovog posta.");
      }
    } catch (error) {
      console.error("Greška pri brisanju:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>CMS Upravljanje</h1>
        <button onClick={handleLogout} className="btn-logout">
          Odjavi se
        </button>
      </header>

      {loading ? (
        <div className="loader">Učitavanje...</div>
      ) : (
        <div className="posts-list">
          <div className="list-header">
            <h2>Postovi / Upiti</h2>
            <button
              className="btn-add"
              onClick={() => alert("Ovdje bi išla forma za novi post")}
            >
              + Dodaj novi
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Naslov</th>
                <th>Datum</th>
                <th>Status</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title.rendered}</td>
                  <td>{new Date(post.date).toLocaleDateString("hr-HR")}</td>
                  <td>
                    <span className={`status-${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleQuickEdit(post.id)}
                    >
                      Uredi
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
