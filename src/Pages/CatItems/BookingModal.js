import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "react-daisyui";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import { useRole } from "../../hooks/useRole";
import Spinner from "../../SharedComponents/Spinner/Spinner";

const BookingModal = ({
  visible,
  toggleVisible,
  itemToBook,
  setItemToBook,
  refetchBookBtn,
}) => {
  const { user, loading } = useContext(MyAuthContext);
  const { role, roleLoading } = useRole(user?.email);
  const [submitLoading, setSubmitLoading] = useState(false);
  const {
    name: productName,
    price,
    _id: productId,
    status,
    contactNumber: sellerPhone,
    location: sellerLocation,
    condition,
    coverImage,
  } = itemToBook;

  const onSubmit = (data) => {
    setSubmitLoading(true);

    if (role !== "buyer") {
      toast("Please login as Buyer to book a product");
      setSubmitLoading(false);
      return;
    }

    const bookingTime = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    });
    const bookingItem = {
      ...data,
      productId,
      bookingTime,
      status,
      sellerPhone,
      sellerLocation,
      condition,
      coverImage,
    };
    try {
      axios.post("http://localhost:5000/booking", bookingItem).then((res) => {
        console.log(res.data);

        if (res.data.acknowledged) {
          toast.success("Item booked successfully ");
          setSubmitLoading(false);
          setItemToBook(null);
          refetchBookBtn();
        }
      });
    } catch (err) {
      toast.error("Something went wrong! Please try again");
      setSubmitLoading(false);
    }

    // toggleVisible();
  };
  console.log(user?.displayName);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      buyerName: user?.displayName,
      buyerEmail: user?.email,

      item: productName,
      price: price,
    },
  });

  useEffect(() => {
    console.log(errors.phone);
  }, [errors.phone]);
  if (!itemToBook || loading || roleLoading) {
    return <Spinner size={24} color="primary" />;
  }

  return (
    <div className="font-sans">
      <Modal open={visible}>
        <Button
          size="sm"
          shape="circle"
          className="absolute right-2 top-2 bg-secondary"
          onClick={() => {
            toggleVisible();
            setItemToBook({});
          }}
        >
          ✕
        </Button>
        <Modal.Header className="font-bold">
          Enter your informatin to book a product.
        </Modal.Header>

        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body px-0 lg:px-[auto]"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                {...register("buyerName")}
                className="input input-bordered"
                disabled
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                disabled
                {...register("buyerEmail")}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Product</span>
              </label>

              <input
                type="text"
                placeholder="item name"
                className="input input-bordered"
                disabled
                {...register("item")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="text"
                placeholder="price"
                className="input input-bordered"
                disabled
                {...register("price")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contact number</span>
              </label>
              <input
                type="number"
                placeholder="mobile/phone"
                className="input input-bordered"
                {...register("buyerPhone", {
                  required: "Phone number is required",
                  maxLength: {
                    value: 11,
                    message: "Phone number Can not me more then 11 digits",
                  },
                })}
              />
              {errors.buyerPhone && (
                <span className="text-red-500 mt-3">
                  {errors?.buyerPhone.message}
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="location"
                className="input input-bordered"
                {...register("buyerLocation", {
                  required: "Location is required",
                })}
              />
              {errors.buyersLocation && (
                <span className="text-red-500 mt-3">
                  {errors?.buyersLocation.message}
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                htmlFor="my-modal-5"
                className="btn btn-secondary capitalize relative min-w-[7rem]"
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <Spinner size={5} color="base-100" />
                ) : (
                  "Book Now"
                )}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingModal;
