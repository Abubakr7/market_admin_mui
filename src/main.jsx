import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import Layout from "./layout/Layout.jsx";
import {
  Brands,
  Categories,
  Dashboard,
  Login,
  Products,
  SubCategories,
  Users,
} from "./router/router.jsx";
import AuthCheck from "./utils/AuthCheck";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthCheck>
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      </AuthCheck>
    ),
    errorElement: (props) => {
      return <div>error</div>;
    },
  },
  {
    path: "/panel",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: (props) => {
      console.log(props);
      return <div>error</div>;
    },
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </Suspense>
        ),
        errorElement: (props) => {
          console.log(props);
          return <div>error</div>;
        },
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Users />
          </Suspense>
        ),
        errorElement: (props) => {
          console.log(props);
          return <div>error</div>;
        },
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Products />
          </Suspense>
        ),
        errorElement: (props) => {
          console.log(props);
          return <div>error</div>;
        },
      },
      {
        path: "categories",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Categories />
          </Suspense>
        ),
        errorElement: (props) => {
          console.log(props);
          return <div>error</div>;
        },
      },
      {
        path: "subcategories",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SubCategories />
          </Suspense>
        ),
        errorElement: (props) => {
          console.log(props);
          return <div>error</div>;
        },
      },
      {
        path: "brands",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Brands />
          </Suspense>
        ),
        errorElement: (props) => {
          console.log(props);
          return <div>error</div>;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
