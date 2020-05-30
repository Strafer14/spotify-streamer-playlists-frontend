import React from "react";
import _ from "lodash";

export default function MatchLabel({ url, matchRate }) {
  const streamerName = _.capitalize(
    url.slice(url.lastIndexOf("/") + 1, url.lenth)
  );
  const rate = () => {
    const matchRateInt = parseInt(matchRate.slice(0, -1));
    if (matchRateInt > 6) return { label: streamerName, color: "#2d682d" };
    if (matchRateInt > 4) return { label: streamerName, color: "#977700" };
    else return { label: streamerName, color: "#920700" };
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
        width: "300px",
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
