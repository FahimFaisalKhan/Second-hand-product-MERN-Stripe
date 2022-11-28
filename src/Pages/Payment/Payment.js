import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const promise = loadStripe(process.env.REACT_APP_stripe_secret);

export default function Payment() {
  const { price, _id } = useLoaderData();
  return (
    <div className="container mx-auto max-w-3xl mt-12">
      <Elements stripe={promise}>
        <CheckoutForm price={price} pId={_id} />
      </Elements>
    </div>
  );
}
