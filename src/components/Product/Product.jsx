import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContextProvider";
import toast from "react-hot-toast";
import { wishListContext } from "../../context/WishListContextProvider";
// import { tokenContext } from "../../context/TokenContextProvider";
import { motion } from "framer-motion";

/* eslint-disable react/prop-types */
function Product({ product }) {
  // const { token } = useContext(tokenContext);
  const { addToCart } = useContext(cartContext);
  const { AddToWishList, productsInWishList } = useContext(wishListContext);
  const [loader, setLoader] = useState(false);
  const [loaderWishList, setLoaderWishList] = useState(false);
  async function addToCartProduct(id) {
    const dataPromis = addToCart(id);
    toast.promise(
      dataPromis,
      {
        loading: "Loading",
        error: "Error",
        success: "Product added successfully to your cart ",
      },
      {
        position: "top-center",
      }
    );
    try {
      setLoader(true);
      const data = await dataPromis;
      if (data.status == "success") {
        // toast.success(data.message, {
        //   position: "top-center",
        //   style: {
        //     background: "#333",
        //     color: "#fff",
        //   },
        // });
        setLoader(null);
      }
      // else {
      //   throw new Error(data.respomse.data.message);
      // }
    } catch (error) {
      console.log(error);
      toast.error("Product not added  to your cart", {
        position: "top-center",
      });
    } finally {
      setLoader(null);
    }
  }

  async function addProductToWishList(id) {
    const productToWishListPromise = AddToWishList(id);

    toast.promise(
      productToWishListPromise,
      {
        loading: "Loading",
        success: (data) => `${data.message} ${data.message.includes("removed") ? "💔" : "❤"}`,
        error: "Error",
      },
      {
        position: "top-center",
      }
    );

    try {
      setLoaderWishList(true);
      // AddToWishList(id)
      await productToWishListPromise;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoaderWishList(false);
    }
  }
  //   عشان اول لما يفتح الموقع تجبله ال كام حاجه في ال cart
  // async function getCartProducts() {
  //   try {
  //     const data = await getAllProductToCart();
  //     setNumOfCartItems(data.numOfCartItems);
  //     localStorage.setItem("numOfCartItems", JSON.stringify(data.numOfCartItems));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   token && getCartProducts();
  // }, [token]);

  return (
    //             px-4 | p-2
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className=" p-2 shadow-lg  dark:bg-slate-800    group/parent rounded-md relative">
        <div className=" z-[6] group-hover/parent:opacity-100 group-hover/parent:visible  invisible  group-hover/parent:left-0 transition-all absolute flex flex-col w-[50px] min-h-[35%] bg-white opacity-0 shadow-md top-[15px] left-[-50px] text-center">
          <div
            className="cursor-pointer mt-5"
            onClick={() => {
              if (!loaderWishList) {
                addProductToWishList(product.id);
              }
            }}
          >
            {loaderWishList ? (
              <i className="fas fa-spin fa-spinner"></i>
            ) : (
              <i
                className={`fa-solid text-xl ${
                  productsInWishList?.find((e) => e == product.id)
                    ? "text-red-700"
                    : "text-green-600"
                }  fa-heart ${productsInWishList?.find((e) => e == product.id) ? null : "fa-beat"}`}
              ></i>
            )}
          </div>
          <Link title="details" to={`/productsdetails/${product.id}/${product.category._id}`}>
            <div className="cursor-pointer mt-6">
              <i className="fa-solid text-xl text-green-600 fa-eye"></i>
            </div>
          </Link>
          <div
            className="cursor-pointer mt-6 mb-2"
            onClick={() => {
              if (!loader) {
                addToCartProduct(product.id);
              }
            }}
          >
            {loader ? (
              <i className="fas fa-spin fa-spinner text-green-600"></i>
            ) : (
              <i className={`fa-solid text-xl  fa-beat text-green-600 fa-cart-plus`}></i>
            )}
          </div>
        </div>
        <div className="mb-2 overflow-hidden">
          <img
            src={product.imageCover}
            alt=""
            className="w-full hover:scale-[1.1] transition-all  object-cover block"
          />
        </div>
        <h3 className="text-green-600">{product.category.name}</h3>
        <Link to={`/productsdetails/${product.id}/${product.category._id}`}>
          <h4 className="truncate font-semibold text-lg dark:text-white">{product.title}</h4>
        </Link>
        <div className="mt-3 flex justify-between items-center text-gray-500 font-medium">
          <span>{product.price} EGP</span>
          <p>
            <i className="fa-solid fa-star text-yellow-300"></i> {product.ratingsAverage}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Product;
