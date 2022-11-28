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
import AdminRoute from "./AdminRoute/AdminRoute";
import AllSellers from "../Pages/DashBoard/AllSellers/AllSellers";
import AllBuyers from "../Pages/DashBoard/AllBuyers/AllBuyers";
import BuyerRoute from "./BuyerRoute/BuyerRoute";
import Payment from "../Pages/Payment/Payment";
import MyWishlist from "../Pages/DashBoard/MyWishlist/MyWishlist";
import DashBoardWelcome from "../Pages/DashBoard/DashBoardWelcome/DashBoardWelcome";
import Blog from "../Pages/Blog/Blog";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
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
        errorElement={<ErrorPage />}
      >
        <Route path="/dashboard" element={<DashBoardWelcome />} />
        <Route
          path="/dashboard/myorders"
          element={
            <BuyerRoute>
              <MyOrders />
            </BuyerRoute>
          }
        />
        <Route
          path="/dashboard/mywishlist"
          element={
            <BuyerRoute>
              <MyWishlist />
            </BuyerRoute>
          }
        />
        <Route
          path="/dashboard/payment/:pId"
          loader={({ params }) =>
            fetch(`http://localhost:5000/getProductById/${params.pId}`)
          }
          element={
            <BuyerRoute>
              <Payment />
            </BuyerRoute>
          }
        />
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

        <Route
          path="/dashboard/allsellers"
          element={
            <AdminRoute>
              <AllSellers />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/allbuyers"
          element={
            <AdminRoute>
              <AllBuyers />
            </AdminRoute>
          }
        />
      </Route>
    </>
  )
);
