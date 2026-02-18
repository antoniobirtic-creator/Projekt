import React from "react";
import { useOutletContext } from "react-router-dom";
import "./MyDetails.css";

const MyDetails = () => {
  const { userData, setUserData } = useOutletContext();

  return (
    <div className="admin-settings__tab-content">
      <div className="admin-settings__form-grid">
        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            value={userData.firstName}
            onChange={(e) =>
              setUserData({ ...userData, firstName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Email</label>
        <div className="input-with-icon">
          <i className="fa-regular fa-envelope"></i>
          <input
            type="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
      </div>

      <div className="admin-settings__upload">
        <div className="upload-zone">
          <div className="upload-zone__icon">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <p>
            <strong>Click to upload</strong> or drag and drop
          </p>
          <span>SVG, PNG, JPG or GIF (max, 800x400px)</span>
        </div>
      </div>

      <div className="form-group full-width">
        <label>Role</label>
        <input
          type="text"
          value={userData.role}
          readOnly
          className="input--readonly"
        />
      </div>
    </div>
  );
};

export default MyDetails;
