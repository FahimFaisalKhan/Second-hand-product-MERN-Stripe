import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { Button, Card } from "react-daisyui";
import { MyAuthContext } from "../../../contexts/AuthContext";
import ProductCard from "../../../SharedComponents/ProductCard/ProductCard";
import SectionDecoration from "../../../SharedComponents/SectionDecoration/SectionDecoration";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const AdvertisedItems = () => {
  const { data: advertisedProducts = [], isLoading } = useQuery({
    queryKey: ["advertisedItems"],
    queryFn: async () => {
      const res = await axios.get(
        "https://bechakena-ten.vercel.app/advertisedItems"
      );

      return res.data;
    },
  });
  const { setLoading } = useContext(MyAuthContext);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading, setLoading]);

  if (advertisedProducts.length < 1) {
    return;
  }
  return (
    <div className="min-h-[80vh] bg-success my-32 py-12 pb-24 px-3">
      <SectionDecoration />
      <h1 className="font-serif text-5xl text-center py-16 ">
        Advertised Collections
      </h1>

      <div className="grid xl:grid-cols-4 gap-4 2xl:gap-10 2xl:gap-y-32  py-16 sm:px-12">
        {advertisedProducts.map((add, index) => {
          return <ProductCard key={add._id} product={add}></ProductCard>;
        })}
      </div>
    </div>
  );
};

export default AdvertisedItems;
