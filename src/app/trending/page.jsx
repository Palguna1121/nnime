import AnimeList from "@/components/List/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import { TrendingAnimeQuery } from "@/helper/searchQueryStrings";
import React from "react";

const Page = () => {
  return (
    <>
      <HeaderMenu title={`Trending Anime, page`} />
      <AnimeList perPage={40} query={TrendingAnimeQuery} />
    </>
  );
};

export default Page;
