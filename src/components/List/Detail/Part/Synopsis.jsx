"use client";
import React, { useState } from "react";

const Synopsis = ({ anime }) => {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const truncateSynopsis = (text, maxLength = 300) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.slice(0, maxLength);
    return `${truncatedText}...`;
  };

  return (
    <>
      <p className="text-white">
        {showFullSynopsis ? anime.replace("[Written by MAL Rewrite]", "") : truncateSynopsis(anime.replace("[Written by MAL Rewrite]", ""))}
        {anime.length > 300 && (
          <span className="cursor-pointer text-slate-400" onClick={() => setShowFullSynopsis(!showFullSynopsis)}>
            {showFullSynopsis ? " Lebih Sedikit" : " Lihat Selengkapnya"}
          </span>
        )}
      </p>
    </>
  );
};

export default Synopsis;
