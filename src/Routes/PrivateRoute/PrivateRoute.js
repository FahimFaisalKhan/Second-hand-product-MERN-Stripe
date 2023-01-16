import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import Spinner from "../../SharedComponents/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(MyAuthContext);

  const location = useLocation();

  if (loading) {
    return <Spinner size={24} color="primary" />;
  }
  if (!user) {
    return (
      <Navigate to={"/signinup"} state={{ form: location }} replace={true} />
    );
  }

  return children;
};

export default PrivateRoute;
