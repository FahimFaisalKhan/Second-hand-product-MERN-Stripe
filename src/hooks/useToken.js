import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyAuthContext } from "../contexts/AuthContext";

export const useToken = (email) => {
  const [token, setToken] = useState("");
  const { tokenLoading, setTokenLoading } = useContext(MyAuthContext);
  console.log(email);

  useEffect(() => {
    setTokenLoading(true);
    if (email) {
      axios
        .post("https://bechakena-ten.vercel.app/jwt", { email: email })
        .then((res) => {
          if (res.data.accessToken) {
            setTokenLoading(false);
            setToken(res.data.accessToken);
          }
        })

        .catch((err) => {
          setTokenLoading(false);
          console.log(err.message);
        });
    }
  }, [email, setTokenLoading]);

  return { token, tokenLoading };
};
