import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { Button, Table } from "react-daisyui";
import toast from "react-hot-toast";
import { MyAuthContext } from "../../../contexts/AuthContext";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(MyAuthContext);

  const {
    data: myProds = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/myProducts?email=${user?.email}`
      );

      return res.data;
    },
  });

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deleteProduct?id=${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast("Successfully Deleted");
        refetch();
      }
    });
  };

  const handleAdvertise = (id) => {
    axios.put(`http://localhost:5000/advertiseProduct?id=${id}`).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount > 0) {
        toast.success("Advertised Successfully!");
        refetch();
      }
    });
  };

  if (isLoading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <div className="overflow-y-auto ">
      <Table className="w-full">
        <Table.Head>
          <span />
          <span>Name</span>
          <span>Price</span>
          <span>Status</span>
          <span>Action</span>
        </Table.Head>

        <Table.Body>
          {myProds.map((prod, index) => {
            const { _id, name, price, status, advertised } = prod;
            return (
              <Table.Row key={_id}>
                <span>{index + 1}</span>
                <span>{name}</span>
                <span>${price}</span>
                <span>{status}</span>
                <span className="flex flex-col gap-3">
                  {status === "available" && (
                    <Button
                      size="sm"
                      className="capitalize w-full  2xl:w-[30%]"
                      disabled={advertised}
                      onClick={() => handleAdvertise(_id)}
                    >
                      {advertised ? "Advertised" : "Advertise"}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    color="error"
                    className="capitalize w-full  2xl:w-[30%]"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </span>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MyProducts;
