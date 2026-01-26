import React from "react";
import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="col-md-6 col-lg-4 d-flex">
      <div className="skeleton-card shadow-sm w-100">
        <div className="skeleton-box skeleton-img"></div>
        <div className="skeleton-box skeleton-title mt-3"></div>
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-text short"></div>
        <div className="skeleton-box skeleton-btn mt-3"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
