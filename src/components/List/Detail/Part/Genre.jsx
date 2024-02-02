import React from "react";

const Genre = ({ anime }) => {
  return (
    <>
      <span className="text-white">Genre:</span> {anime.genres.join(", ")}
    </>
  );
};

export default Genre;
