"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const Searchbar = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (event) => {
    const keyword = searchRef.current.value;

    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      if (keyword.trim() !== "") {
        router.push(`/search/${keyword}`);
      }
    }
  };

  return (
    <>
      <div className="relative">
        <label className="sr-only" htmlFor="search">
          {" "}
          Search{" "}
        </label>

        <input autoComplete="off" onKeyPress={handleSearch} ref={searchRef} className="h-10 w-full rounded-full border-none bg-white pe-10 ps-4 text-sm shadow-sm sm:w-56 text-black" id="search" type="search" placeholder="Search Anime..." />

        <button type="button" onClick={handleSearch} className="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-gray-50 p-2 text-gray-600 transition hover:text-gray-700">
          <span className="sr-only">Search</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Searchbar;
