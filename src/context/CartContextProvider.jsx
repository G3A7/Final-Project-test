/* eslint-disable no-useless-catch */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { tokenContext } from "./TokenContextProvider";
// import { data } from "react-router-dom";
// import toast from "react-hot-toast";
export const cartContext = createContext("");

function CartContextProvider({ children }) {
  const [loaderIconForNav, setLoaderIconForNav] = useState(false);
  const [cartId, setCartId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(
    localStorage.getItem("numOfCartItems") ? localStorage.getItem("numOfCartItems") : 0
  );

  // all logic cart.
  const { token } = useContext(tokenContext);
  const url = `https://ecommerce.routemisr.com/api/v1/cart`;
  const headers = {
    token,
  };

  async function handlePayment(shippingAddress) {
    try {
      setLoaderIconForNav(true);
      console.log(shippingAddress);
      if (!shippingAddress) {
        throw new Error("erororororo");
      }
      // https://ecommerce.routemisr.com/api/v1/orders/${cartId}
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      );

      setNumOfCartItems(0);
      localStorage.setItem("numOfCartItems", JSON.stringify(0));

      return data;
    } catch (error) {
      // console.log(error);
      throw error;
    } finally {
      setLoaderIconForNav(false);
    }
  }

  async function addToCart(productId) {
    try {
      setLoaderIconForNav(true);
      const { data } = await axios.post(
        url,
        {
          productId,
        },
        {
          headers,
        }
      );
      setNumOfCartItems(data.numOfCartItems);
      localStorage.setItem("numOfCartItems", JSON.stringify(data.numOfCartItems));

      return data;
    } catch (error) {
      console.log(error);

      throw error;
      // the old . 😎
      // return error;
    } finally {
      setLoaderIconForNav(false);
    }
  }

  async function getAllProductToCart() {
    try {
      const { data } = await axios.get(url, { headers });
      setCartId(data.cartId);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
      // the old .
      // return error;
    }
  }

  async function DeleteProduct(productId) {
    try {
      const { data } = await axios.delete(`${url}/${productId}`, {
        headers,
      });
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
      // return data;
    }
  }

  async function updateCountProduct(id, count) {
    try {
      const { data } = await axios.put(
        `${url}/${id}`,
        { count },
        {
          headers,
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
      // return error;
    }
  }

  async function deleteAllProductsInCart() {
    try {
      const { data } = await axios.delete(url, { headers });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
      // return error;
    }
  }

  return (
    <cartContext.Provider
      value={{
        setNumOfCartItems,
        numOfCartItems,
        addToCart,
        getAllProductToCart,
        DeleteProduct,
        setLoaderIconForNav,
        loaderIconForNav,
        updateCountProduct,
        deleteAllProductsInCart,
        handlePayment,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;
