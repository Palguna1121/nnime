"use client";

import AnimeList from "@/components/List/AnimeList";
import Header from "@/components/List/Header";
import { TrendingAnimeQuery, PopularAnimeQuery, top100AnimeQuery, favouritesAnimeQuery } from "@/helper/searchQueryStrings";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="m-5 pb-5">
        <Header title="Trending saat ini" linkTitle={"Lihat Semua"} linkHref={"/category/trending"} />
        <AnimeList perPage={12} query={TrendingAnimeQuery} />
      </section>
      <section className="m-5 pb-5">
        <Header title="Populer Musim ini" linkTitle={"Lihat Semua"} linkHref={"/category/popular"} />
        <AnimeList perPage={12} query={PopularAnimeQuery} />
      </section>
      <section className="m-5 pb-5">
        <Header title="Top Anime" linkTitle={"Lihat Semua"} linkHref={"/category/top"} />
        <AnimeList perPage={12} query={top100AnimeQuery} />
      </section>
      <section className="m-5 pb-5">
        <Header title="Anime Favorit" linkTitle={"Lihat Semua"} linkHref={"/category/fav"} />
        <AnimeList perPage={12} query={favouritesAnimeQuery} />
      </section>
    </>
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<Homes />} />
    //     <Route path="/trending/:page" element={<TrendingAnime />} />
    //     <Route path="/popular/:page" element={<PopularAnime />} />
    //     <Route path="/top/:page" element={<TopAnime />} />
    //     <Route path="/fav/:page" element={<FavAnime />} />
    //     <Route path="/id/:id" element={<AnimeDetails />} />
    //   </Routes>
    // </Router>
  );
}
