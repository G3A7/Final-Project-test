import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout/Layout";
// import Home from "./components/Home/Home";
// import Products from "./components/Products/Products";
// import Brands from "./components/Brands/Brands";
// import Categories from "./components/Categories/Categories";
// import Login from "./components/Login/Login";
// import Register from "./components/Register/Register";
// import Cart from "./components/Cart/Cart";
// import NotFound from "./components/NotFound/NotFound";
import Error from "./components/Error/Error";
import TokenContextProvider from "./context/TokenContextProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./context/CartContextProvider";
// import Order from "./components/Order/Order";
// import WishList from "./components/WishList/WishList";
import WishListContextProvider from "./context/WishListContextProvider";
// import Checkout from "./components/Checkout/Checkout";
// import ForegetPass from "./components/ForegetPass/ForegetPass";
// import ResetCode from "./components/ResetCode/ResetCode";
// import ResetPassword from "./components/ResetPassword/ResetPassword";
// import Loader from "./components/Loader/Loader";

// import { HelmetProvider } from "react-helmet-async";
import { Offline } from "react-detect-offline";
import { lazy, Suspense } from "react";

// const Home = lazy(() => import("./components/Home/Home"));
// const Products = lazy(() => import("./components/Products/Products"));

const Home = lazy(() => import("./components/Home/Home"));
const Products = lazy(() => import("./components/Products/Products"));
const Checkout = lazy(() => import("./components/Checkout/Checkout"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const ProductDetails = lazy(() => import("./components/ProductDetails/ProductDetails"));
const WishList = lazy(() => import("./components/WishList/WishList"));
const Order = lazy(() => import("./components/Order/Order"));
const ForegetPass = lazy(() => import("./components/ForegetPass/ForegetPass"));
const ResetCode = lazy(() => import("./components/ResetCode/ResetCode"));
const ResetPassword = lazy(() => import("./components/ResetPassword/ResetPassword"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
import DefaultLoader from "../src/components/DefaultLoader/DefaultLoader";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     errorElement: <Error />,
  //     children: [
  //       {
  //         index: true,
  //         element: (
  //           <ProtectedRoute>
  //             {/* <Home /> */}
  //             <Suspense>
  //               <Home />
  //             </Suspense>
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/",
  //         element: (
  //           <ProtectedRoute>
  //             <Suspense>
  //               <Home />
  //             </Suspense>
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/products",
  //         element: (
  //           <ProtectedRoute>
  //             {/* <Products /> */}
  //             <Suspense>
  //               <Products />
  //             </Suspense>
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/checkout",
  //         element: (
  //           <ProtectedRoute>
  //             <Checkout />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/brands",
  //         element: <Brands />,
  //       },
  //       {
  //         path: "/category",
  //         element: (
  //           <ProtectedRoute>
  //             <Categories />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/login",
  //         element: <Login />,
  //       },
  //       {
  //         path: "/register",
  //         element: <Register />,
  //       },
  //       {
  //         path: "/cart",
  //         element: (
  //           <ProtectedRoute>
  //             <Cart />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/productsdetails/:id/:idC",
  //         element: (
  //           <ProtectedRoute>
  //             <ProductDetails />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/wishList",
  //         element: (
  //           <ProtectedRoute>
  //             <WishList />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/allorders",
  //         element: (
  //           <ProtectedRoute>
  //             <Order />
  //           </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/forgetpass",
  //         element: (
  //           // <ProtectedRoute>
  //           <ForegetPass />
  //           // </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/resetCode",
  //         element: (
  //           // <ProtectedRoute>
  //           <ResetCode />
  //           // </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "/resetPass",
  //         element: (
  //           // <ProtectedRoute>
  //           <ResetPassword />
  //           // </ProtectedRoute>
  //         ),
  //       },
  //       {
  //         path: "*",
  //         element: <NotFound />,
  //       },
  //     ],
  //   },
  // ]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Suspense fallback={<DefaultLoader />}>
                <Home />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Suspense>
                <Products />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Suspense>
                <Checkout />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <Suspense>
              <Brands />
            </Suspense>
          ),
        },
        {
          path: "/category",
          element: (
            <ProtectedRoute>
              <Suspense>
                <Categories />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Suspense>
                <Cart />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/productsdetails/:id/:idC",
          element: (
            <ProtectedRoute>
              <Suspense>
                <ProductDetails />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishList",
          element: (
            <ProtectedRoute>
              <Suspense>
                <WishList />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <Suspense>
                <Order />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/forgetpass",
          element: (
            <Suspense>
              <ForegetPass />
            </Suspense>
          ),
        },
        {
          path: "/resetCode",
          element: (
            <Suspense>
              <ResetCode />
            </Suspense>
          ),
        },
        {
          path: "/resetPass",
          element: (
            <Suspense>
              <ResetPassword />
            </Suspense>
          ),
        },
        {
          path: "*",
          element: (
            <Suspense>
              <NotFound />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <TokenContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <Offline>
            <div
              className="fixed bottom-0 right-[15px] z-40 p-4 mb-4 text-sm text-white rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              You Offline 🥱
            </div>
          </Offline>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
          </QueryClientProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  );
}

export default App;
