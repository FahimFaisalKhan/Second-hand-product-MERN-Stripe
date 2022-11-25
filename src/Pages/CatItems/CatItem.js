import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button, Hero } from "react-daisyui";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import { MdVerified } from "react-icons/md";
import BookingModal from "./BookingModal";

const CatItem = ({ prod }) => {
  const today = new Date();
  const [visible, setVisible] = useState(false);
  const [itemToBook, setItemToBook] = useState(null);
  const {
    OriginalPrice,
    condition,
    contactNumber,
    coverImage,
    description,
    location,
    name,
    postDate,
    price,
    sellerEmail,
    yearOfPurchase,
    _id,
  } = prod;
  const { data: seller, isLoading } = useQuery({
    queryKey: ["user", "getSellerName", sellerEmail],

    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/user/getSellerName?email=${sellerEmail}`
      );

      return res.data;
    },
  });

  const toggleVisible = () => {
    setVisible(!visible);
  };
  if (isLoading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <>
      <Hero key={_id} className="w-full bg-info mb-5 rounded-lg">
        <Hero.Content className="w-full justify-between py-32">
          <img
            alt=""
            src={coverImage}
            className="max-w-sm rounded-lg shadow-2xl w-[40%]"
          />
          <div className="w-[60%]">
            <h1 className="text-5xl font-bold">{name}</h1>
            <div className="py-6">
              <p>{location}</p>
              <p>Resale Price: {price}</p>
              <p>Original Price: {OriginalPrice}</p>
              <p>
                Years of use: {today.getFullYear() - parseInt(yearOfPurchase)}
              </p>
              <p>Posted on: {postDate}</p>
              <div className="relative">
                <p className="flex justify-start items-center gap-1">
                  <span>Seller:</span>
                  <span>{seller.verified && <MdVerified />}</span>
                  <span>{seller.name}</span>
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                toggleVisible();
                setItemToBook(prod);
              }}
              className="text-base-100 capitalize"
              color="primary"
            >
              Book Now
            </Button>
          </div>
        </Hero.Content>
      </Hero>

      {itemToBook && (
        <BookingModal
          itemToBook={itemToBook}
          setItemToBook={setItemToBook}
          visible={visible}
          toggleVisible={toggleVisible}
        />
      )}
    </>
  );
};

export default CatItem;
