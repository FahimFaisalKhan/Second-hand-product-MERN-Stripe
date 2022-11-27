import React from "react";
import SectionDecoration from "../../../SharedComponents/SectionDecoration/SectionDecoration";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const MostBookedProducts = () => {
  const { data: popProducts = [], isLoading } = useQuery({
    queryKey: ["mostBookedProducts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/mostBookedProducts");
      return res.data;
    },
  });
  if (isLoading) {
    return <Spinner size={24} color="primary" />;
  }
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
              className={`card  bg-success shadow-xl h-[28rem] ${
                (index + 1) % 2 === 0 ? "sm:h-[33rem]" : "sm:h-[28rem]"
              }`}
            >
              <figure className=" h-[70%]">
                <img src={coverImage} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center h-[30%]">
                <h2 className="card-title">{name}</h2>
                <p>{price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostBookedProducts;
