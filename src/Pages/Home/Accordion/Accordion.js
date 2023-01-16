import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-daisyui";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import AccordionBlock from "./AccordionBlock";
import toast from "react-hot-toast";
import axios from "axios";

const Accordion = () => {
  const queryRef = useRef(null);

  const demo = [
    {
      question: "What is term?",
      answer:
        " Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put far daughter.",
    },
    {
      question: "what is bern",
      answer:
        "Our asked sex point her she seems. New plenty she horses parish design you. Stuff sight equal of my woody. Him children bringing goodness suitable she entirely put far daughter.",
    },
  ];
  const [accordionData, setAccordionData] = useState([]);
  useEffect(() => {
    axios
      .get("https://bechakena-fahimfaisalkhan.vercel.app/faqs")
      .then(({ data }) => setAccordionData([...data]));
  }, []);
  const handleEmail = () => {
    const msg = queryRef.current.value;

    fetch("https://bechakena-fahimfaisalkhan.vercel.app/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("accessToken"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ query: msg }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          queryRef.current.value = "";
          toast.success("Success fully submitted");
        }
      });
  };

  return (
    <div className="py-24 bg-info grid place-items-center">
      <div className="sm:w-6/12 mx-auto rounded border">
        <div className="bg-white p-10 shadow-sm">
          <h3 className="text-xl font-medium text-gray-800">FAQ</h3>
          <p className="text-sm font-light text-gray-600 my-3">
            If you don't find your answer below, feel free to ask any question
            regarding Becha-Kena in the empty field.
          </p>

          <div className="h-1 w-full mx-auto border-b my-5"></div>
          {accordionData.map((faq) => (
            <AccordionBlock faq={faq} />
          ))}
        </div>
      </div>
      <section className="sm:w-6/12 mx-auto rounded border flex mt-12">
        <input
          placeholder="Write your question here"
          ref={queryRef}
          className="flex w-[75%] sm:w-[80%] rounded-l-lg min-h-[3rem] px-2  items-center"
        />
        <Button
          onClick={handleEmail}
          className="bg-warning text-white w-[25%] sm:w-[20%] rounded-l-none rounded-r-lg min-h-[3rem] capitalize inline-flex justify-center items-center"
        >
          Submit
        </Button>
      </section>
    </div>
  );
};

export default Accordion;
