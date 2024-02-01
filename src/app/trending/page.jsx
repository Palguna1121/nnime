import React from "react";
import { TrendingAnimeQuery } from "@/helper/searchQueryStrings";
import CAnimeList from "@/components/List/Category/CAnimelist";

const Page = () => {
  return (
    <>
      <CAnimeList perPage={8} query={TrendingAnimeQuery} />
    </>
  );
};

export default Page;
