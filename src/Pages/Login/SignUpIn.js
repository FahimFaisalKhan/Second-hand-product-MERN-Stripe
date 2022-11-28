import React, { useEffect, useState } from "react";
import { Tabs } from "react-daisyui";
import { useLocation, useNavigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import { useToken } from "../../hooks/useToken";
import Login from "./Login";
import Signup from "./Signup";

const SignUpIn = () => {
  const [tabValue, setTabValue] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState("");
  const { token } = useToken(userEmail);

  const redirectPath = location?.state?.form?.pathname || "/";

  useEffect(() => {
    if (token) {
      console.log(token);
      localStorage.setItem("accessToken", token);
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath, token]);

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
        <Login
          redirectPath={redirectPath}
          processError={processError}
          setUserEmail={setUserEmail}
        />
      )}
      {tabValue === "signup" && (
        <Signup
          redirectPath={redirectPath}
          processError={processError}
          setUserEmail={setUserEmail}
        />
      )}
    </div>
  );
};

export default SignUpIn;
