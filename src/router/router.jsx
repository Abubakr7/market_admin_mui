import { lazy } from "react";

export const Users = lazy(() => import("../pages/Users/Users.jsx"));
export const Brands = lazy(() => import("../pages/Brands/Brands"));
export const Products = lazy(() => import("../pages/Products/Products"));
export const Categories = lazy(() => import("../pages/Categories/Categories"));
export const SubCategories = lazy(() =>
  import("../pages/SubCategories/SubCategories")
);
export const Login = lazy(() => import("../pages/Login/Login"));
export const Dashboard = lazy(() => import("../components/Dashboard"));
