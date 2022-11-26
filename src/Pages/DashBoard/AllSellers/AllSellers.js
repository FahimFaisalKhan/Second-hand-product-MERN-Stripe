import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth } from "firebase/auth";
import React from "react";
import { Button, Table } from "react-daisyui";
import { useRouteError } from "react-router-dom";
import { app } from "../../../configs/firebase.config";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const AllSellers = () => {
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user", "sellers"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/user/sellers");

      return res.data;
    },
  });

  //DELETEING USER

  const handleDeleteuser = (email) => {
    const auth = getAuth(app);
    axios
      .post("http://localhost:5000/user/seller/delete", { auth, email })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
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
          <span>Action</span>
        </Table.Head>

        <Table.Body>
          {sellers.map((seller, index) => (
            <Table.Row key={index}>
              <span>{index + 1}</span>
              <span>{seller.name}</span>
              <span>{seller.email}</span>
              <span>
                <Button
                  size="sm"
                  color="error"
                  onClick={() => handleDeleteuser(seller.email)}
                >
                  Delete
                </Button>
              </span>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default AllSellers;
