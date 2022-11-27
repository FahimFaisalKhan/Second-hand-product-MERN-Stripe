import React, { useContext } from "react";
import { MyAuthContext } from "../../../contexts/AuthContext";
import Spinner from "../../../SharedComponents/Spinner/Spinner";

const DashBoardWelcome = () => {
  const { user, loading } = useContext(MyAuthContext);
  if (loading) {
    return <Spinner size={24} color="primary" />;
  }
  return <div>Welcome {user.displayName}</div>;
};

export default DashBoardWelcome;
