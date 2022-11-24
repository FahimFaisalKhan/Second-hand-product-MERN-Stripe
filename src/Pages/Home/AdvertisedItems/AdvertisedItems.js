import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Button, Card } from "react-daisyui";
import SectionDecoration from "../../../SharedComponents/SectionDecoration/SectionDecoration";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const AdvertisedItems = () => {
  const { data: advertisedProducts = [], isLoading } = useQuery({
    queryKey: ["advertisedItems"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/advertisedItems");
      console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <div className="min-h-[80vh] bg-success my-32 py-12 pb-24 px-3">
      <SectionDecoration />
      <h1 className="font-serif text-5xl text-center py-16 ">
        Featured Collections
      </h1>

      <div className="grid xl:grid-cols-4 gap-4 2xl:gap-10  py-16 sm:px-12">
        {advertisedProducts.map((add, index) => {
          const { name, _id, price, description, coverImage } = add;
          return (
            <Card className="bg-neutral p-5">
              <Card.Image
                className="h-52 rounded-xl "
                src={coverImage}
                alt="Shoes"
              />
              <Card.Body className="p-2 mt-3">
                <Card.Title tag="h2">{name}</Card.Title>
                <p className="mb-4">
                  {description.length > 100
                    ? `${description.slice(0, 100)}...`
                    : description}
                </p>
                <Card.Actions className="justify-end">
                  <Button className="text-base-100" color="primary">
                    Buy Now
                  </Button>
                </Card.Actions>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdvertisedItems;
