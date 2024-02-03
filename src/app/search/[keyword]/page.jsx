"use client";
import axios from "axios";
import Header from "@/components/List/Header";
import React, { useEffect, useState } from "react";
import { searchAnimeQuery } from "@/helper/searchQueryStrings";
import SearchList from "@/components/List/Search/SearchList";

const Page = ({ params }) => {
  const { keyword } = params;
  const decodeKeyword = decodeURI(keyword);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, [decodeKeyword]);

  async function getResults() {
    window.scrollTo(0, 0);
    let res = await axios({
      url: process.env.NEXT_PUBLIC_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchAnimeQuery,
        variables: {
          search: decodeKeyword,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setResults(res.data.data.Page);
  }
  const searchNime = results;

  return (
    <>
      <section className="m-5 pb-8">
        {searchNime ? (
          <>
            <Header title={`Hasil Pencarian : ${decodeKeyword}`} />
            <SearchList api={searchNime} />
          </>
        ) : (
          <Header title={`Hasil Pencarian : ${decodeKeyword} Tidak Ditemukan`} />
        )}
      </section>
    </>
  );
};

export default Page;
