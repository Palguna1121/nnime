import React from "react";
import Synopsis from "./Part/Synopsis";
import Studio from "./Part/Studio";
import Genre from "./Part/Genre";
import Link from "next/link";

const AnimeDetails = ({ anime, malResponse, id }) => {
  function stripTags(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }
  function formatDate(date) {
    const year = date.year;
    const month = date.month;
    const day = date.day;

    const formattedMonth = month < 10 ? `0${month}` : month;

    const formattedDay = day < 10 ? `0${day}` : day;

    // Menggabungkan tahun, bulan, dan hari menjadi sebuah string dengan format 'YYYY-MM-DD'
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    return formattedDate;
  }

  return (
    <>
      <div className="h-full bg-cover bg-center bg-gray-700">
        <div className="relative h-full bg-black bg-opacity-70 flex flex-col md:flex-row gap-8 md:gap-16 pt-10 px-20 pb-16">
          <div className="detail-card overflow-hidden mt-3 md:mt-5 lg:mt-8 rounded-2xl w-[320px]">
            <img src={anime.coverImage.extraLarge} alt={`poster for ${anime.title.romaji}`} className="hidden md:block" />
          </div>
          <div className="mt-3 md:mt-5 lg:mt-8 text-white md:flex-1">
            <div className="lg:w-12/12">
              <div className="relative">
                <div className="mb-10">
                  <h3 className="text-white font-bold mb-1 text-xl">{anime.title.romaji}</h3>
                  <span className="text-gray-400 text-sm block">
                    {anime.title.native}, {anime.title.english}
                  </span>
                </div>
                <div className="absolute top-0 right-0 text-center hidden md:inline">
                  <span className="items-center text-sm hidden lg:flex">
                    <span className="text-xl mr-1">
                      {" "}
                      <i>
                        <svg className="w-4 h-4 ms-1 text-yellow-500 dark:text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </i>{" "}
                    </span>
                    <span className="text-xm font-sans italic opacity-70">{anime.meanScore}/100</span>
                  </span>
                </div>
                <Synopsis anime={stripTags(anime.description)} />
                <div className="my-12 md:flex">
                  <div className="w-full md:w-1/2">
                    <ul>
                      <li>
                        <span className="text-white">Type:</span> {anime.type}
                      </li>
                      <li className="text-white">
                        Studio :<Studio anime={anime} />
                      </li>
                      <li>
                        <span className="text-white">Date Aired:</span> {anime.startDate ? formatDate(anime.startDate) : "?"} to {anime.endDate ? formatDate(anime.endDate) : "?"}
                      </li>
                    </ul>
                  </div>
                  <div className="w-full md:w-1/2">
                    <ul>
                      <li>
                        <span className="text-white">Durations:</span> {anime.duration} min/ep
                      </li>
                      <li>
                        <span className="text-white">Views:</span> {anime.popularity}
                      </li>
                      <li>
                        <Genre anime={anime} />
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mb-4">
                  <Link href={`/play/${id}/${malResponse?.subLink}/1`} className="text-white bg-sky-950 inline-block font-semibold uppercase tracking-wide px-5 py-3 rounded mr-2">
                    Watch Sub
                  </Link>
                  {/* {malResponse.isDub && (
                    <Link className="text-white bg-sky-950 inline-block font-semibold uppercase tracking-wide px-5 py-3 rounded mr-2" href={`/play/${id}/${malResponse.dubLink}/1`}>
                      Watch Dub
                    </Link>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center items-center h-full bg-black bg-opacity-70 px-5">
          <VideoPlayer ytId={anime.data?.trailer.youtube_id} />
        </div>

        <AllChara anime={anime} characters={characters} /> */}
      </div>
    </>
  );
};

export default AnimeDetails;
