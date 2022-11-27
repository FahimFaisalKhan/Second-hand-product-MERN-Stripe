import React, { useContext, useState } from "react";
import { Button, Drawer } from "react-daisyui";
import { Link } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import { useRole } from "../../hooks/useRole";
import Spinner from "../../SharedComponents/Spinner/Spinner";

const DashBoard = ({ children, dashHidden }) => {
  const { user, loading } = useContext(MyAuthContext);
  const { role, roleLoading } = useRole(user?.email);

  if (roleLoading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <div className="drawer drawer-mobile  gap-4">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col container mx-auto">
        {children}
      </div>

      <div
        className={`drawer-side  ${
          dashHidden && "hidden"
        } lg:w-64 xl:w-80 min-h-[100%]`}
      >
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4  bg-gray-200 text-base-content">
          <li>
            <Link to={"/dashboard"}> Hi There!</Link>
          </li>
          {role === "buyer" && (
            <>
              <li>
                <Link to={"/dashboard/myorders"}> My Orders</Link>
              </li>
              <li>
                <Link to={"/dashboard/mywishlist"}> My Wish List</Link>
              </li>
            </>
          )}
          {role === "seller" && (
            <>
              <li>
                <Link to={"/dashboard/addproducts"}> Add a Product</Link>
              </li>
              <li>
                <Link to={"/dashboard/myproducts"}> My Products</Link>
              </li>
              <li>
                <Link to={"/dashboard/mybuyers"}> My Buyers</Link>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <Link to={"/dashboard/allsellers"}> All sellers</Link>
              </li>
              <li>
                <Link to={"/dashboard/allbuyers"}> All Buyers</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
