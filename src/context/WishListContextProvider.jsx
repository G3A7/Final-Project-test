/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import { tokenContext } from "./TokenContextProvider";

export const wishListContext = createContext();
function WishListContextProvider({ children }) {
  const [productsInWishList, setProductsInWishList] = useState(
    JSON.parse(localStorage.getItem("fav"))
  );
  const [loaderFav, setLoaderFav] = useState(false);
  const [facLength, setFavLength] = useState(
    localStorage.getItem("fav") ? JSON.parse(localStorage.getItem("fav"))?.length : 0
  );
  //  عشان ال loader بتاع ال heart
  //   useEffect(() => {
  //     getAllWishList();
  //   }, []);

  const { token } = useContext(tokenContext);
  const url = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const headers = {
    token,
  };

  // add
  async function AddToWishList(productId) {
    try {
      setLoaderFav(true);
      const findProductInWishList = productsInWishList?.find((e) => e == productId);
      //  let data ;
      if (findProductInWishList) {
        let { data } = await axios.delete(`${url}/${productId}`, { headers });
        setProductsInWishList(data.data);
        localStorage.setItem("fav", JSON.stringify(data.data));
        setFavLength(data.data.length);
        // console.log(data);
        return data;
      } else {
        let { data } = await axios.post(url, { productId }, { headers });
        setProductsInWishList(data.data);
        localStorage.setItem("fav", JSON.stringify(data.data));
        setFavLength(data.data.length);

        // console.log(data);
        return data;
      }
    } catch (error) {
      //   console.log(error);
      return error;
    } finally {
      setLoaderFav(false);
    }
  }

  // get
  async function getAllWishList() {
    try {
      setLoaderFav(true);
      const { data } = await axios.get(url, { headers });
      return data;
    } catch (error) {
      return error;
    } finally {
      setLoaderFav(false);
    }
  }

  return (
    <wishListContext.Provider
      value={{
        AddToWishList,
        productsInWishList,
        facLength,
        setLoaderFav,
        loaderFav,
        getAllWishList,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}

export default WishListContextProvider;
