import { useFormik } from "formik";
import { useContext } from "react";
import { cartContext } from "../../context/CartContextProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { handlePayment } = useContext(cartContext);
  const navigate = useNavigate();

  async function submitFn(vals) {
    const dataPromise = handlePayment(vals);
    toast.promise(
      dataPromise,
      {
        success: "Let's go sea orders 😘 '",
        error: "error",
        loading: "loading",
      },
      {
        position: "top-center",
        duration: 1000,
      }
    );
    try {
      const data = await dataPromise;
      console.log(data);

      setTimeout(() => {
        navigate("/allorders");
      }, 1100);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      details: "details",
      phone: "01010800921",
      city: "Cairo",
    },
    onSubmit: submitFn,
  });

  return (
    <div>
      <h1 className=" text-center text-2xl font-semibold text-green-600">Check Out </h1>

      <form
        onSubmit={formik.handleSubmit}
        className=" sm:max-w-md mx-auto  py-5   sm:py-6 px-2 rounded-md "
      >
        <div className="relative z-0 mb-5">
          <input
            type="text"
            id="details"
            className="block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
          />
          <label
            htmlFor="details"
            className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            details
          </label>
        </div>
        <div className="relative z-0 mb-5">
          <input
            type="text"
            id="phone"
            className="block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
          />
          <label
            htmlFor="phone"
            className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            phone
          </label>
        </div>
        <div className="relative z-0 mb-5">
          <input
            type="text"
            id="city"
            className="block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
          />
          <label
            htmlFor="city"
            className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            city
          </label>
        </div>
        <div>
          <button className="btn">Check out</button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
