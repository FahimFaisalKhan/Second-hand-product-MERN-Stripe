import React, { useContext, useState } from "react";
import { Button } from "react-daisyui";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import toast from "react-hot-toast";
import axios from "axios";
import { useToken } from "../../hooks/useToken";

const Login = ({ redirectPath, processError, setUserEmail }) => {
  const { loginUser, googleSignIn, loading, setLoading } =
    useContext(MyAuthContext);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;

    loginUser(email, password)
      .then((result) => {
        setUserEmail(result.user.email);
      })
      .then(() => {
        setLoading(false);

        // navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        const parsedError = processError(err.message);
        setLoading(false);
        toast.error(parsedError);
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        if (result.user) {
          const name = result.user.displayName;
          const email = result.user.email;
          const role = "buyer";

          addUserToDb({ name, email, role });
        }
      })
      .catch((err) => {
        const parsedError = processError(err.message);
        setLoading(false);
        toast.error(parsedError);
      });
  };
  const addUserToDb = async (user) => {
    console.log(user);
    const { name, email, role } = user;
    try {
      const res = await axios.post(
        "https://bechakena-ten.vercel.app/users?social=true",
        {
          name,
          email,
          role,
        }
      );

      if (res.data.acknowledged) {
        setLoading(false);
        toast.success("User Logged in Successfully");
        setUserEmail(email);
        // navigate(redirectPath, { replace: true });
      }
    } catch (err) {
      const parsedError = processError(err.message);
      toast.error(parsedError);
    }
  };

  return (
    <div className="w-full">
      <div className="hero min-h-[80vh] bg-base-200">
        <div className="hero-content  w-full items-start">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-5 ">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                <label className="label">
                  <Link href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-warning relative text-base-100"
                >
                  {loading ? <Spinner size={5} color="base-100" /> : "Login"}
                </button>
              </div>
            </form>
            <Button
              onClick={handleGoogleSignIn}
              className="bg-success text-warning hover:text-base-100  mt-3  border-none w-10/12 mx-auto relative"
              type="text"
            >
              {loading ? (
                <Spinner size={5} color="base-100" />
              ) : (
                <>
                  <FcGoogle size={25}></FcGoogle>
                  <p className="ml-3 capitalize">
                    Sign <span className="lowercase">in with google</span>
                  </p>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
