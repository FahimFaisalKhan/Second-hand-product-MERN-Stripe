import React, { useContext } from "react";
import { Button } from "react-daisyui";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MyAuthContext } from "../../contexts/AuthContext";
import { MyBookingContext } from "../../contexts/BookingContext";

const CartBtn = ({ size, product }) => {
  const { addToCart, cartItems } = useContext(MyBookingContext);

  const cartItemIds = cartItems.map((i) => i.productId);

  const disabled = cartItemIds.includes(product?._id);
  return (
    <Button
      className="bg-transparent disabled:bg-transparent p-0 border-none hover:bg-transparent"
      // disabled={itemExist?._id ? true : false}
      disabled={disabled}
    >
      <BsFillCartPlusFill
        onClick={() => addToCart(product)}
        className={`${
          disabled ? "text-gray-400" : "text-warning"
        } cursor-pointer active:scale-[.9] transition-all`}
        size={size}
      />
    </Button>
  );
};

export default CartBtn;
