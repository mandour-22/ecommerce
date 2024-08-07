import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Component
import { PageSuspenseFallback } from "@components/feadback";

const MainLayout = lazy(() => import("../Layouts/MainLayout/MainLayout"));
const About = lazy(() => import("@pages/about"));
const Categories = lazy(() => import("@pages/categories"));
const Home = lazy(() => import("@pages/home"));
const Cart = lazy(() => import("@pages/Cart"));
const Product = lazy(() => import("@pages/product"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const WishLists = lazy(() => import("@pages/WishList"));
const Profile = lazy(() => import("@pages/Profile"));

import ProtectedRoute from "@components/Auth/ProtectedRoute";

import ErrorPage from "@pages/ErrorPage";
import { LottieHandler } from "@components/feadback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: "10%" }}>
            <LottieHandler type="loading" message="loading please wait..." />
          </div>
        }>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        index: true,
        element: (
          <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageSuspenseFallback>
            <Cart />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PageSuspenseFallback>
            <WishLists />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "about-us",
        element: (
          <PageSuspenseFallback>
            <About />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "profile",
        element: (
          <PageSuspenseFallback>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </PageSuspenseFallback>
        ),
      },
      {
        path: "categories/product/:prefix",
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
