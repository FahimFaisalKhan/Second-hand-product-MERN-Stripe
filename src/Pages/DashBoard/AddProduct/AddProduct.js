import { async } from "@firebase/util";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Form, Input, Select, Textarea } from "react-daisyui";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MyAuthContext } from "../../../contexts/AuthContext";
import DropZone from "../../../SharedComponents/DropZone/DropZone";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const AddProduct = () => {
  const navigate = useNavigate();
  const { user } = useContext(MyAuthContext);
  const [coverFile, setCoverFile] = useState(null);
  const [additionalFile1, setAdditionalFile1] = useState(null);
  const [additionalFile2, setAdditionalFile2] = useState(null);
  const [additionalFile3, setAdditionalFile3] = useState(null);
  const [fileError, setFileError] = useState("");
  const [addingProduct, setAddingProduct] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    setAddingProduct(true);
    console.log(coverFile, additionalFile1, user.displayName);

    if (!coverFile) {
      setFileError("You Must add atleast 1 photo");
      setAddingProduct(false);
      return;
    }

    const coverImage = await createUserImage(coverFile);

    const additionalFilesWithNulls = [
      additionalFile1,
      additionalFile2,
      additionalFile3,
    ];

    const additionalFiles = additionalFilesWithNulls.filter(
      (additionalFileWithNull) => additionalFileWithNull
    );
    const additionalImages = [];

    for (let file of additionalFiles) {
      const imageLink = await createUserImage(file);
      additionalImages.push(imageLink);
    }
    const postDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    });

    const product = {
      ...data,
      coverImage,
      additionalImages,
      postDate,
      sellerEmail: user?.email,
    };

    console.log(product.additionalImages[0]);

    (async () => {
      try {
        const uri = `https://bechakena-ten.vercel.app/addProducts`;
        const res = await axios.post(uri, product, {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        });

        if (res.data.acknowledged) {
          setAddingProduct(false);
          toast.success("Successfully added product");
          setCoverFile(null);
          setAdditionalFile1(null);
          setAdditionalFile2(null);
          setAdditionalFile3(null);

          reset();
          navigate("/dashboard/myproducts", { replace: true });
        }
      } catch (err) {
        toast.error("Something went wrong! try again");
        setAddingProduct(false);
      }
    })();
  };
  const createUserImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`,
      formData
    );
    return res.data.data.display_url;
  };
  return (
    <div className=" lg:w-2/4 mx-auto">
      <h1 className="text-center text-3xl mb-5">Add A Product</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Label title="Product name" />
        <Input
          type="text"
          placeholder="product name"
          className="input-bordered"
          {...register("name", { required: "Product name is required" })}
        />

        <Form.Label title="Select a category" />
        <select
          className="select select-bordered w-full "
          {...register("category", {
            required: "must select a category",
          })}
        >
          <option value="Guitars">Guitars</option>
          <option value="Drums">Drums</option>
          <option value="Pianos">Pianos</option>
        </select>
        <Form.Label title="Price" />
        <Input
          type="text"
          placeholder="price"
          className="input-bordered"
          {...register("price", { required: "price name is required" })}
        />
        <Form.Label title="Original Price" />
        <Input
          type="text"
          placeholder="original Price"
          className="input-bordered"
          {...register("OriginalPrice", {
            required: "OriginalPrice name is required",
          })}
        />
        <Form.Label title="Description" />
        <Textarea
          type="text"
          placeholder="description"
          className="input-bordered"
          {...register("description", {
            required: "description name is required",
          })}
        />
        <Form.Label title="Condition" />
        <select
          className="select select-bordered w-full "
          {...register("condition", {
            required: "select one option",
          })}
        >
          <option value="good">Good</option>
          <option value="excellent">Excellent</option>
          <option value="fair">Fair</option>
        </select>
        <Form.Label title="Phone number" />
        <Input
          type="number"
          placeholder="mobile/phone"
          className="input-bordered"
          {...register("contactNumber", {
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
          {...register("location", { required: "location name is required" })}
        />
        <Form.Label title="Year of Purchase" />
        <Input
          type="number"
          placeholder="Enter Year"
          className="input-bordered"
          {...register("yearOfPurchase", {
            required: "year is required",
            maxLength: {
              value: 4,
              message: "Year can not me more then 4 digits",
            },
          })}
        />
        {errors.yearOfPurchase && (
          <span className="text-red-500 mt-3">
            {errors?.yearOfPurchase.message}
          </span>
        )}

        <div className="form-control">
          <Form.Label title="Add Product Main Picture" />
          <DropZone file={coverFile} setFile={setCoverFile} />
          {fileError && <span className="text-red-500">{fileError}</span>}
        </div>
        <Form.Label title="Add Product additional pictures" />
        <div className="flex justify-between">
          <div className="form-control">
            <DropZone
              file={additionalFile1}
              setFile={setAdditionalFile1}
              size={24}
            />
          </div>

          <div className="form-control">
            <DropZone
              file={additionalFile2}
              setFile={setAdditionalFile2}
              size={24}
            />
          </div>
          <div className="form-control">
            <DropZone
              file={additionalFile3}
              setFile={setAdditionalFile3}
              size={24}
            />
          </div>
        </div>

        <Button
          disabled={addingProduct}
          type="submit"
          className="mt-5 relative"
        >
          {addingProduct ? <Spinner size={5} color="base-100" /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
