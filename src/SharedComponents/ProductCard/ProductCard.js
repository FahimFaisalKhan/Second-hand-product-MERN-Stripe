import React from "react";
import { useContext } from "react";
import { Button } from "react-daisyui";
import { Link } from "react-router-dom";
import { MyBookingContext } from "../../contexts/BookingContext";
import CartBtn from "../CartBtn/CartBtn";

const ProductCard = ({ product, cardOfWishList }) => {
  const { name, price, description, coverImage, condition, location, _id } =
    product;

  return (
    <div className={cardOfWishList ? "bg-info  rounded-lg" : ""}>
      <div
        className={
          !cardOfWishList
            ? "h-[15rem] bg-white flex justify-center items-center overflow-hidden"
            : "h-[20rem] flex justify-center items-center"
        }
      >
        <img
          src={coverImage}
          alt=" random imgee"
          className={` object-cover object-center max-h-[100%]  ${
            cardOfWishList
              ? " mx-auto bg-info max-w-[17rem] w-auto sm:max-w-[35rem] sm:min-w-[23rem] my-5 shadow-md rounded-lg "
              : " w-auto -mt-12"
          }`}
        />
      </div>

      <div className={`relative px-4   ${!cardOfWishList && "-mt-16"}`}>
        <div
          className={`${
            !cardOfWishList
              ? "bg-success rounded-sm border-2 border-neutral"
              : "bg-base-100 rounded-lg"
          }  p-6  shadow-lg`}
        >
          <div className="flex items-baseline mb-5">
            <span className="bg-info text-warning text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
              {condition}
            </span>
            <div className="ml-2 text-base-content uppercase text-xs font-semibold tracking-wider">
              {location}
            </div>
          </div>

          <h4 className="mt-1 text-xl font-semibold uppercase leading-tight ">
            {name}
          </h4>

          <div className="mt-1">${price}</div>
          <div className="mt-4">
            <span className="text-warning text-md font-semibold">
              {description.length > 100
                ? `${description.slice(0, 100)}...`
                : description}
            </span>
          </div>
          <div className="flex justify-between items-end">
            <Link to={`/dashboard/payment/${_id}`}>
              <Button className="text-base-100 mt-5 " color="primary">
                Buy Now
              </Button>
            </Link>
            <CartBtn size={35} product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
