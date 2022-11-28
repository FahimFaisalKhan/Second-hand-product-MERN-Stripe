import React from "react";
import { Footer } from "react-daisyui";
import { Link } from "react-router-dom";
import bag from "../../Static/Images/shopping-bag.png";

const FooterComp = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <Footer className="p-10 bg-primary text-base-100 justify-around">
        <div>
          <img src={bag} className="w-4/12" alt="" />
          <p>
            Becha-Kena Ltd.
            <br />
            Providing reliable online murchant since 1992. <br />
            All right reserved to <span> &#169; Fahim Faisal {year}.</span>
          </p>
        </div>

        <div>
          <Footer.Title>Services</Footer.Title>
          <Link className="link link-hover">Branding</Link>
          <Link className="link link-hover">Design</Link>
          <Link className="link link-hover">Marketing</Link>
          <Link className="link link-hover">Advertisement</Link>
        </div>
        <div>
          <Footer.Title>Company</Footer.Title>
          <Link className="link link-hover">About us</Link>
          <Link className="link link-hover">Contact</Link>
          <Link className="link link-hover">Jobs</Link>
          <Link className="link link-hover">Press kit</Link>
        </div>
        <div>
          <Footer.Title>Legal</Footer.Title>
          <Link className="link link-hover">Terms of use</Link>
          <Link className="link link-hover">Privacy policy</Link>
          <Link className="link link-hover">Cookie policy</Link>
        </div>
      </Footer>
    </div>
  );
};

export default FooterComp;
