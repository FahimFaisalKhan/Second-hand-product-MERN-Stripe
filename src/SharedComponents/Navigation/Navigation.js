import React, { useContext, useState } from "react";
import { Button, Dropdown, Input, Menu, Navbar } from "react-daisyui";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MyAuthContext } from "../../contexts/AuthContext";
import { useRole } from "../../hooks/useRole";
import Spinner from "../Spinner/Spinner";

const Navigation = ({ showDashBoardHam, setDashHidden, dashHidden }) => {
  const { user, logOut, loading } = useContext(MyAuthContext);
  const { role, roleLoading } = useRole();
  console.log(user?.displayName);
  const menuItems = (
    <>
      <Menu.Item>
        <Link to={"/"}>Home</Link>
      </Menu.Item>
      {user && role && (
        <>
          <Menu.Item>
            <Link
              to={
                role === "buyer"
                  ? "/dashboard/myorders"
                  : role === "seller"
                  ? "/dashboard/myproducts"
                  : "/dashboard/allsellers"
              }
            >
              Dashboard
            </Link>
          </Menu.Item>
        </>
      )}
      {!user && (
        <>
          <Menu.Item>
            <Link to={"/signinup"}>Signin</Link>
          </Menu.Item>
        </>
      )}

      {user && (
        <>
          <Menu.Item onClick={logOut}>
            <Link>Log out</Link>
          </Menu.Item>
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

  // if (loading || roleLoading) {
  //   return <Spinner size={24} color="primary" />;
  // }
  return (
    <Navbar className="flex-wrap sm:flex-nowrap sm:text-lg">
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
          <Dropdown.Menu tabIndex={0} className="w-52 menu-compact mt-3">
            {menuItems}
          </Dropdown.Menu>
        </Dropdown>
        <Link className="btn btn-ghost normal-case text-xl">daisyUI</Link>
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
        <Menu horizontal className="p-0">
          {menuItems}
        </Menu>
      </Navbar.End>
    </Navbar>
  );
};

export default Navigation;
