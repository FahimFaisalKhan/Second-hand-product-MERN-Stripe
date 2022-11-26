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
  const { role, roleLoading } = useRole();
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
    console.log(data);
    setSubmitLoading(true);

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
          Congratulations random Interner user!
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label title="Your name" />
            <Input
              type="text"
              placeholder="name"
              {...register("buyerName")}
              className="input-bordered"
              disabled
            />

            <Form.Label title="Email" />
            <Input
              type="email"
              placeholder="email"
              className="input-bordered"
              disabled
              {...register("buyerEmail")}
            />

            <Form.Label title="Item" />

            <Input
              type="text"
              placeholder="item name"
              className="input-bordered"
              disabled
              {...register("item")}
            />
            <Form.Label title="Price" />
            <Input
              type="text"
              placeholder="price"
              className="input-bordered"
              disabled
              {...register("price")}
            />
            <Form.Label title="Phone number" />
            <Input
              type="number"
              placeholder="mobile/phone"
              className="input-bordered"
              {...register("buyerPhone", {
                required: "Phone number is required",
                maxLength: {
                  value: 11,
                  message: "Phone number Can not me more then 11 digits",
                },
              })}
            />
            {errors.phone && (
              <span className="text-red-500 mt-3">{errors?.phone.message}</span>
            )}
            <Form.Label title="Location" />
            <Input
              type="text"
              placeholder="location"
              className="input-bordered"
              {...register("buyerLocation", {
                required: "Location is required",
              })}
            />
            {errors.location && (
              <span className="text-red-500 mt-3">
                {errors?.location.message}
              </span>
            )}
            <div className="modal-action">
              <Button
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
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingModal;
