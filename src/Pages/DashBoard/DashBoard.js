import React, { useState } from "react";
import { Button, Drawer } from "react-daisyui";
import { Link } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import Spinner from "../../SharedComponents/Spinner/Spinner";

const DashBoard = ({ children, dashHidden }) => {
  const { role, roleLoading } = useRole();

  console.log(role);

  if (roleLoading) {
    return <Spinner size={24} color="primary" />;
  }
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col container mx-auto">
        {children}
      </div>

      <div className={`drawer-side  ${dashHidden && "hidden"} lg:w-64 xl:w-80`}>
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4  bg-base-100 text-base-content">
          {role === "buyer" && (
            <>
              <li>
                <Link to={"/dashboard/myorders"}> My Orders</Link>
              </li>
            </>
          )}
          {role === "seller" && (
            <>
              <li>
                <Link to={"/dashboard/myorders"}> My Orders</Link>
              </li>
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
                <Link to={"/dashboard/myorders"}> My Orders</Link>
              </li>
              <li>
                <Link to={"/dashboard/addproducts"}> Add a Product</Link>
              </li>
              <li>
                <Link to={"/dashboard/myproducts"}> My Products</Link>
              </li>
              <li>
                <Link to={"/dashboard/mybuyers"}> My Buyers</Link>
              </li>
              <li>
                <Link> All sellers</Link>
              </li>
              <li>
                <Link> All Buyers</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
