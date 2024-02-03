import React from "react";
import Link from "next/link";

const SearchList = ({ api }) => {
  if (!api) {
    return <div className="h-screen w-screen flex justify-center items-center">Masi loading mas bro</div>;
  }
  return (
    <>
      <div className="grid md:grid-cols-6 grid-cols-2 gap-10 mx-8 mb-8">
        {api?.media?.map((data, index) => {
          return (
            <div key={index} className="group">
              <Link href={`/anime/${data.idMal}`} as={`/anime/${data.idMal}`} passHref>
                <div className="text-sm text-white">
                  <img alt={data.title.romaji} src={data.coverImage.extraLarge} className="rounded-xl object-cover opacity-[0.65] transition-opacity group-hover:opacity-100 h-[150px] w-full duration-500 sm:h-[250px]" />
                  <div className="text-left p-2 px-3">
                    {data.title.romaji.length > 15 ? (
                      <p className="text-base font-semibold text-white lg:text-xl md:text-lg">{data.title.romaji.slice(0, 15)}...</p>
                    ) : (
                      <p className="text-base font-semibold text-white lg:text-xl md:text-lg">{data.title.romaji}</p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchList;
