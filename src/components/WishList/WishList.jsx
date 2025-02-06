import { useContext, useEffect, useState } from "react";
import { wishListContext } from "../../context/WishListContextProvider";
// import img from "../../assets/PngItem_4021982.png";
// import img from "../../assets/freshcart-logo.svg";
import ingEmptyFav from "../../assets/Animation - 1734995792926-BDjvBpLc.gif";
import { tokenContext } from "../../context/TokenContextProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { cartContext } from "../../context/CartContextProvider";
import { Helmet } from "react-helmet";

function WishList() {
  const { getAllWishList, deleteProductFromWishList, setProductsInWishList } =
    useContext(wishListContext);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [loaderIcon, setLoaderIcon] = useState({});
  const [productsWishlist, setProductsWishlistLocal] = useState([]);
  const [loaderIconCart, setLoaderIconCart] = useState({});
  const { token } = useContext(tokenContext);
  const { addToCart } = useContext(cartContext);

  async function getAll() {
    try {
      setLoading(true);
      const data = await getAllWishList();
      setProductsWishlistLocal(data.data);
      // console.log(data.data);
      // console.log(productsWishlist);
      setError(null);
    } catch (error) {
      setError("Errro");
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(null);
    }
  }

  // عملتي دي عشان ميحضلش reload كامل علي الصفحه .
  async function getAllAfetrDelete() {
    try {
      // setLoading(true);
      const data = await getAllWishList();
      setProductsWishlistLocal(data.data);
      // console.log(data.data);
      // console.log(productsWishlist);
      setError(null);
    } catch (error) {
      setError("Errro");
      console.log(error?.response?.data?.message);
    }
  }

  async function addToCartFromWishList(id) {
    const dataPromise = addToCart(id);

    toast.promise(
      dataPromise,
      {
        loading: "Loading",
        success: (data) => `${data.message}`,
        // <div  className="flex flex-col items-center justify-center">
        //   {data.message}
        //   <div>
        //     <i className={`fa-solid fa-cart-plus text-xl text-green-600 `}></i>
        //   </div>
        // </div>
        error: "Error",
      },
      {
        position: "top-center",
      }
    );

    try {
      setLoaderIconCart((prev) => ({ ...prev, [id]: true }));
      const data = await dataPromise;
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderIconCart((prev) => ({ ...prev, [id]: false }));
    }
  }

  async function deleteProduct(id) {
    const dataPromise = deleteProductFromWishList(id);
    toast.promise(
      dataPromise,
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
      setLoaderIcon((prev) => ({ ...prev, [id]: true }));
      const data = await dataPromise;
      await getAllAfetrDelete();
      setProductsInWishList(data.data);
      localStorage.setItem("fav", JSON.stringify(data.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderIcon((prev) => ({ ...prev, [id]: false }));
    }
  }

  //tricks
  useEffect(() => {
    token && getAll();
  }, [token]);

  return (
    <div className="">
      <Helmet>
        <title>WishList</title>
        <meta name="description" content="Fresh Cart Products" />
      </Helmet>
      <h1 className="text-2xl font-bold text-green-500 ms-4">
        {/* <i class="fa-solid fa-heart"></i> */}
        My WishList <i className="fas fa-heart fa-beat text-2xl text-green-600"></i>
      </h1>
      {/*  Wiash List  UI */}
      <section className=" p-5">
        <div className="container">
          {loading ? (
            <div className="h-[350px] flex justify-center items-center">
              <i className="fas fa-spin fa-spinner text-6xl text-green-600"> </i>
            </div>
          ) : Error ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {Error}
            </div>
          ) : productsWishlist?.length == 0 ? (
            <div className="bg-navbar-bg p-5 flex flex-col min-h-[50vh] items-center justify-center space-y-3">
              <img src={ingEmptyFav} alt="" />
              <p className="w-full text-center font-semibold text-lg">
                <span className="text-green-700 font-bold"> Oops!</span> Your wishlist is empty.
                Start adding products you love by clicking the button below!
              </p>
              <Link className="btn text-lg text-center font-semibold" to="/">
                Back To Home
              </Link>
            </div>
          ) : (
            productsWishlist &&
            productsWishlist?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex flex-wrap border-[2px] border-green-600 rounded-md justify-between items-center p-5 mb-5  shadow-lg"
                >
                  <div className="flex items-center justify-center gap-4 ">
                    <div className="size-[150px] shadow-md">
                      <img src={product.imageCover} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-green-600">
                        {product.title.slice(0, 20) + "..."}
                      </h2>
                      <p className="text-lg font-medium text-green-600">
                        <span className="text-xl">{product.price}</span> EGP
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center w-full sm:w-auto mt-5 sm:mt-0 justify-between sm:justify-normal">
                    <div
                      onClick={() => {
                        if (!loaderIcon[product.id]) deleteProduct(product.id);
                      }}
                    >
                      {loaderIcon[product.id] ? (
                        <i className="fas fa-spin text-red-600 fa-spinner"></i>
                      ) : (
                        <i className="fas fa-trash-can text-xl text-red-600 cursor-pointer"></i>
                      )}
                    </div>
                    <button
                      disabled={loaderIconCart[product.id] || false}
                      onClick={() => {
                        if (!loaderIconCart[product.id]) addToCartFromWishList(product.id);
                      }}
                      className={`btn ms-5 text-xl ${
                        loaderIconCart[product.id] ? "cursor-not-allowed" : null
                      }`}
                    >
                      {loaderIconCart[product.id] ? (
                        <i className="fas fa-spin fa-spinner me-2"></i>
                      ) : (
                        <i className={`fa-solid fa-cart-plus text-xl fa-beat me-2`}></i>
                      )}
                      Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

export default WishList;
