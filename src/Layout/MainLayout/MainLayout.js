import React from "react";
import { Footer } from "react-daisyui";
import { Outlet } from "react-router-dom";
import FooterComp from "../../SharedComponents/FooterComp/FooterComp";
import Navigation from "../../SharedComponents/Navigation/Navigation";
import CatNav from "../../Pages/Home/CatNav/CatNav";

const MainLayout = () => {
  return (
    <div>
      <div className="container mx-auto min-h-[100vh]">
        <Navigation />

        <Outlet />
      </div>

      <FooterComp />
    </div>
  );
};

export default MainLayout;
