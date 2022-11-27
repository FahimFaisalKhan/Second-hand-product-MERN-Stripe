import { useQuery } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import React, { useContext } from "react";
import { MyAuthContext } from "../../../contexts/AuthContext";
import ProductCard from "../../../SharedComponents/ProductCard/ProductCard";
import Spinner from "../../../SharedComponents/Spinner/Spinner";
import OrderCard from "../MyOrders/OrderCard/OrderCard";

const MyWishlist = () => {
  const { user, loading } = useContext(MyAuthContext);

  const {
    data: wishedProd,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishList", user?.email],

    queryFn: async () => {
      if (user) {
        const res = await axios.get(
          `http://localhost:5000/wishList?customerEmail=${user.email}`,
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        );

        console.log(res.data);

        return res.data;
      }
    },
  });
  if (loading || isLoading) {
    return <Spinner size={24} color="primary" />;
  }

  return (
    <div>
      <h1 className="text-start py-12 text-4xl mb-5 underline underline-offset-8 decoration-double decoration-2">
        Your Wish List
      </h1>
      <div className="grid grid-cols-1 gap-32">
        {wishedProd.map((prod) => (
          <ProductCard product={prod} cardOfWishList={true} />
        ))}
      </div>
    </div>
  );
};

export default MyWishlist;
