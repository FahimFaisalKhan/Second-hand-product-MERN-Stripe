import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useRole } from "../hooks/useRole";
import { MyAuthContext } from "./AuthContext";

export const MyBookingContext = createContext();

const BookingContext = ({ children }) => {
  const { user } = useContext(MyAuthContext);
  const { role } = useRole(user?.email);

  const {
    isLoading,
    refetch: cartRefetch,
    data: cartItems = [],
  } = useQuery({
    queryKey: ["booking-count", user?.email, role],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `https://bechakena-fahimfaisalkhan.vercel.app/booking?email=${user?.email}`,
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        );

        return data;
      } catch (err) {
        console.log(err.message);
      }
    },
  });
  const addToCart = async (product) => {
    const bookingTime = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    });
    const {
      name: item,
      price,
      status,
      coverImage,
      condition,

      _id: productId,
      contactNumber: sellerPhone,
      location: sellerLocation,
    } = product;

    const bookingItem = {
      buyerName: user.displayName,
      buyerEmail: user?.email,
      item,
      price,
      productId,
      bookingTime,
      status,
      sellerPhone,
      sellerLocation,
      condition,
      coverImage,
    };
    try {
      const { data } = await axios.post(
        "https://bechakena-ten.vercel.app/booking",
        bookingItem,
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      if (data.acknowledged) {
        cartRefetch();
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again");
    }
  };
  return (
    <div>
      <MyBookingContext.Provider
        value={{
          addToCart,
          cartItems,
          cartRefetch,
        }}
      >
        {children}
      </MyBookingContext.Provider>
    </div>
  );
};
export default BookingContext;
