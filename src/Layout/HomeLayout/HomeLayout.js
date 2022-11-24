import React from "react";
import { Outlet } from "react-router-dom";
import CatNav from "../../Pages/Home/CatNav/CatNav";

const HomeLayout = () => {
  return (
    <div>
      <section className="mt-6 mb-5 relative">
        <CatNav />
      </section>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
