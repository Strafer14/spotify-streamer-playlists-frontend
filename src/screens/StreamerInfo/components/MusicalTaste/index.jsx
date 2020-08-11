import React from "react";

export default function MusicalTaste({ logoUrl, displayName, description }) {
  return (
    <div className="streamer-panel-wrapper">
      <div className="info-box">
        <h3>Musical Taste</h3>
        <span>Why don’t you go ahead and ask Lemonagogo to play one of these songs on the next stream.</span>
      </div>
    </div>
  );
}
