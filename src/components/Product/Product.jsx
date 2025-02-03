import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../context/CartContextProvider";
import toast from "react-hot-toast";
import { wishListContext } from "../../context/WishListContextProvider";
// import { tokenContext } from "../../context/TokenContextProvider";

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
      await AddToWishList(id);
    } catch (error) {
      console.log(error);
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
    <div className="p-2 w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
      <div className=" p-2 shadow-lg   group/parent rounded-md relative">
        <div className="group-hover/parent:opacity-100 group-hover/parent:visible  invisible  group-hover/parent:left-0 transition-all absolute flex flex-col w-[50px] h-[45%] bg-white opacity-0 shadow-md top-[15px] left-[-50px] text-center">
          <div
            className="cursor-pointer mt-6"
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
            className="cursor-pointer mt-6"
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
        <div className="mb-2">
          <img src={product.imageCover} alt="" className="w-full  object-cover block" />
        </div>
        <h3 className="text-green-600">{product.category.name}</h3>
        <h4 className="truncate font-semibold text-lg">{product.title}</h4>
        <div className="mt-3 flex justify-between items-center text-gray-500 font-medium">
          <span>{product.price} EGP</span>
          <p>
            <i className="fa-solid fa-star text-yellow-300"></i> {product.ratingsAverage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
