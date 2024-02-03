"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiArrowToBottom, BiFullscreen } from "react-icons/bi";
import { HiArrowSmLeft, HiArrowSmRight, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { searchByIdQuery } from "@/helper/searchQueryStrings";
import VideoPlayer from "@/components/Player/VideoPlayer";
import Link from "next/link";

const Page = () => {
  let url = window.location.href;
  const parts = url.split("/");

  const mal_id = parts[4];
  const slug = parts[5];
  const episode = parts[6];

  const [episodeLinks, setEpisodeLinks] = useState([]);
  const [currentServer, setCurrentServer] = useState("");
  const [animeDetails, setAnimeDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [internalPlayer, setInternalPlayer] = useState(true);

  useEffect(() => {
    getEpisodeLinks();
  }, [episode]);

  function handleNavigation(newUrl) {
    window.location.href = newUrl;
  }

  async function getEpisodeLinks() {
    setLoading(true);
    window.scrollTo(0, 0);
    let res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/getmixlinks?id=${slug}&ep=${episode}`);
    setEpisodeLinks(res.data);

    setCurrentServer(res.data.gogoLink);
    if (!res.data.sources) {
      setInternalPlayer(true);
    }
    updateLocalStorage(res.data.animeId, res.data.episodeNum, mal_id, res.data.isDub);
    let aniRes = await axios({
      url: process.env.NEXT_PUBLIC_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchByIdQuery,
        variables: {
          id: mal_id,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setAnimeDetails(aniRes?.data?.data.Media);
    setLoading(false);
  }

  function fullScreenHandler(e) {
    setFullScreen(!fullScreen);
    let video = document.getElementById("video");

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      window.screen.orientation.lock("landscape-primary");
    } else {
      document.exitFullscreen();
    }
  }

  function updateLocalStorage(animeId, episode, malId, isDub) {
    if (localStorage.getItem("Watching")) {
      let data = localStorage.getItem("Watching");
      data = JSON.parse(data);
      let index = data.findIndex((i) => i.animeId === animeId);
      if (index !== -1) {
        data.splice(index, 1);
      }
      data.unshift({
        animeId,
        episode,
        malId,
        isDub,
      });
      data = JSON.stringify(data);
      localStorage.setItem("Watching", data);
    } else {
      let data = [];
      data.push({
        animeId,
        episode,
        malId,
        isDub,
      });
      data = JSON.stringify(data);
      localStorage.setItem("Watching", data);
    }
  }

  return (
    <div>
      {loading && <div className="h-screen w-screen flex justify-center items-center">Loading..</div>}
      {!loading && (
        <div className="mx-10 my-5">
          {episodeLinks && animeDetails && currentServer !== "" && (
            <div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-white text-xl font-semibold">
                    <span>{`${animeDetails.title.english !== null ? animeDetails.title.english : animeDetails.title.userPreferred}`}</span>
                    {` Episode - ${episode}`}
                    {/* ${episodeLinks.isDub ? "(Dub)" : "(Sub)"} */}
                  </p>
                  <div className="flex items-center">
                    <Link href={episodeLinks.downloadLink} target="_blank" rel="noopener noreferrer" className="text-white flex items-center mr-3">
                      <span>Download</span>
                      <BiArrowToBottom className="ml-1" />
                    </Link>
                  </div>
                </div>
                <p className="text-sm text-gray-400 font-light">If the video player doesn't load or if blank refresh the page</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-4">
                <div className="md:col-span-2">
                  <VideoPlayer
                    sources={episodeLinks.sources}
                    type={episodeLinks.type}
                    internalPlayer={internalPlayer}
                    setInternalPlayer={setInternalPlayer}
                    title={`${mal_id}EP${episodeLinks.episodeNum}${episodeLinks.isDub}`}
                    banner={animeDetails.bannerImage}
                    totalEpisodes={episodeLinks.totalEpisodes}
                    currentEpisode={episodeLinks.episodeNum}
                    malId={mal_id}
                  />

                  <div className="flex justify-around mt-4">
                    {parseInt(episode) > 1 && (
                      <button onClick={() => handleNavigation(`/play/${mal_id}/${episodeLinks.animeId}/${parseInt(episode) - 1}`)} className="text-white text-lg font-semibold flex items-center">
                        <HiArrowSmLeft />
                        <span className="ml-1">Previous</span>
                      </button>
                    )}
                    {parseInt(episode) < parseInt(episodeLinks.totalEpisodes) && (
                      <button onClick={() => handleNavigation(`/play/${mal_id}/${episodeLinks.animeId}/${parseInt(episode) + 1}`)} className="text-white text-lg font-semibold flex items-center">
                        <span className="mr-1">Next</span>
                        <HiArrowSmRight />
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-gray-900 rounded-lg border border-gray-700 p-4 md:col-span-1">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-white text-lg font-semibold">Episodes</p>
                  </div>
                  <div className="grid grid-cols-5 gap-4">
                    {[...Array(parseInt(episodeLinks.totalEpisodes))].map((x, i) => (
                      <button
                        key={i}
                        onClick={() => handleNavigation(`/play/${mal_id}/${episodeLinks.animeId}/${parseInt(i) + 1}`)}
                        className={`text-white text-center border border-gray-700 rounded-md py-2 hover:bg-blue-600 ${i + 1 <= parseInt(episode) ? "bg-blue-600" : ""}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
