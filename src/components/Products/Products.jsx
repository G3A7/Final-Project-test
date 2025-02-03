/* eslint-disable no-constant-binary-expression */
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../Product/Product";

function Products() {
  // const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [emptyProductFilter, setEmptyProductFilter] = useState(false);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  const [productFilter, setProductFilter] = useState(null);
  // const [stateFilter, setStateFilter] = useState("");
  // const [page, setPage] = useState(1);

  async function getProducts() {
    const url = `https://ecommerce.routemisr.com/api/v1/products/`;
    try {
      setLoader(true);
      const { data } = await axios.get(url);
      console.log(data);
      setProducts(data.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setProducts([]);
    } finally {
      setLoader(null);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  function filterProductsByName(inp) {
    // console.log(products);
    let productsClone = structuredClone(products);
    // console.log(inp.target.value);
    if (inp.target.value.length > 0) {
      productsClone = productsClone.filter((e) => {
        // console.log(e.title.toLowerCase() == inp.target.value.toLowerCase());
        return e.title.toLowerCase().includes(inp.target.value.toLowerCase());
      });
      if (!productsClone.length) {
        setEmptyProductFilter(true);
      } else {
        setEmptyProductFilter(false);
      }
      setProductFilter(productsClone);
    } else {
      setProductFilter(null);
      setEmptyProductFilter(false);
    }

    // console.log(productsClone);
    // if (productsClone.length == 0) {
    //   setEmptyProductFilter(true);
    //   setProductFilter(null);
    // } else {
    //   setEmptyProductFilter(false);
    //   setProductFilter(productsClone);
    // }
  }

  return (
    <>
      {/* <h1 className="text-2xl ps-4 font-semibold">Recent Products</h1>  bg-slate-800*/}
      <div className="mb-5 flex flex-wrap justify-center gap-3 items-center ">
        <div className="px-3 w-full sm:w-1/2">
          <input
            onInput={(e) => {
              filterProductsByName(e);
            }}
            className="border-[2px] rounded-md w-full border-green-600 outline-none shadow-none ring-0 focus:outline-none focus:ring-0 focus:border-green-600"
            type="text"
            placeholder="search by name..."
          />
        </div>
        {/* <div className="">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="button"
          >
            Filter
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className="z-10 hidden bg-slate-900 divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-50 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <button
                  onClick={() => {
                    setStateFilter("price");
                  }}
                  className="block w-full x-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sort By Lowest Price
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setStateFilter("?sort=-price");
                  }}
                  className="block w-full px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sort By Highest Price
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setStateFilter("");
                  }}
                  className="block w-full x-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Show All Products
                </button>
              </li>
            </ul>
          </div>
        </div> */}

        {/* <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="button"
          >
            Filter
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-12 left-0 z-10 bg-slate-900 divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-50 dark:text-gray-200">
                <li>
                  <button
                    onClick={() => {
                      setStateFilter("price");
                     
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sort By Lowest Price
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setStateFilter("-price");
                     
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sort By Highest Price
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setStateFilter("");
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Show All Products
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div> */}

      </div>
      <div className="row justify-center min-h-[50vh]  ">
        {loader && (
          <div className="h-screen w-full flex items-center justify-center ">
            <i className="text-7xl text-green-500 fas fa-spin fa-spinner"></i>
          </div>
        )}
        {error ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        ) : emptyProductFilter ? (
          <div
            className="p-4 mb-4 h-[50px]  w-full text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            No Products with this Name 🙄
          </div>
        ) : (
          (productFilter || products)?.map((e) => {
            return <Product key={e.id} product={e} />;
          })
        )}
      </div>

      {/* <div className="flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => {
            setPage(1);
          }}
          className="btn disabled:cursor-not-allowed"
        >
         <i className="fa-solid  -rotate-90 fa-caret-up"></i>
        </button>
        <button
          disabled={page == 2}
          onClick={() => {
            setPage(2);
          }}
          className="btn disabled:cursor-not-allowed"
        >
          <i className="fa-solid  rotate-90 fa-caret-up"></i>
        </button>
      </div> */}
    </>
  );
}

export default Products;
