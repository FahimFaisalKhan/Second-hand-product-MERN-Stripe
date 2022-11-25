import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "react-daisyui";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import Spinner from "../../SharedComponents/Spinner/Spinner";

const BookingModal = ({
  visible,
  toggleVisible,
  itemToBook,
  setItemToBook,
}) => {
  const { user, loading } = useContext(MyAuthContext);
  console.log(user.displayName);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { name: productName, price } = itemToBook;
  console.log(productName);
  const onSubmit = (data) => {
    console.log(data, errors);

    // toggleVisible();
    // setItemToBook({});
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: user?.displayName,
      email: user?.email,

      item: productName,
      price: price,
    },
  });

  if (!itemToBook) {
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
              {...register("userName")}
              className="input-bordered"
              disabled
            />

            <Form.Label title="Email" />
            <Input
              type="email"
              placeholder="email"
              className="input-bordered"
              disabled
              {...register("email")}
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
              {...register("phone", {
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
              {...register("location", {
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
                className="btn btn-secondary capitalize"
              >
                Book Now
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BookingModal;
