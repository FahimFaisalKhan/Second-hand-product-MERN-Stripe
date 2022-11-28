import axios from "axios";
import { useEffect, useState } from "react";

export const useToken = (email) => {
  const [tokenLoading, setTokenLoading] = useState(false);

  const [token, setToken] = useState("");
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
  }, [email]);

  return { token, tokenLoading };
};
