import MainLayout from "../Layouts/MainLayout/MainLayout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import About from "@pages/about";
import Categories from "@pages/categories";
import Home from "@pages/home";
import Product from "@pages/product";
import Login from "@pages/Login";
import Register from "@pages/Register";
import ErrorPage from "@pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", index: true, element: <Home /> },
      { path: "about-us", element: <About /> },
      { path: "categories", element: <Categories /> },
      {
        path: "product/:prefix",
        element: <Product />,
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              status: 400,
              statusText: "Category not found",
            });
          }
          return true;
        },
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
