import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Button, Hero } from "react-daisyui";
import { useLoaderData } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import CatItem from "./CatItem";

const CatItems = () => {
  const { data: catItems } = useLoaderData();
  const { loading } = useContext(MyAuthContext);

  console.log(catItems);

  return (
    <div className="relative min-h-[64.5vh]">
      {catItems.map((prod) => {
        return <CatItem prod={prod} />;
      })}
    </div>
  );
};

export default CatItems;
