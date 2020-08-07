import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import {
  extractSpotifyToken,
  getStreamers,
} from "./helpers/spotifyHelpers";
import SpotifyButton from "./components/SpotifyButton";
import StreamerTable from "./components/StreamerTable";
import _ from "lodash";
import "./App.css";

function App() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = extractSpotifyToken();
    if (token) {
      setLoading(true);
      getStreamers(`Bearer ${token}`)
        .then((res) => {
          setResults(res);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <ReactLoading
            type={"spin"}
            color={"#1DB954"}
            height={"20%"}
            width={"20%"}
          />
        ) : (
          !_.keys(results).length && <SpotifyButton />
        )}
        <StreamerTable results={results} />
      </header>
    </div>
  );
}

export default App;
