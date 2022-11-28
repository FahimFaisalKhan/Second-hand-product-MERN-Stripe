import React, { useContext, useState } from "react";
import { Button, Drawer } from "react-daisyui";
import { Link } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import { useRole } from "../../hooks/useRole";
import Spinner from "../../SharedComponents/Spinner/Spinner";
import "./DashBoard.css";
const DashBoard = ({ children, dashHidden, setDashHidden }) => {
  const { user, loading } = useContext(MyAuthContext);
  const { role, roleLoading } = useRole(user?.email);

  if (roleLoading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <div className="drawer drawer-mobile  gap-4 h-auto min-h-[100vh] lg:overflow-visible">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={dashHidden}
        onChange={(event) => {
          event.checked = dashHidden;
        }}
      />
      <div className="drawer-content flex flex-col container mx-auto ">
        {children}
      </div>

      <div className={`drawer-side  ${"hidden"} lg:w-64 xl:w-80 min-h-[100%]`}>
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4  bg-gray-200 text-base-content">
          <li>
            <Link to={"/dashboard"} onClick={() => setDashHidden(false)}>
              {" "}
              Hi There!
            </Link>
          </li>
          {role === "buyer" && (
            <>
              <li>
                <Link
                  to={"/dashboard/myorders"}
                  onClick={() => setDashHidden(false)}
                >
                  {" "}
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/mywishlist"}
                  onClick={() => setDashHidden(false)}
                >
                  {" "}
                  My Wish List
                </Link>
              </li>
            </>
          )}
          {role === "seller" && (
            <>
              <li>
                <Link
                  to={"/dashboard/addproducts"}
                  onClick={() => setDashHidden(false)}
                >
                  {" "}
                  Add a Product
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/myproducts"}
                  onClick={() => setDashHidden(false)}
                >
                  {" "}
                  My Products
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/mybuyers"}
                  onClick={() => setDashHidden(false)}
                >
                  {" "}
                  My Buyers
                </Link>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <Link
                  to={"/dashboard/allsellers"}
                  onClick={() => setDashHidden(false)}
                >
                  {" "}
                  All sellers
                </Link>
              </li>
              <li>
                <Link
                  to={"/dashboard/allbuyers"}
                  onClick={() => setDashHidden(false)}
                >
                  {" "}
                  All Buyers
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
