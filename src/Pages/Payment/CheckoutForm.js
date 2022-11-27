import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Payment.css";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import axios from "axios";
import { MyAuthContext } from "../../contexts/AuthContext";
export default function CheckoutForm({ price, pId }) {
  const { loading, user } = useContext(MyAuthContext);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentid, setpaymentid] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = (pId) => {
    if (user) {
      const buyerEmail = user.email;
      axios
        .post("http://localhost:5000/payment", {
          pId,
          paymentid,
          buyerEmail,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err.message));
    }
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [price]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setpaymentid(payload.paymentIntent.id);
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      handlePayment(pId);
    }
  };
  if (loading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        className="btn btn-block relative mt-10"
      >
        <span id="button-text">
          {processing ? (
            <Spinner size={5} color="primary" />
          ) : succeeded ? (
            "Paid"
          ) : (
            "Pay now"
          )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p
        className={
          succeeded ? "result-message mt-8" : "result-message hidden mt-8"
        }
      >
        <span className="text-green-500 ">Payment succeeded</span>, Payment Id:{" "}
        <br />
        <p className=" text-lg font-medium">{paymentid && paymentid}</p>
        Refresh the page to pay again.
      </p>
    </form>
  );
}
