import React from "react";
import _ from "lodash";
// import StreamerLabel from "./StreamerLabel";
import MatchLabel from "./MatchLabel";
import "./style.css";

export default function StreamerTable({ results }) {
  return _.keys(results)
    .slice(0, 11)
    .map((result) => (
      <div className="streamer-table">
        {/* <StreamerLabel url={result} /> */}
        <MatchLabel url={result} matchRate={results[result]} />
      </div>
    ));
}
