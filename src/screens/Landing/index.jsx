/* eslint-disable react-hooks/rules-of-hooks */
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
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = extractSpotifyToken();
    if (token) {
      setLoading(true);
      getStreamers(`Bearer ${token}`)
        .then((res) => {
          console.log(res);
          setResults(res);
          useHistory().push('/success');
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
  }, []);
  return (
    <div className="landing-wrapper">
      <div>
        <Title />
        <Content />
        <Button icon={<FaSpotify />} text="Connect with Spotify" />
      </div>
      <img alt="pablo" src={pablo} />
    </div>
  );
}
