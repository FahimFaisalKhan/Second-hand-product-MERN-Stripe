import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { MyAuthContext } from "../../../contexts/AuthContext";
import ProductCard from "../../../SharedComponents/ProductCard/ProductCard";
import Spinner from "../../../SharedComponents/Spinner/Spinner";
import OrderCard from "./OrderCard/OrderCard";

const MyOrders = () => {
  const { user, loading } = useContext(MyAuthContext);

  const {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/booking?email=${user?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      return res.data;
    },
  });
  if (loading || isLoading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <div>
      <h1 className="text-start py-12 text-4xl mb-5">
        {!myOrders.length ? (
          "No orders yet!"
        ) : (
          <span className="underline underline-offset-8 decoration-double decoration-2">
            Your Orders
          </span>
        )}
      </h1>

      <section className="grid grid-cols-1 gap-5 mb-24">
        {myOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </section>
    </div>
  );
};

export default MyOrders;
