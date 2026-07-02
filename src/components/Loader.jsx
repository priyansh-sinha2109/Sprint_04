import React from "react";

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p className="loader-text">✨ Generating your cover letter...</p>
      <p className="loader-subtext">This may take a few seconds</p>
    </div>
  );
}

export default Loader;
