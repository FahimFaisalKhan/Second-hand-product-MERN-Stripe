import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import { useRole } from "../../hooks/useRole";
import Spinner from "../../SharedComponents/Spinner/Spinner";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(MyAuthContext);
  const { role, roleLoading } = useRole();

  const location = useLocation();
  if (loading || roleLoading) {
    return <Spinner size={24} color="primary" />;
  }

  if (role === "seller" || role === "admin") {
    return children;
  }

  return (
    <Navigate to={"/signinup"} state={{ from: location }} replace={true} />
  );
};

export default SellerRoute;
