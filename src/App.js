import React, { useState, useEffect } from "react";
import axios from "axios";
import bluebird from "bluebird";
import ReactLoading from "react-loading";
import database from "./database_v2.json";
import SpotifyButton from "./components/SpotifyButton";
import StreamerTable from "./components/StreamerTable";
import _ from "lodash";
import "./App.css";

function App() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const url = window.location.href;
    const search = url
      .slice(url.lastIndexOf("/") + 1, url.length)
      .replace(/#/g, "");
    const urlParams = search
      ? JSON.parse(
          '{"' +
            decodeURI(search)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        )
      : {};
    const token = urlParams.access_token;
    if (token) {
      getStreamers(`Bearer ${token}`);
    }
  }, []);

  async function getStreamers(token) {
    window.amplitude.logEvent("Get streamers request", { token });
    setLoading(true);
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    };
    let playlists = [];
    try {
      playlists = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers,
      });
    } catch (err) {
      alert("Unauthorized");
      setLoading(false);
    }
    const hrefs = _.chain(playlists)
      .get("data.items", [])
      .map("href")
      .value()
      .slice(0, 20);
    const playlistsSongs = await bluebird.map(
      hrefs,
      async (href) => {
        const songsResponse = await axios.get(href, {
          headers,
        });
        const tracks = _.get(songsResponse, "data.tracks.items", []);
        return tracks.map(
          (track) =>
            `${_.get(
              track,
              ["track", "artists", 0, "name"],
              ""
            ).toLowerCase()} - ${_.get(track, "track.name", "").toLowerCase()}`
        );
      },
      { concurrency: 3 }
    );
    const flattenedSongs = _.flatten(playlistsSongs);
    const streamers = flattenedSongs.reduce((acc, song) => {
      return acc.concat(database[song]);
    }, []);
    const resultsObj = _.chain(streamers)
      .countBy(_.identity)
      .invert()
      .invert()
      .reduceRight((current, val, key) => {
        current[key] = parseInt(val);
        return current;
      }, {})
      .mapValues(
        (value) =>
          `${String((value / flattenedSongs.length) * 100).slice(0, 4)}%`
      )
      .value();
    delete resultsObj.undefined;
    window.amplitude.logEvent("Received results", { resultsObj });
    setResults(resultsObj);
    setLoading(false);
  }
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
