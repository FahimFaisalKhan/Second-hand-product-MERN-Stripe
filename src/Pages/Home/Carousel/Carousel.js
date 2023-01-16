import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import "./Carousel.css";

// import required modules
import { Autoplay, Pagination, Navigation, Parallax } from "swiper";
import SectionDecoration from "../../../SharedComponents/SectionDecoration/SectionDecoration";
import guitars from "../../../Static/Images/guitars.jpg";
import drums from "../../../Static/Images/drums.jpg";
import pianos from "../../../Static/Images/pianos.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

export default function Carousel() {
  const arr = [guitars, drums, pianos];

  const { isloading, data: offers = {} } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://bechakena-fahimfaisalkhan.vercel.app/offers"
      );

      return data[0];
    },
  });
  if (isloading) {
    return <Spinner size={24} color={"warning"} />;
  }
  // console.log(offers.offers);
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, Parallax]}
        className="mySwiper h-[25rem] min-h-[25rem] bg-warning mt-32 flex items-center rounded-sm"
        style={{
          "--swiper-navigation-color": "#0d47a1",
          "--swiper-pagination-color": "#0d47a1",
        }}
      >
        {offers.offers?.map((o) => (
          <SwiperSlide
            className=" px-24 h-full"
            style={{
              backgroundImage: ` linear-gradient(to right,  rgba(0, 41, 107,.97) 35% ,  rgba(0, 41, 107, .5) 45% , rgba(0, 41, 107, .1) ) , url(${o.image})`,
            }}
          >
            <div className="flex flex-col justify-center items-start max-w-[30%] h-full">
              <h1 className="text-4xl text-yellow-300 font-bold">
                {offers.title}
              </h1>
              <p className="text-success">{o.shortDescription}</p>
              <i className="text-lg mt-5 text-green-300">{o.fancy}</i>
            </div>
          </SwiperSlide>
        ))}

        <SectionDecoration />
      </Swiper>
    </>
  );
}
