import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Table } from "react-daisyui";
import toast from "react-hot-toast";
import { MyAuthContext } from "../../../contexts/AuthContext";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const MyProducts = () => {
  const { user } = useContext(MyAuthContext);
  const [deleting, setDeleting] = useState(false);
  const [advertising, setAdverTising] = useState(false);

  const {
    data: myProds = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://bechakena-ten.vercel.app/myProducts?email=${user?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      return res.data;
    },
  });

  const handleDelete = (id) => {
    setDeleting(true);
    axios
      .delete(`https://bechakena-ten.vercel.app/deleteProduct?id=${id}`, {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast("Successfully Deleted");
          setDeleting(false);
          refetch();
        }
      })
      .catch(() => setDeleting(false));
  };

  const handleAdvertise = (id) => {
    setAdverTising(true);
    axios
      .get(`https://bechakena-ten.vercel.app/advertiseProduct?id=${id}`, {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Advertised Successfully!");
          setAdverTising(false);
          refetch();
        }
      })
      .catch((err) => {
        console.log(err.essage);
        setAdverTising(false);
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
                      disabled={advertised || advertising}
                      onClick={() => handleAdvertise(_id)}
                    >
                      {advertising
                        ? "Advertising"
                        : advertised
                        ? "Advertised"
                        : "Advertise"}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    color="error"
                    className="capitalize w-full  2xl:w-[30%]"
                    onClick={() => handleDelete(_id)}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting" : "Delete"}
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
