import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContextProvider";
import img from "../../assets/PngItem_4021982.png";
import { tokenContext } from "../../context/TokenContextProvider";
import toast from "react-hot-toast";

function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const [loader, setLoader] = useState(true);
  const [loaderIcon, setLoaderIcon] = useState({});
  const [error, setError] = useState(null);
  const { getAllProductToCart, DeleteProduct, setNumOfCartItems, setLoaderIconForNav } =
    useContext(cartContext);
  const { token } = useContext(tokenContext);
  async function getCartProducts() {
    try {
      setLoader(true);
      const data = await getAllProductToCart();
      // console.log(data.data.products);
      setCartDetails(data.data.products.length ? data.data.products : null);
      setLoader(null);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoader(false);
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
      localStorage.setItem("numOfCartItems", JSON.stringify(data.numOfCartItems));
    } catch (error) {
      console.log(error);
    } finally {
      // setLoaderIcon(false);
      setLoaderIcon((items) => ({ ...items, [id]: false }));
      setLoaderIconForNav(false);
    }
  }

  // tricks
  useEffect(() => {
    token && getCartProducts();
  }, [token]);

  return (
    <>
      <h1 className="text-2xl font-bold  mb-5">Shoping Cart</h1>
      {loader ? (
        error ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        ) : (
          <div className="h-[300px] w-full   flex items-center justify-center ">
            <i className="text-7xl text-green-500 fas fa-spin fa-spinner"></i>
          </div>
        )
      ) : cartDetails ? (
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
                          <button
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
                          <div>
                            <span>{product.count}</span>
                          </div>
                          <button
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
      ) : (
        <h1 className="bg-red-800 text-center text-white text-3xl">No Data</h1>
      )}
    </>
  );
}

export default Cart;
