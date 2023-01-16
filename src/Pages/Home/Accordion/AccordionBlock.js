import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const AccordionBlock = ({ faq }) => {
  const { question, answer } = faq;
  const [hidden, setHidden] = useState(true);
  return (
    <div className="transition hover:bg-indigo-50">
      <div className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
        {hidden && (
          <AiOutlinePlus
            onClick={() => setHidden(false)}
            className="symbol-plus"
          />
        )}
        {!hidden && (
          <AiOutlineMinus
            onClick={() => setHidden(true)}
            className="symbol-minus"
          />
        )}
        <h3>{question}</h3>
      </div>

      <div
        className={`accordion-content px-5 pt-0 overflow-hidden  ${
          hidden ? "max-h-[0] opacity-0" : "opacity-1 max-h-[25rem]"
        }`}
        style={{ transition: !hidden ? "all 1.5s" : "all .4s" }}
      >
        <p className="leading-6 font-light pl-9 pb-5 text-justify">{answer}</p>
      </div>
    </div>
  );
};

export default AccordionBlock;
