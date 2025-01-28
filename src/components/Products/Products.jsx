import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../Product/Product";

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  const url = `https://ecommerce.routemisr.com/api/v1/products/`;
  async function getProducts() {
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

  return (
    <>
      {/* <h1 className="text-2xl ps-4 font-semibold">Recent Products</h1>  bg-slate-800*/}
      <div className="row justify-center  ">
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
        ) : (
          products &&
          products?.map((e) => {
            return <Product key={e.id} product={e} />;
          })
        )}
      </div>
    </>
  );
}

export default Products;
