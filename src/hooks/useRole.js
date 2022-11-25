import { useContext, useEffect, useState } from "react";
import { MyAuthContext } from "../contexts/AuthContext";

export const useRole = () => {
  const [role, setRole] = useState("");
  const [roleLoading, setRoleLoading] = useState(true);
  const { user } = useContext(MyAuthContext);

  useEffect(() => {
    const uri = `http://localhost:5000/user/getRole?email=${user?.email}`;
    console.log(uri);
    fetch(uri)
      .then((res) => res.json())
      .then((user) => {
        setRole(user.role);

        setRoleLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [user?.email]);

  return { role, roleLoading };
};
