import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import Error from "./components/Error/Error";
import TokenContextProvider from "./context/TokenContextProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./context/CartContextProvider";
import Order from "./components/Order/Order";
import WishList from "./components/WishList/WishList";
import WishListContextProvider from "./context/WishListContextProvider";
import Checkout from "./components/Checkout/Checkout";
import ForegetPass from "./components/ForegetPass/ForegetPass";
import ResetCode from "./components/ResetCode/ResetCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
function App() {
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
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: <Brands />,
        },
        {
          path: "/category",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productsdetails/:id/:idC",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/wishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
        },
        {
          path: "/forgetpass",
          element: (
            // <ProtectedRoute>
            <ForegetPass />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/resetCode",
          element: (
            // <ProtectedRoute>
            <ResetCode />
            // </ProtectedRoute>
          ),
        },
        {
          path: "/resetPass",
          element: (
            // <ProtectedRoute>
            <ResetPassword />
            // </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <TokenContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={router} />
          <Toaster />
        </WishListContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  );
}

export default App;
