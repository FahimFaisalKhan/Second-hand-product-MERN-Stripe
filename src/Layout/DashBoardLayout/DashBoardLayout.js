import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { MyAuthContext } from "../../contexts/AuthContext";
import { useRole } from "../../hooks/useRole";
import DashBoard from "../../Pages/DashBoard/DashBoard";
import FooterComp from "../../SharedComponents/FooterComp/FooterComp";
import Navigation from "../../SharedComponents/Navigation/Navigation";

const DashBoardLayout = () => {
  const [dashHidden, setDashHidden] = useState(true);

  return (
    <div>
      <div>
        <Navigation
          dashHidden={dashHidden}
          setDashHidden={setDashHidden}
          showDashBoardHam={true}
        />
        <section className="my-5 px-6 min-h-[100vh]">
          <DashBoard dashHidden={dashHidden}>
            <Outlet />
          </DashBoard>
        </section>
      </div>
      <FooterComp />
    </div>
  );
};

export default DashBoardLayout;
