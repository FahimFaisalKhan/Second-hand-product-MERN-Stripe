import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Hero } from "react-daisyui";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import { MdVerified } from "react-icons/md";
import BookingModal from "./BookingModal";
import { MyAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRole } from "../../hooks/useRole";

const CatItem = ({ prod }) => {
  const today = new Date();

  const { user, loading } = useContext(MyAuthContext);
  const [visible, setVisible] = useState(false);
  const [itemToBook, setItemToBook] = useState(null);
  const { role, roleLoading } = useRole(user?.email);
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
        `https://bechakena-ten.vercel.app/user/getSellerName?email=${sellerEmail}`
      );

      return res.data;
    },
  });
  const {
    data: bookedProductsIds = [],
    bookedProductsIdsLoading,
    refetch: refetchBookBtn,
  } = useQuery({
    queryKey: ["bookedProducts", user?.email],

    queryFn: async () => {
      if (user?.email) {
        const res = await axios.get(
          `https://bechakena-ten.vercel.app/bookedProducts?email=${user.email}`
        );

        return res.data;
      }
    },
  });
  const {
    data: wishedProductsIds = [],
    wishedProductsIdsLoading,
    refetch: refetchWishBtn,
  } = useQuery({
    queryKey: ["wishedProducts", user?.email],

    queryFn: async () => {
      if (user?.email) {
        const res = await axios.get(
          `https://bechakena-ten.vercel.app/wishedProducts?email=${user.email}`
        );

        return res.data;
      }
    },
  });

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const handleWishList = (pId) => {
    if (role !== "buyer") {
      toast("Please login as Buyer to add item to wishlist.");
      return;
    }
    const customerEmail = user?.email;
    axios
      .post("https://bechakena-ten.vercel.app/wishList", {
        pId,
        customerEmail,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          toast.success("Product added to wish list");
          refetchWishBtn();
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Something went wrong! Please try again.");
      });
  };
  if (
    isLoading ||
    bookedProductsIdsLoading ||
    loading ||
    wishedProductsIdsLoading ||
    roleLoading
  ) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <>
      <Hero key={_id} className="w-full bg-success mb-5 rounded-lg">
        <Hero.Content className="w-full flex-col lg:flex-row  justify-between py-32">
          <img
            alt=""
            src={coverImage}
            className="max-w-sm rounded-lg shadow-2xl w-[40%]"
          />
          <div className="lg:w-[60%]">
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
                  <span>
                    {seller.verified && <MdVerified color="#0d47a1" />}
                  </span>
                  <span>{seller.name}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between flex-col lg:flex-row gap-5">
              <Button
                onClick={() => {
                  handleWishList(_id);
                }}
                className="text-base-100 capitalize"
                color="secondary"
                disabled={wishedProductsIds.includes(_id)}
              >
                {wishedProductsIds.includes(_id)
                  ? "Wished"
                  : "Add to wish list"}
              </Button>
              <Button
                onClick={() => {
                  toggleVisible();
                  setItemToBook(prod);
                }}
                className="text-base-100 capitalize"
                color="primary"
                disabled={bookedProductsIds.includes(_id)}
              >
                {bookedProductsIds.includes(_id) ? "Booked" : "Book Now"}
              </Button>
              <Link
                to={`/dashboard/payment/${_id}`}
                className="btn btn-warning text-base-100 capitalize"
                disabled={role !== "buyer"}
              >
                Purchase
              </Link>
            </div>
          </div>
        </Hero.Content>
      </Hero>

      {itemToBook && (
        <BookingModal
          itemToBook={itemToBook}
          setItemToBook={setItemToBook}
          visible={visible}
          toggleVisible={toggleVisible}
          refetchBookBtn={refetchBookBtn}
        />
      )}
    </>
  );
};

export default CatItem;
