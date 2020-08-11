import React from "react";

export default function StreamerPanel({ logoUrl, displayName, description }) {
  return (
    <div className="streamer-panel-wrapper">
      <img src={logoUrl} alt="streamer_logo"></img>
      <div className="info-box">
        <h3>{displayName}</h3>
        <span>{description}</span>
      </div>
    </div>
  );
}
