import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyAuthContext } from "../contexts/AuthContext";

export const useRole = (email) => {
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  // const { user } = useContext(MyAuthContext);

  useEffect(() => {
    if (email) {
      const uri = `http://localhost:5000/user/getRole?email=${email}`;

      axios
        .get(uri)

        .then((res) => {
          if (res.data.role) {
            setRole(res.data.role);
          }

          setRoleLoading(false);
        })
        .catch((err) => {
          console.log(err, "got role error");

          setRoleLoading(false);
        });
    }
  }, [email]);

  return { role, roleLoading };
};
