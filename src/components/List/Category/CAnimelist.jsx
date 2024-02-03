"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";

const CAnimeList = ({ query, nameCategory, perPage }) => {
  const [page, setPage] = useState(1);
  const [animeDetails, setAnimeDetails] = useState([]);

  useEffect(() => {
    if (page) {
      getAnime();
    }
  }, [page, query, perPage]);

  async function getAnime() {
    window.scrollTo(0, 0);
    const res = await axios({
      url: process.env.NEXT_PUBLIC_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: query,
        variables: {
          page: page,
          perPage: perPage,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setAnimeDetails(res?.data?.data?.Page);
  }

  let last = animeDetails?.pageInfo?.lastPage;
  let category = nameCategory;

  return (
    <>
      <HeaderMenu title={`${category} anime, ${page}`} />

      <div className="grid md:grid-cols-6 grid-cols-2 gap-10 mx-8 mb-8">
        {animeDetails?.media?.map((data, index) => {
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

      <Pagination page={page} last={last} setPage={setPage} />
    </>
  );
};

export default CAnimeList;
