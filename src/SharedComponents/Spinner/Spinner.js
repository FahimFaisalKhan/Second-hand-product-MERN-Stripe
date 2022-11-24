import React from "react";

const Spinner = ({ size, color }) => {
  console.log(color);
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <div
        className={`w-${size} h-${size} rounded-full animate-spin-slow border-4 border-dotted border-${color} `}
      ></div>
    </div>
  );
};

export default Spinner;
