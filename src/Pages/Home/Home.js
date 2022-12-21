import React from "react";
import { Button } from "react-daisyui";
import bannerMan from "../../Static/Images/bannerMan.png";
import fillBlob from "../../Static/Images/fillBlob.svg";
import fillBlobSmall from "../../Static/Images/fillBlobSmall.svg";

import outlineBlob from "../../Static/Images/outlineBLob.svg";

import Spinner from "../../SharedComponents/Spinner/Spinner";
import MostBookedProducts from "./MostBookedProducts/MostBookedProducts";
import SectionDecoration from "../../SharedComponents/SectionDecoration/SectionDecoration";
import AdvertisedItems from "./AdvertisedItems/AdvertisedItems";
import { useContext } from "react";
import { MyAuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";

const Home = () => {
  const { loading } = useContext(MyAuthContext);

  if (loading) {
    return <Spinner size={24} color="primary" />;
  }
  console.log(loading);
  return (
    <div>
      <section className="flex flex-col  lg:flex-row min-h-[80vh] relative ">
        <div className="lg:w-2/4 flex flex-col justify-center gap-8 bg-info py-32 lg:py-[auto] px-10 lg:px-32 rounded-l-sm">
          <h2>Welcome to Becha-Kena!</h2>
          <h1 className="font-serif text-5xl ">
            Feel Authentic Peace Of Shopping
          </h1>
          <Button className="bg-base-content text-base-100 hover:text-base-content w-44">
            Shop Now
          </Button>
        </div>
        <div className="lg:w-2/4 flex justify-center items-center bg-success relative rounded-r-sm">
          <img className="w-full z-10" src={bannerMan} alt="" />
          <img
            src={fillBlob}
            alt=""
            className="absolute w-[50rem]  top-0 -left-16 sm:-left-32"
          />
          <img
            src={outlineBlob}
            alt=""
            className="absolute w-56 sm:w-[40rem] top-12 "
          />
          <img
            src={fillBlobSmall}
            alt=""
            className="absolute w-12 sm:w-24  top-6 left-44 sm:left-80 "
          />
        </div>
        <SectionDecoration />
      </section>
      <section className="relative">
        <MostBookedProducts />
      </section>
      <section className="relative">
        <AdvertisedItems />
      </section>
    </div>
  );
};

export default Home;
