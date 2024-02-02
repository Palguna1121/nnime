import Link from "next/link";
import React from "react";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <header className="navbar bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-4xl font-bold">
              nnime
            </Link>
          </div>
          <div className="flex gap-4">
            <div className="hidden gap-8 py-2 sm:hidden md:flex lg:flex">
              <Link href="/category/trending" className="text-base">
                Trending
              </Link>
              <Link href="/category/popular" className="text-base">
                Popular
              </Link>
              <Link href="/category/top" className="text-base">
                Top Anime
              </Link>
              <Link href="/category/fav" className="text-base">
                Favourites
              </Link>
            </div>
            <div className="flex gap-5">
              <Searchbar />

              <Link href="#" className="shrink-0 hidden sm:hidden md:block lg:block">
                <span className="sr-only">Profile</span>
                <img
                  alt="Man"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-10 w-10 rounded-full object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
