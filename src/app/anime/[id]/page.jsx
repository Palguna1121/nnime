"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { searchByIdQuery } from "@/helper/searchQueryStrings";
import AnimeDetails from "@/components/List/Detail/AnimeDetails";
import Link from "next/link";

const fetchData = async (id, setAnilistResponse, setMalResponse, setLoading, setNotAvailable) => {
  if (id === "null") {
    setNotAvailable(true);
    return;
  }

  try {
    const aniRes = await axios({
      url: process.env.NEXT_PUBLIC_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchByIdQuery,
        variables: {
          id,
        },
      },
    });
    setAnilistResponse(aniRes?.data?.data.Media);

    const malRes = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/getidinfo?malId=${id}`);
    setMalResponse(malRes?.data);

    setLoading(false);
  } catch (error) {
    console.error(error);
    setNotAvailable(true);
  }
};

const Page = ({ params: { id } }) => {
  let malId = id;
  const [anilistResponse, setAnilistResponse] = useState();
  const [malResponse, setMalResponse] = useState();
  const [loading, setLoading] = useState(true);
  const [notAvailable, setNotAvailable] = useState(false);

  useEffect(() => {
    fetchData(id, setAnilistResponse, setMalResponse, setLoading, setNotAvailable);
  }, [id]);

  return (
    <>
      {notAvailable && (
        <div className="h-screen w-screen flex justify-center items-center">
          <h1>Oops! This Anime Is Not Available / Animenya Gada</h1>
        </div>
      )}
      {loading && !notAvailable && <div className="h-screen w-screen flex justify-center items-center">Loading..</div>}
      {!loading && !notAvailable && (
        <div>
          {anilistResponse !== undefined && (
            <>
              <AnimeDetails anime={anilistResponse} malResponse={malResponse} id={malId} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
