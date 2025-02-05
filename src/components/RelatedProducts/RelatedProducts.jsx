import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

function RelatedProducts() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const url = `https://ecommerce.routemisr.com/api/v1/products/`;
  const { idC } = useParams();
  async function getRelatedProducts() {
    try {
      setLoader(true);
      const { data } = await axios.get(url);
      setProducts(
        data.data.filter((e) => {
          return e.category._id == idC;
        })
      );
      setError(null);
      setLoader(null);
    } catch (error) {
      console.log(error);
      setProducts([]);
      setError(error.response.data.message);
    } finally {
      setLoader(null);
    }
  }
  useEffect(() => {
    getRelatedProducts();
  }, [idC]);
  return (
    <div>
      {/* <h1 className="text-2xl ps-4 font-semibold">Related Products</h1> */}
      <div className="row justify-center">
        {loader && (
          <div className="h-[300px] w-full flex items-center justify-center ">
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
    </div>
  );
}

export default RelatedProducts;
