import React from "react";
import { Button } from "react-daisyui";

const ProductCard = ({ product }) => {
  const { name, price, description, coverImage, condition, location } = product;
  return (
    <div>
      <img
        src={coverImage}
        alt=" random imgee"
        className="w-full object-cover object-center rounded-lg shadow-md h-52"
      />

      <div className="relative px-4 -mt-16  ">
        <div className="bg-base-100 p-6 rounded-lg shadow-lg">
          <div className="flex items-baseline mb-5">
            <span className="bg-info text-primary text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
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
            <span className="text-primary text-md font-semibold">
              {description.length > 100
                ? `${description.slice(0, 100)}...`
                : description}
            </span>
          </div>

          <Button className="text-base-100 mt-5" color="primary">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
