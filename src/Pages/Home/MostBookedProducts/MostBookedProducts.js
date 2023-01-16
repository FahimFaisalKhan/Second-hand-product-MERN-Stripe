import React from "react";
import SectionDecoration from "../../../SharedComponents/SectionDecoration/SectionDecoration";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../../../SharedComponents/Spinner/Spinner";
import { useContext } from "react";
import { MyAuthContext } from "../../../contexts/AuthContext";
import { useEffect } from "react";

import CartBtn from "../../../SharedComponents/CartBtn/CartBtn";

const MostBookedProducts = () => {
  const { setLoading } = useContext(MyAuthContext);
  const { data: popProducts = [], isLoading } = useQuery({
    queryKey: ["mostBookedProducts"],
    queryFn: async () => {
      const res = await axios.get(
        "https://bechakena-ten.vercel.app/mostBookedProducts"
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading, setLoading]);

  return (
    <div className=" bg-info mt-32 relative py-12 px-3">
      <SectionDecoration />
      <h1 className="font-serif text-5xl text-center py-16">
        Most Booked Products
      </h1>
      <div className="grid xl:grid-cols-4 gap-4  2xl:gap-10  py-16 sm:px-12 items-center">
        {popProducts.map((prod, index) => {
          const { name, coverImage, price, _id } = prod;
          return (
            <div
              key={_id}
              className="card rounded-sm  bg-success shadow-xl
                sm:h-[24rem] flex  flex-col"
            >
              <div className="  flex items-center justify-center h-[13rem] bg-white max-h-[13rem] overflow-hidden">
                <img src={coverImage} alt="Shoes" className=" max-h-[100%]" />
              </div>
              <div className="card-body  text-center grow flex flex-col justify-between items-center">
                <h2 className="mt-2 card-title text-gray-800">{name}</h2>
                <div className="flex justify-between items-center w-full">
                  <p className="grow-0 text-xl font-bold">$ {price}</p>
                  <CartBtn size={25} product={prod} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostBookedProducts;
