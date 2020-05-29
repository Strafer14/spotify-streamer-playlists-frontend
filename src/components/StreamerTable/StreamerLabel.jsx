import React from "react";

export default function StreamerLabel({ url }) {
  return (
    <a
      href={`https://twitch.tv/${url}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#e2dbf0", textDecoration: "none", top: "20px" }}
    >
      {url.slice(url.lastIndexOf("/") + 1, url.lenth)}
    </a>
  );
}
