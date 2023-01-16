import React from "react";
import "./OrderCard.css";

import { FaLongArrowAltRight } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "react-daisyui";
import axios from "axios";
import { useContext } from "react";
import { MyBookingContext } from "../../../../contexts/BookingContext";
const OrderCard = ({ order, bookingRefetch }) => {
  const {
    _id,
    item,
    sellerLocation,
    status,
    condition,
    price,
    productId,
    coverImage,
  } = order;
  const { cartRefetch } = useContext(MyBookingContext);
  const handleDelete = async (bookingId) => {
    const { data } = await axios.delete(
      `https://bechakena-fahimfaisalkhan.vercel.app/booking`,
      {
        data: { bookingId },
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      }
    );

    if (data.acknowledged) {
      bookingRefetch();
      cartRefetch();
    }
  };
  return (
    <div className="bg-success w-128 rounded shadow-md flex lg:flex-row card text-grey-darkest border-2 border-info pt-5  lg:min-h-[30rem]">
      <div className=" md:w-4/6 lg:w-1/2 flex items-center px-6 self-center">
        <img className="  rounded-l-sm" src={coverImage} alt="" />
      </div>

      <div className="flex flex-col justify-center w-full gap-5">
        <div className="p-4 pb-0 flex-1 flex flex-col justify-center border-l-2">
          <h3 className="font-medium text-lg text-gray-600 mb-1 text-grey-darkest">
            {item}
          </h3>
          <div className="text-xs  flex items-center mb-4">
            Seller at
            <span className="font-medium text-warning ml-2 flex items-center">
              <ImLocation2 /> {sellerLocation}
            </span>
          </div>
          <span className="text-5xl text-grey-darkest">
            ${price}
            <span className="text-lg">/USD</span>
          </span>
          <div className="flex items-center mt-4 gap-3">
            <div className="badge badge-warning h-[auto] pb-1 text-base-100">
              {status}
            </div>
            <div className="badge badge-secondary h-[auto] pb-1 text-base-100">
              {condition}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Link to={`/dashboard/payment/${productId}`} className="w-10/12">
            <button className="bg-gray-400 p-3 flex items-center w-full lg:w-10/12 text-warning hover:text-base-100 lg:rounded-r-lg font-medium justify-between transition hover:bg-warning cursor-pointer">
              Pay
              <FaLongArrowAltRight size={25} />
            </button>
          </Link>
          <Button
            onClick={() => handleDelete(_id)}
            className="w-1/12 mr-8 bg-transparent hover:bg-transparent border-none"
          >
            <MdDeleteForever size={50} className="text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
