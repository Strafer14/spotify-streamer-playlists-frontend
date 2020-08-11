import React from "react";

export default function StreamerClip({ clip }) {
  const { embed_html } = clip;
  console.log("what", embed_html);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: embed_html }} />
    </div>
  );
}
