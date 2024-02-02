"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { BsFillPlayFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { TrendingAnimeQuery } from "@/helper/searchQueryStrings";
import Link from "next/link";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
// import Swiper from "swiper";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    window.scrollTo(0, 0);
    let result = await axios({
      url: process.env.NEXT_PUBLIC_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: TrendingAnimeQuery,
        variables: {
          page: 1,
          perPage: 25,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setImages(result?.data?.data?.Page.media);
    setLoading(false);
  }
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        pagination={{ dynamicBullets: true }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {images?.map(
          (item, index) =>
            item.bannerImage !== null && (
              <SwiperSlide key={index}>
                <div className="relative">
                  <img src={item.bannerImage} alt="" className="w-full h-64 md:h-80 object-cover rounded-md" />
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/90 via-gray-800/70 to-transparent rounded-md">
                    <div className="flex justify-between items-center text-white px-6 py-4">
                      <p className="font-semibold text-xl">
                        {item.title.english !== null
                          ? item.title.english.length > 35
                            ? item.title.english.substring(0, 35) + "..."
                            : item.title.english
                          : item.title.romaji.length > 35
                          ? item.title.romaji.substring(0, 35) + "..."
                          : item.title.romaji}
                      </p>
                      <IconContext.Provider
                        value={{
                          size: "2rem",
                          style: {
                            verticalAlign: "middle",
                            paddingLeft: "0.2rem",
                            marginBottom: "0.1rem",
                            marginRight: "0.3rem",
                          },
                        }}
                      >
                        <Link href={"anime/" + item.idMal} className="flex items-center">
                          <div className="block md:hidden">
                            <BsFillPlayFill />
                          </div>
                          <span className="ml-1 hidden md:block">Watch Now</span>
                        </Link>
                      </IconContext.Provider>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
        )}
      </Swiper>
    </div>
  );
};

export default Carousel;
