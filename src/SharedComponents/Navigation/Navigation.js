import React, { useContext } from "react";
import { Button, Dropdown, Input, Menu, Navbar } from "react-daisyui";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MyAuthContext } from "../../contexts/AuthContext";
import { useRole } from "../../hooks/useRole";

import shoppingBag from "../../Static/Images/shopping-bag.png";
import { BsFillCartFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyBookingContext } from "../../contexts/BookingContext";

const Navigation = ({ showDashBoardHam, setDashHidden, dashHidden }) => {
  const { user, logOut, loading, tokenLoading } = useContext(MyAuthContext);
  const { role, roleLoading } = useRole(user?.email);
  const { cartItems } = useContext(MyBookingContext);
  const handleLogOut = () => {
    logOut().then(() => {
      localStorage.removeItem("accessToken");
    });
  };

  const menuItems = (
    <>
      <Menu.Item>
        <Link to={"/"}>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={"/blog"}>Blog</Link>
      </Menu.Item>

      {!user && (
        <>
          <Menu.Item>
            <Link to={"/signinup"}>Signin</Link>
          </Menu.Item>
        </>
      )}

      {user && !tokenLoading && (
        <>
          <Menu.Item disabled={roleLoading || loading}>
            {role === "buyer" ? (
              <Link to={"/dashboard/myorders"}>Dashboard</Link>
            ) : role === "seller" ? (
              <Link to={"/dashboard/myproducts"}>Dashboard</Link>
            ) : role === "admin" ? (
              <Link to={"/dashboard/allsellers"}>Dashboard</Link>
            ) : (
              <Link to={"/dashboard"}>Dashboard</Link>
            )}
          </Menu.Item>

          <Menu.Item onClick={handleLogOut}>
            <Link to={"/"}>Log out</Link>
          </Menu.Item>
          {role === "buyer" && (
            <Menu.Item className="relative ">
              <Link className="" to={"/dashboard/myorders"}>
                <BsFillCartFill />
              </Link>

              {cartItems?.length !== 0 && (
                <p className="absolute left-6 xl:left-7 top-0 xl:top-2 py-px px-px font-bold  rounded-full bg-red-500 text-xs w-3.5 xl:w-4 h-3.5 xl:h-4 inline-flex items-center justify-center">
                  {cartItems.length}
                </p>
              )}
            </Menu.Item>
          )}
        </>
      )}
    </>
  );

  const searchFieldElement = (
    <div className="flex items-center justify-end w-full sm:w-[auto]">
      <Input size="sm" className="w-[80%] sm:w-96" />
      <button className="btn btn-ghost w-[20%]">
        <FaSearch />
      </button>
    </div>
  );

  return (
    <div className="bg-warning">
      <Navbar className="flex-wrap sm:flex-nowrap sm:text-lg container mx-auto text-success">
        <Navbar.Start className=" justify-between sm:justify-start w-full lg:max-w-[33%]">
          <Dropdown>
            <Button color="ghost" tabIndex={0} className="xl:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </Button>
            <Dropdown.Menu
              tabIndex={0}
              className="w-52 menu-compact mt-3 bg-warning"
            >
              {menuItems}
            </Dropdown.Menu>
          </Dropdown>
          <Link to={"/"}>
            <div className="flex items-center ">
              <img
                src={shoppingBag}
                className="w-6  h-6  md:w-10 md:h-auto"
                alt=""
              />
              <h2 className="btn btn-ghost normal-case text-xl md:text-2xl text-white">
                Becha-Kena
              </h2>
            </div>
          </Link>

          {showDashBoardHam && user && role && (
            <label
              htmlFor="my-drawer"
              color="ghost"
              tabIndex={0}
              className="sm:hidden"
              onClick={() => setDashHidden(!dashHidden)}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          )}
        </Navbar.Start>
        <Navbar.Center className="xl:hidden w-[100%] sm:max-w-[66%] justify-end">
          {searchFieldElement}
          {showDashBoardHam && user && role && (
            <label
              htmlFor="my-drawer"
              color="ghost"
              tabIndex={0}
              className="hidden sm:inline-block lg:hidden"
              onClick={() => setDashHidden(!dashHidden)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          )}
        </Navbar.Center>
        <Navbar.End className="hidden xl:flex">
          {searchFieldElement}
          <Menu horizontal className="p-0 relative">
            {menuItems}
          </Menu>
        </Navbar.End>
      </Navbar>
    </div>
  );
};

export default Navigation;
