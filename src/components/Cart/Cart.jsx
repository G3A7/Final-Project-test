import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContextProvider";
// import img from "../../assets/PngItem_4021982.png";
import imgEmptyCart from "../../assets/Animation - 1734929112513-CPg75eUg.gif";
import { tokenContext } from "../../context/TokenContextProvider";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import img from "../../assets/favicon-8OdaHze_.png";
import ConfirmModal from "../Dialog/ConfirmModal";

function Cart() {
  // const [deleteOk, setDeleteOk] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loader, setLoader] = useState(true);
  const [loaderUpdate, setLoaderUpdate] = useState({});
  const [loaderIcon, setLoaderIcon] = useState({});
  const [error, setError] = useState(null);
  // const [count, setCount] = useState(0);
  const {
    getAllProductToCart,
    DeleteProduct,
    setNumOfCartItems,
    setLoaderIconForNav,
    updateCountProduct,
    deleteAllProductsInCart,
  } = useContext(cartContext);
  const { token } = useContext(tokenContext);
  async function getCartProducts() {
    try {
      setLoaderIconForNav(true);
      setLoader(true);
      const data = await getAllProductToCart();
      // console.log(data.data);
      setTotalPrice(data.data.totalCartPrice);
      // console.log(totalPrice);
      setCartDetails(data.data.products.length ? data.data.products : null);
      setNumOfCartItems(data.numOfCartItems);
      localStorage.setItem("numOfCartItems", JSON.stringify(data.numOfCartItems));
      setLoader(null);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoader(false);
      setLoaderIconForNav(false);
    }
  }

  async function DeleteProductFromCart(id) {
    const dataPomise = DeleteProduct(id);
    toast.promise(
      dataPomise,
      {
        loading: "Loading",
        success: "remove Successfuly ✔",
        error: "Error",
      },
      {
        position: "top-center",
      }
    );

    try {
      // setLoaderIcon(true);
      setLoaderIconForNav(true);
      setLoaderIcon((items) => ({ ...items, [id]: true }));
      const data = await dataPomise;
      setCartDetails(data.data.products.length ? data.data.products : null);
      // setCartDetails(data.data.products);
      // setLoaderIcon(false);
      // console.log(data.numOfCartItems);
      setNumOfCartItems(data.numOfCartItems);
      setTotalPrice(data.data.totalCartPrice);
      localStorage.setItem("numOfCartItems", JSON.stringify(data.numOfCartItems));
    } catch (error) {
      console.log(error);
    } finally {
      // setLoaderIcon(false);
      setLoaderIcon((items) => ({ ...items, [id]: false }));
      setLoaderIconForNav(false);
    }
  }

  async function updateCountToProduct(id, count, plus) {
    const updatePromise = updateCountProduct(id, count);
    toast.promise(
      updatePromise,
      {
        loading: "Loading",
        success: "Successfuly ✔",
        error: "Error",
      },
      {
        position: "top-center",
      }
    );
    try {
      // triks 😎
      setLoaderUpdate((prev) => ({ ...prev, [id]: true, [plus]: true }));
      const data = await updatePromise;
      // console.log(data.data.products);
      if (data.data.products.length == 0) {
        localStorage.setItem("numOfCartItems", 0);
        setNumOfCartItems(0);
      }
      setCartDetails(data.data.products.length ? data.data.products : null);
      setTotalPrice(data.data.totalCartPrice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderUpdate((prev) => ({ ...prev, [id]: false, [plus]: false }));
    }
  }

  async function deleteProducts() {
    const deletePromise = deleteAllProductsInCart();
    toast.promise(
      deletePromise,
      {
        loading: "Loading",
        success: "Successfuly ✔",
        error: "Error",
      },
      {
        position: "top-center",
      }
    );
    try {
      const data = await deletePromise;
      if (data.message == "success") {
        setNumOfCartItems(0);
        localStorage.setItem("numOfCartItems", 0);
        setCartDetails(null);
        setTotalPrice(0);
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  // tricks
  useEffect(() => {
    token && getCartProducts();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>cart</title>
        <meta name="description" content="Fresh Cart Cart" />
        <link rel="icon" href={img} type="image/png" />
      </Helmet>
      <h1 className="text-2xl font-bold text-green-500 mb-5">
        <i className="fa-solid fa-cart-plus animate-bounce"></i> Shoping Cart
      </h1>
      {loader ? (
        <div className="h-[300px] w-full   flex items-center justify-center ">
          <i className="text-7xl text-green-500 fas fa-spin fa-spinner"></i>
        </div>
      ) : error ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {error}
        </div>
      ) : !cartDetails ? (
        <>
          <div className="bg-navbar-bg dark:text-white dark:bg-slate-800 p-5 flex flex-col min-h-[50vh] items-center justify-center space-y-3">
            <img src={imgEmptyCart} alt="" />
            <p className="w-full text-center font-semibold text-lg">
              <span className="text-green-700 font-bold"> Oops!</span> Your wishlist is empty. Start
              adding products you love by clicking the button below!
            </p>
            <Link className="btn text-lg text-center font-semibold" to="/">
              Back To Home
            </Link>
          </div>
        </>
      ) : cartDetails ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16  py-3">
                    {/* <span className="sr-only">Image</span> */}
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartDetails &&
                  cartDetails.map((product) => {
                    return (
                      <tr
                        key={product.product.id}
                        className="bg-white text-center border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4 ">
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.product.title.length > 30
                            ? product.product.title.slice(0, 40) + "..."
                            : product.product.title}
                        </td>
                        <td className="px-6 py-4 ">
                          <div className="flex items-center justify-center">
                            {loaderUpdate[product.product.id] && loaderUpdate["menus"] ? (
                              <i className="fas fa-spin fa-spinner text-green-600 me-5"></i>
                            ) : (
                              product.count != 1 && (
                                <button
                                  onClick={() => {
                                    updateCountToProduct(
                                      product.product.id,
                                      product.count - 1,
                                      "menus"
                                    );
                                  }}
                                  className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                  type="button"
                                >
                                  <span className="sr-only">Quantity button</span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 2"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M1 1h16"
                                    />
                                  </svg>
                                </button>
                              )
                            )}
                            <div>
                              <span>{product.count}</span>
                            </div>
                            {loaderUpdate[product.product.id] && loaderUpdate["plus"] ? (
                              <i className="fas ms-2 text-green-600 fa-spin fa-spinner"></i>
                            ) : (
                              product.count < 10 && (
                                <button
                                  onClick={() => {
                                    updateCountToProduct(
                                      product.product.id,
                                      product.count + 1,
                                      "plus"
                                    );
                                  }}
                                  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                  type="button"
                                >
                                  <span className="sr-only">Quantity button</span>
                                  <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 18 18"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 1v16M1 9h16"
                                    />
                                  </svg>
                                </button>
                              )
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {product.price * product.count} EGP
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            disabled={loaderIcon[product.product.id] ? true : false}
                            onClick={() => {
                              DeleteProductFromCart(product.product.id);
                            }}
                            className="font-medium   text-red-600 dark:text-red-500 "
                          >
                            {loaderIcon[product.product.id] ? (
                              <i className="fas fa-spin fa-spinner"></i>
                            ) : (
                              <i className="fas fa-trash-can text-2xl"></i>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-wrap px-2 mt-5 justify-between items-center">
            <div>
              {/* <button
                onClick={() => {
                  // setModel(!model);
                  deleteProducts();
                }}
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="btn bg-red-700 w-fit hover:bg-red-600 "
              >
                Clear
              </button> */}

              <ConfirmModal deleteProducts={deleteProducts} />
              <Link to={"/checkout"} className="btn ms-3">
                Check Out
              </Link>
            </div>
            <div className="text-xl font-mono dark:text-white">
              Total Price <span className="font-bold text-red-600   text-2xl">{totalPrice}</span> EGP
            </div>
          </div>
          {/*
          modal 
          <div>
            <div
              id="popup-modal"
              // data-modal-backdrop="static"
              tabIndex={-1}
              className={`${
                model ? "flex" : "hidden"
              } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg
                      className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this product?
                    </h3>
                    <button
                      onClick={() => {
                        deleteProducts();
                      }}
                      data-modal-hide="popup-modal"
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </>
      ) : (
        <h1 className="bg-red-800 text-center text-white text-3xl">No Data</h1>
      )}
    </>
  );
}

export default Cart;
