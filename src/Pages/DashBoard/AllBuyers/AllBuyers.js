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

const AllBuyers = () => {
  const [deleting, setDeliting] = useState(null);
  const {
    data: buyers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", "sellers"],
    queryFn: async () => {
      const res = await axios.get(
        "https://bechakena-ten.vercel.app/user/buyers",
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
          toast.success("Buyer Deleted");
          refetch();
          setDeliting(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("oops !! something went wrong! try again.");
        setDeliting(null);
      });
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
          {buyers.map((buyer, index) => (
            <Table.Row key={index}>
              <span>{index + 1}</span>

              <span>
                <p className="flex gap-2 items-center ">{buyer.name}</p>
              </span>
              <span>{buyer.email}</span>
              <span className="flex flex-col gap-3 items-start">
                <Button
                  size="sm"
                  color="error"
                  className="w-full 2xl:w-[30%] relative"
                  onClick={() => handleDeleteuser(buyer.email)}
                  disabled={deleting === buyer.email}
                >
                  {deleting === buyer.email ? (
                    <>
                      <Spinner size={5} color="base-100" />
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllBuyers;
