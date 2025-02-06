/* eslint-disable no-constant-binary-expression */
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../Product/Product";
import { Helmet } from "react-helmet";
import img from "../../assets/favicon-8OdaHze_.png";
import { AnimatePresence, motion } from "framer-motion";

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
      // console.log(data);
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
      {location.href.includes("/products") ? (
        <Helmet>
          <title>Products</title>
          <meta name="description" content="Fresh Cart Products" />
          <link rel="icon" href={img} type="image/png" />
        </Helmet>
      ) : (
        ""
      )}
      {/* {loader && (
        <div className="h-screen w-full flex items-center justify-center ">
          <i className="text-7xl text-green-500 fas fa-spin fa-spinner"></i>
        </div>
      )} */}
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
      </div>
      <div className="row justify-center min-h-[50vh]  ">
        {/* loader */}
        {loader && (
          <div className="h-screen w-full flex items-center justify-center ">
            <i className="text-7xl text-green-500 fas fa-spin fa-spinner"></i>
          </div>
        )}
        {/* /loader */}
        <AnimatePresence>
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
              return (
                <motion.div
                  className="p-2 w-full sm:w-6/12 md:w-4/12 lg:w-3/12"
                  key={e.id + (productFilter ? "filtered" : "")}
                >
                  <Product product={e} />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
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
