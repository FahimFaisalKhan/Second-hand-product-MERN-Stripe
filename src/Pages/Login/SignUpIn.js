import React, { useState } from "react";
import { Tabs } from "react-daisyui";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const SignUpIn = () => {
  const [tabValue, setTabValue] = useState("login");
  const location = useLocation();

  const redirectPath = location?.state?.form?.pathName || "/";
  const processError = (error) => {
    const parsedError = error
      .slice(error.indexOf("/") + 1, error.indexOf(")"))
      .replace("-", " ");

    return parsedError;
  };

  return (
    <div className="flex flex-col items-center">
      <Tabs
        className="bg-base-200  justify-center py-5 w-full"
        value={tabValue}
        onChange={setTabValue}
      >
        <Tabs.Tab
          className={`text-xl ${
            tabValue === "login" &&
            "underline underline-offset-8 decoration-4 text-primary"
          }`}
          value={"login"}
        >
          Log in
        </Tabs.Tab>
        <Tabs.Tab
          className={`text-xl ${
            tabValue === "signup" &&
            "underline underline-offset-8 decoration-4 text-primary"
          }`}
          value={"signup"}
        >
          Sign up
        </Tabs.Tab>
      </Tabs>

      {tabValue === "login" && (
        <Login redirectPath={redirectPath} processError={processError} />
      )}
      {tabValue === "signup" && (
        <Signup redirectPath={redirectPath} processError={processError} />
      )}
    </div>
  );
};

export default SignUpIn;
