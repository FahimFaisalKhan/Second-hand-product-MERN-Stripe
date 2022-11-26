import React from "react";
import "./OrderCard.css";

import { FaLongArrowAltRight } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { Link } from "react-router-dom";
const OrderCard = ({ order }) => {
  const {
    item,
    sellerLocation,
    status,
    condition,
    price,
    productId,
    coverImage,
  } = order;
  return (
    <div class="bg-success w-128 rounded shadow-md flex lg:flex-row card text-grey-darkest border-2 border-info min-h-[30rem]">
      <div class=" w-1/2 flex items-center px-6">
        <img class="  rounded-l-sm" src={coverImage} alt="" />
      </div>

      <div class="flex flex-col justify-center w-full">
        <div class="p-4 pb-0 flex-1 flex flex-col justify-center border-l-2">
          <h3 class="font-medium text-lg text-gray-600 mb-1 text-grey-darkest">
            {item}
          </h3>
          <div class="text-xs  flex items-center mb-4">
            Seller at
            <span className="font-medium text-primary ml-2 flex items-center">
              <ImLocation2 /> {sellerLocation}
            </span>
          </div>
          <span class="text-5xl text-grey-darkest">
            ${price}
            <span class="text-lg">/USD</span>
          </span>
          <div class="flex items-center mt-4 gap-3">
            <div className="badge badge-primary h-[auto] pb-1 text-base-100">
              {status}
            </div>
            <div className="badge badge-secondary h-[auto] pb-1 text-base-100">
              {condition}
            </div>
          </div>
        </div>
        <Link to={`/dashboard/payment/${productId}`}>
          <button class="bg-gray-400 p-3 flex items-center w-10/12 text-warning hover:text-base-100 rounded-r-lg font-medium justify-between transition hover:bg-warning cursor-pointer">
            Pay
            <FaLongArrowAltRight size={25} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
