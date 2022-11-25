import React, { useContext } from "react";
import { Button, Dropdown, Input, Menu, Navbar } from "react-daisyui";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MyAuthContext } from "../../contexts/AuthContext";

const Navigation = () => {
  const { user, logOut, loading } = useContext(MyAuthContext);

  const menuItems = (
    <>
      <Menu.Item>
        <Link to={"/"}>Home</Link>
      </Menu.Item>
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
  return (
    <Navbar className="flex-wrap sm:flex-nowrap sm:text-lg">
      <Navbar.Start className="max-w-[33%]">
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
      </Navbar.Start>
      <Navbar.Center className="xl:hidden w-[100%] sm:max-w-[66%] justify-end">
        {searchFieldElement}
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
