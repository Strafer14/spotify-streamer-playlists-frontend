import React, { useState, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import {
  extractSpotifyToken,
  getStreamers,
} from "../../helpers/spotifyHelpers";
import Button from "../../components/Button";
import pablo from "../../static/pablo.svg";
import Content from "./components/Content";
import Title from "./components/Title";
import { useHistory } from "react-router-dom";
import "./style.css";

export default function Landing() {
  const history = useHistory();
  useEffect(() => {
    const token = extractSpotifyToken();
    if (token) {
      getStreamers(`Bearer ${token}`)
        .then((res) => {
          console.log(res);
          history.push("/success");
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [history]);
  return (
    <div className="landing-wrapper">
      <div>
        <Title />
        <Content />
        <Button
          onClick={() => {
            window.open(
              "https://accounts.spotify.com/authorize?client_id=b17f2794b1974a13a63f5f37f943bda2&redirect_uri=https%3A%2F%2Fmusic.strafer.dev%2F&scope=user-follow-read%20playlist-read-private%20playlist-read-collaborative%20user-read-private&response_type=token",
              "_blank",
              "noopener noreferrer"
            );
          }}
          icon={<FaSpotify />}
          text="Connect with Spotify"
        />
      </div>
      <img alt="pablo" src={pablo} />
    </div>
  );
}
