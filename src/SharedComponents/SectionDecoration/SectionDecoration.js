import React from "react";
import { IoSquareSharp } from "react-icons/io5";
const SectionDecoration = () => {
  return (
    <>
      <IoSquareSharp
        size={45}
        color="white"
        className="absolute z-10 -top-2 -left-2"
      />
      <IoSquareSharp
        size={45}
        color="white"
        className="absolute z-10 top-7 left-7"
      />
      <IoSquareSharp
        size={45}
        color="white"
        className="absolute z-10 -bottom-2 -right-2"
      />
      <IoSquareSharp
        size={45}
        color="white"
        className="absolute z-10 bottom-7 right-7"
      />
    </>
  );
};

export default SectionDecoration;
