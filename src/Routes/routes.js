import axios from "axios";
import { Divider } from "react-daisyui";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import DashBoardLayout from "../Layout/DashBoardLayout/DashBoardLayout";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import MainLayout from "../Layout/MainLayout/MainLayout";
import CatItems from "../Pages/CatItems/CatItems";
import MyOrders from "../Pages/DashBoard/MyOrders/MyOrders";
import MyProducts from "../Pages/DashBoard/MyProducts/MyProducts";
import Home from "../Pages/Home/Home";
import SignUpIn from "../Pages/Login/SignUpIn";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddProduct from "../Pages/DashBoard/AddProduct/AddProduct";
import MyBuyers from "../Pages/DashBoard/MyBuyers/MyBuyers";
import SellerRoute from "./SellerRoute/SellerRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/category/:cat"
            element={
              <PrivateRoute>
                <CatItems />
              </PrivateRoute>
            }
            loader={({ params }) =>
              axios.get(`http://localhost:5000/category/${params.cat}`)
            }
          />
        </Route>

        <Route path="/signinup" element={<SignUpIn />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashBoardLayout />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<div>Welcome To DashBoard</div>} />
        <Route
          path="/dashboard/myproducts"
          element={
            <SellerRoute>
              <MyProducts />
            </SellerRoute>
          }
        />
        <Route
          path="/dashboard/addproducts"
          element={
            <SellerRoute>
              <AddProduct />
            </SellerRoute>
          }
        />
        <Route
          path="/dashboard/mybuyers"
          element={
            <SellerRoute>
              <MyBuyers />
            </SellerRoute>
          }
        />
        <Route path="/dashboard/myorders" element={<MyOrders />} />
      </Route>
    </>
  )
);
