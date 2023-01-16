import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const CatNav = () => {
  const { data: cats = [], isLoading } = useQuery({
    queryKey: ["categoryNames"],
    queryFn: async () => {
      const res = await axios.get(
        "https://bechakena-ten.vercel.app/categoryNames"
      );
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div className="text-center text-lg font-medium text-warning">
        loading...
      </div>
    );
  }
  return (
    <div className=" flex justify-between bg-info rounded-sm text-lg font-medium ">
      <ul className="menu menu-horizontal p-0 w-full justify-around">
        {cats.map((cat, index) => {
          return (
            <li
              key={index}
              className=" hover:underline decoration-solid decoration-4 underline-offset-4 "
            >
              <Link to={`/category/${cat}`}>{cat}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CatNav;
