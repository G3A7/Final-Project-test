import axios from "axios";
// import img from "../../assets/PngItem_4021982.png";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import { cartContext } from "../../context/CartContextProvider";
import toast from "react-hot-toast";

function ProductDetails() {
  const { addToCart } = useContext(cartContext);
  const [loaderToCart, setLoaderToCart] = useState(false);
  async function addToCartProduct(id) {
    const dataPromis = addToCart(id);
    toast.promise(
      dataPromis,
      {
        loading: "Loading",
        success: "Product added successfully to your cart",
        error: "Error",
      },
      {
        position: "top-center",
      }
    );
    try {
      setLoaderToCart(true);
      const data = await dataPromis;
      if (data.status == "success") {
        // toast.success(data.message, {
        //   position: "top-center",
        //   style: {
        //     background: "#333",
        //     color: "#fff",
        //   },
        // });
        setLoaderToCart(null);
      } else {
        toast.error("Product not added  to your cart", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Product not added  to your cart", {
        position: "top-center",
      });
    } finally {
      setLoaderToCart(null);
    }
  }

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    cssEase: "linear",
    autoplaySpeed: 1000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState();
  const url = `https://ecommerce.routemisr.com/api/v1/products/`;
  async function getSpecificproduct() {
    try {
      setLoader(true);
      const { data } = await axios.get(`${url}${id}`);
      // console.log(data.data);
      setProduct(data.data);
      setLoader(null);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setProduct([]);
    } finally {
      setLoader(null);
    }
  }
  useEffect(() => {
    getSpecificproduct();
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold ps-4 mb-5"> Products Details</h1>
        {/* {loader && (
          <div className="h-[300px] w-full bg-slate-800  flex items-center justify-center ">
            <i className="text-7xl text-green-500 fas fa-spin fa-spinner"></i>
          </div>
        )} */}
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
        ) : (
          product && (
            <div className="row items-center ">
              <div className="w-full mb-5 md:mb-0 md:w-4/12">
                <Slider {...settings}>
                  {product?.images?.map((src, i) => {
                    return (
                      <div key={i}>
                        <img src={src} alt="" className="w-full object-cover" />
                      </div>
                    );
                  })}
                </Slider>
                {/* <img src={product?.imageCover} alt="" className="w-full" /> */}
              </div>

              <div className="w-full md:w-8/12   md:ps-[50px]">
                <h3 className="mb-2 font-semibold text-lg">{product?.title}</h3>
                <p className="text-gray-600">{product?.description}</p>
                <h2 className="mb-2 font-medium">{product?.category.name}</h2>
                <div className="mb-2 flex justify-between items-center  font-medium">
                  <span>{product?.price} EGP</span>
                  <p className="pe-4">
                    <i className="fa-solid fa-star text-yellow-300"></i> {product?.ratingsAverage}
                  </p>
                </div>
                <button
                  onClick={() => {
                    addToCartProduct(product?.id);
                  }}
                  disabled={loaderToCart ? true : false}
                  className={`btn w-full ${loaderToCart ? "cursor-not-allowed" : ""} `}
                >
                  {loaderToCart ? (
                    <i className="fas fa-spin fa-spinner text-white text-lg"></i>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <RelatedProducts />
    </>
  );
}

export default ProductDetails;
