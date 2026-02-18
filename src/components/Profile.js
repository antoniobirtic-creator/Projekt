import React from "react";
import { useOutletContext } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { userData, setUserData } = useOutletContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="admin-settings__tab-content profile-tab">
      <div className="form-group full-width">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={userData.bio || ""}
          onChange={handleChange}
          placeholder="I'm a Product Designer based in Melbourne..."
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="website">Website</label>
        <div className="input-with-icon">
          <i className="fa-solid fa-link"></i>
          <input
            id="website"
            name="website"
            type="url"
            value={userData.website || ""}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
