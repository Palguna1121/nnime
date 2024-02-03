"use client";
import React, { useEffect, useState } from "react";
import CAnimeList from "@/components/List/Category/CAnimeList";
import { TrendingAnimeQuery, PopularAnimeQuery, top100AnimeQuery, favouritesAnimeQuery } from "@/helper/searchQueryStrings";

const Page = () => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const path = window.location.pathname;
    const categoryPath = path.split("/category/")[1];
    setCategory(categoryPath);
  }, []);

  let query;
  switch (category) {
    case "trending":
      query = TrendingAnimeQuery;
      break;
    case "popular":
      query = PopularAnimeQuery;
      break;
    case "top":
      query = top100AnimeQuery;
      break;
    case "fav":
      query = favouritesAnimeQuery;
      break;
    default:
      query = null;
      break;
  }

  if (!query) {
    return <div className="h-screen w-screen flex justify-center items-center">Loading..</div>;
  }

  return (
    <>
      <CAnimeList perPage={36} nameCategory={category} query={query} />
    </>
  );
};

export default Page;
