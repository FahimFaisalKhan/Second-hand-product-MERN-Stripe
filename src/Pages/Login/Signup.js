import { async } from "@firebase/util";
import axios from "axios";

import React, { useContext, useEffect, useState } from "react";

// import Tab from "react-daisyui/dist/Tabs/Tab";
import { useForm } from "react-hook-form";

import { MyAuthContext } from "../../contexts/AuthContext";

import toast from "react-hot-toast";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import DropZone from "../../SharedComponents/DropZone/DropZone";
import { useRole } from "../../hooks/useRole";
import { useToken } from "../../hooks/useToken";

const Signup = ({ processError, setUserEmail }) => {
  const { createUser, updateUser } = useContext(MyAuthContext);
  const [userLoading, setUserLoading] = useState(false);
  const [file, setFile] = useState("");
  const [fileError, setFileError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "buyer",
    },
  });
  const onSubmit = (data) => {
    setUserLoading(true);
    if (!file) {
      setFileError("File Required");
      setUserLoading(false);
      return;
    }

    createUser(data.email, data.password)
      .then(async (result) => {
        const img = await createUserImage(file);

        if (img) {
          updateUser(data.name, img)
            .then(() => {
              setUserEmail(data.email);
              addUserToDb({ ...data, img });
            })
            .catch((err) => {
              const parsedError = processError(err.message);
              setUserLoading(false);
              toast.error(parsedError);
            });
        }
      })
      .catch((err) => {
        const parsedError = processError(err.message);
        setUserLoading(false);
        toast.error(parsedError);
      });
  };

  const createUserImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post(
      "https://api.imgbb.com/1/upload?key=847edcc492cd21f7cb17514808b3003e",
      formData
    );
    return res.data.data.display_url;
  };

  const addUserToDb = async (user) => {
    const { name, email, role } = user;
    try {
      const res = await axios.post("http://localhost:5000/users", {
        name,
        email,
        role,
      });

      if (res.data.acknowledged) {
        toast.success("User Created Successfully");

        setUserLoading(false);
      }
    } catch (err) {
      const parsedError = processError(err.message);
      setUserLoading(false);
      toast.error(parsedError);
    }
  };

  useEffect(() => {
    file && setFileError("");
  }, [file]);
  return (
    <div className="w-full">
      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content w-full">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  {...register("name", { required: "This field is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 mt-3">
                    {errors?.name.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", { required: "This field is required" })}
                />
                {errors.email && (
                  <span className="text-red-500 mt-3">
                    {errors?.email.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Add Photo</span>
                </label>
                <DropZone file={file} setFile={setFile} />
                {fileError && <span className="text-red-500">{fileError}</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 mt-3">
                    {errors?.password.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Signup As:</span>
                </label>
                <label className="label cursor-pointer justify-start items-center gap-3">
                  <span className="label-text w-10">Buyer</span>
                  <input
                    {...register("role")}
                    type="radio"
                    value="buyer"
                    className="radio checked:bg-primary"
                  />
                </label>
                <label className="label cursor-pointer justify-start items-center gap-3">
                  <span className="label-text w-10">Seller</span>
                  <input
                    {...register("role")}
                    type="radio"
                    value="seller"
                    className="radio checked:bg-primary"
                  />
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary relative">
                  {userLoading ? (
                    <Spinner size={5} color="base-100" />
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
