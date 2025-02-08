/* eslint-disable no-constant-binary-expression */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Product from "../Product/Product";
import { Helmet } from "react-helmet";
import img from "../../assets/favicon-8OdaHze_.png";
import { AnimatePresence, motion } from "framer-motion";
import DefaultLoader from "../DefaultLoader/DefaultLoader";

function Products() {
  // const [isOpen, setIsOpen] = useState(false);
  const inp = useRef();
  const [products, setProducts] = useState([]);
  const [emptyProductFilter, setEmptyProductFilter] = useState(false);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  const [productFilter, setProductFilter] = useState(null);
  // const [stateFilter, setStateFilter] = useState("");
  // انا عاملها كدا عشان عارف انهم 2 بس
  const [page, setPage] = useState(1);
  const [metaData, setMetaData] = useState({});

  async function getProducts() {
    const url = `https://ecommerce.routemisr.com/api/v1/products/?page=${page}&limit=20`;
    try {
      setLoader(true);
      const { data } = await axios.get(url);
      // console.log(data);
      setMetaData(data.metadata);
      setProducts(data.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setProducts([]);
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    getProducts();
  }, [page]);

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= metaData?.numberOfPages) {
      setLoader(true);
      setPage(newPage);
    }
  }
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

      {loader && (
        <div className="h-screen w-full flex items-center justify-center ">
          <DefaultLoader />
          {/* <i className="text-7xl text-green-500 fas fa-spin fa-spinner"></i> */}
        </div>
      )}
      <>
        <div className="mb-5 flex flex-wrap justify-center gap-3 items-center ">
          <div className="px-3 w-full sm:w-1/2 mt-3">
            <input
              onInput={(e) => {
                filterProductsByName(e);
              }}
              ref={inp}
              className="border-[2px] rounded-2xl w-full border-green-600 outline-none shadow-none ring-0 focus:outline-none focus:ring-0 focus:border-green-600"
              type="text"
              placeholder="search by name..."
            />
          </div>
        </div>
        <div className="row justify-center min-h-[50vh]   ">
          {/* loader */}

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
        <div className="flex items-center justify-center gap-4">
          <button
            className={`btn disabled:cursor-not-allowed ${page === 1 ? "opacity-50" : ""}`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          {[...Array(metaData?.numberOfPages)].map((_, index) => (
            <button
              className={`btn disabled:cursor-not-allowed ${
                page === index + 1 ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`btn disabled:cursor-not-allowed ${
              page === metaData?.numberOfPages ? "opacity-50" : ""
            }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === metaData?.numberOfPages}
          >
            Next
          </button>
        </div>
      </>
    </>
  );
}

export default Products;
