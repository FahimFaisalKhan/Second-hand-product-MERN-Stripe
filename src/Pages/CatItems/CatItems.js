import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Button, Hero } from "react-daisyui";
import { useLoaderData } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import CatItem from "./CatItem";

const CatItems = () => {
  const { data: catItems } = useLoaderData();

  const { loading } = useContext(MyAuthContext);
  const [catLoading, setCatLoading] = useState(true);

  useEffect(() => {
    if (catItems.length) {
      setCatLoading(false);
    }
  }, []);
  if (catLoading || loading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <div className="">
      {catItems.map((prod) => {
        return <CatItem key={prod._id} prod={prod} />;
      })}
    </div>
  );
};

export default CatItems;
