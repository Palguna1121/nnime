import React from "react";

const AllChara = ({ anime, characters }) => {
  return (
    <>
      <div className="py-16 bg-black bg-opacity-70">
        <h3 className="ml-10 text-2xl text-white">Characters in : {anime.title.romaji}</h3>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4 justify-items-center mt-4 px-10">
          {characters.slice(0, 16).map((c, index) => (
            <div className="col-span-1" key={index}>
              <div className="text-center">
                <img src={c.image.large} alt={c.image.medium} className="w-21 h-25 border border-white m-auto transition-transform transform hover:scale-105" />
                <div className="text-lg mt-2 text-white">{c.name.full}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllChara;
