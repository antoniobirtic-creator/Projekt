import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Product Designer",
  });

  const tabs = [
    { name: "My details", path: "mydetails" },
    { name: "Profile", path: "profile" },
    { name: "Password", path: "password" },
    { name: "Team", path: "team" },
    { name: "Plan", path: "plan" },
    { name: "Billing", path: "billing" },
    { name: "Email", path: "email" },
    { name: "Notifications", path: "notifications" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://front2.edukacija.online/backend/wp-json/wp/v2/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          role: "Product Designer",
        });
      })
      .catch((err) => console.error("Greška pri dohvaćanju:", err));
  }, [navigate]);

  return (
    <div className="admin-settings">
      <header className="admin-settings__header">
        <div className="admin-settings__banner"></div>
        <div className="admin-settings__profile-container">
          <div className="admin-settings__profile-left">
            <div className="admin-settings__avatar-wrapper">
              <img
                src="https://i.pravatar.cc/300"
                alt="User"
                className="admin-settings__avatar"
              />
            </div>
            <h1 className="admin-settings__title">Settings</h1>
          </div>
          <div className="admin-settings__actions">
            <button className="btn btn--secondary">Cancel</button>
            <button className="btn btn--primary">Save</button>
          </div>
        </div>
      </header>

      <nav className="admin-settings__nav">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `admin-settings__nav-item ${isActive ? "is-active" : ""}`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </nav>

      <main className="admin-settings__content">
        {/*Outlet je ključan. 
          Proslijeđujemo context tako da pod-komponente (MyDetails, Profile...) 
          mogu pristupiti userData bez novog fetch-anja.
        */}
        <Outlet context={{ userData, setUserData }} />
      </main>
    </div>
  );
};

export default Admin;
