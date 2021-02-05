import React from "react";
import "./css/YoungInnovatorBanner.css";

function YoungInnovatorBanner() {
  return (
    <div className="youngInnovatorBanner">
      <h3>Take A Step Towards Your Dream</h3>
      <button onClick={() => (window.location.href = "https://forms.gle/qWxhqvRL4w9yGaNg8 ")}>
        Apply Now
      </button>
    </div>
  );
}

export default YoungInnovatorBanner;
