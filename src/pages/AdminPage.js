import React, { useEffect, useState } from "react";
import "./AdminPage.css";

/**
 * Admin stranica za prikaz podataka s WordPressa.
 */
const AdminPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      const auth = localStorage.getItem("adminAuth");

      try {
        // Primjer: Dohvaćanje tvojih postova
        const response = await fetch(
          "https://front2.edukacija.online/backend/wp-json/wp/v2/posts?status=any",
          {
            headers: {
              Authorization: `Basic ${auth}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju podataka:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    window.location.reload(); // ProtectedRoute će te automatski izbaciti na login
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">
          Odjavi se
        </button>
      </header>

      {loading ? (
        <p>Učitavanje podataka...</p>
      ) : (
        <div className="posts-list">
          <h2>Vaši upiti / Postovi</h2>
          {posts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Naslov</th>
                  <th>Datum</th>
                  <th>Status</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nema pronađenih podataka.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
