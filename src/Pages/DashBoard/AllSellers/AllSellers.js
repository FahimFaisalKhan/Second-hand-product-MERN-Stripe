import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Button, Table } from "react-daisyui";
import toast from "react-hot-toast";
import { useRouteError } from "react-router-dom";
import { app } from "../../../configs/firebase.config";
import Spinner from "../../../SharedComponents/Spinner/Spinner";
import { MdVerified } from "react-icons/md";

const AllSellers = () => {
  const [deleting, setDeliting] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", "sellers"],
    queryFn: async () => {
      const res = await axios.get(
        "https://bechakena-ten.vercel.app/user/sellers",
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      return res.data;
    },
  });

  //DELETEING USER

  const handleDeleteuser = (email) => {
    setDeliting(email);
    axios
      .delete(
        "https://bechakena-ten.vercel.app/user/delete",

        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
          data: { email },
        }
      )
      .then((res) => {
        if (res.data.deletedCount > 0 && res.data.acknowledged) {
          toast.success("Seller Deleted");
          refetch();
          setDeliting(null);
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("oops !! something went wrong! try again.");
        setDeliting(null);
      });
  };

  const handleVerifyuser = (email) => {
    setVerifying(true);
    axios
      .put(
        "https://bechakena-ten.vercel.app/user/update",
        { email },
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.acknowledged) {
          setVerifying(false);
          refetch();
        }
      })
      .catch((err) => setVerifying(false));
  };

  if (isLoading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <div>
      <h1 className="text-start py-12 text-4xl mb-5 underline underline-offset-8 decoration-double decoration-2">
        All Sellers
      </h1>
      <Table className="w-full">
        <Table.Head>
          <span />
          <span>Name</span>
          <span>Email</span>
          <span className="ml-5">Action</span>
        </Table.Head>

        <Table.Body>
          {sellers.map((seller, index) => (
            <Table.Row key={index}>
              <span>{index + 1}</span>

              <span>
                <p className="flex gap-2 items-center ">
                  {seller.verified && <MdVerified color="#0d47a1" />}{" "}
                  <span className={!seller.verified ? "ml-6" : ""}>
                    {seller.name}
                  </span>
                </p>
              </span>
              <span>{seller.email}</span>
              <span className="flex flex-col gap-3 items-start">
                <Button
                  size="sm"
                  color="error"
                  className="w-full 2xl:w-[30%] relative"
                  onClick={() => handleDeleteuser(seller.email)}
                  disabled={deleting === seller.email}
                >
                  {deleting === seller.email ? (
                    <>
                      <Spinner size={5} color="base-100" />
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
                <button
                  className="btn btn-sm bg-green-400 hover:bg-green-600 w-full 2xl:w-[30%]"
                  onClick={() => handleVerifyuser(seller.email)}
                  disabled={seller.verified || verifying}
                >
                  {verifying
                    ? "Verifying"
                    : seller.verified
                    ? "Verified"
                    : "Verify"}
                </button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllSellers;
