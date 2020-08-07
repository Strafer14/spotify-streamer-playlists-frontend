import React from "react";
import spotifySvg from "../../static/Spotify_logo_without_text.svg";

export default function SpotifyButton() {
  return (
    <a
      href="https://accounts.spotify.com/authorize?client_id=b17f2794b1974a13a63f5f37f943bda2&redirect_uri=https%3A%2F%2Fmusic.strafer.dev%2F&scope=user-follow-read%20playlist-read-private%20playlist-read-collaborative%20user-read-private&response_type=token"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img alt="spotify" src={spotifySvg} />
    </a>
  );
}
