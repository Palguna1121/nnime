import React from "react";

const Studio = ({ anime }) => {
  return (
    <>
      <span className="text-white"></span> {anime.studios.nodes.map((studio) => studio.name).join(", ")}
    </>
  );
};

export default Studio;
