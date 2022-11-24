import axios from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import MainLayout from "../Layout/MainLayout/MainLayout";
import CatItems from "../Pages/CatItems/CatItems";
import Home from "../Pages/Home/Home";
import SignUpIn from "../Pages/Login/SignUpIn";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
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
  )
);
