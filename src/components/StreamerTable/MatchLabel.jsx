import React from "react";
import _ from "lodash";

export default function MatchLabel({ url, matchRate }) {
  const streamerName = _.capitalize(
    url.slice(url.lastIndexOf("/") + 1, url.lenth)
  );
  const rate = () => {
    const matchRateInt = parseInt(matchRate.slice(0, -1));
    if (matchRateInt > 6) return { label: streamerName, color: "#5cb85c" };
    if (matchRate > 4) return { label: streamerName, color: "#FFDB58" };
    else return { label: streamerName, color: "#F1AF8F" };
  };
  const rateObj = rate(matchRate);
  return (
    <div
      style={{
        marginBottom: "5px",
        background: rateObj.color,
        color: "#e2dbf0",
        padding: "2px 10px",
        textAlign: "left",
        minWidth: "10vw",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={() => window.open(url, "_blank")}
      type="button"
    >
      {rateObj.label}
    </div>
  );
}
