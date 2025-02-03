import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import img from "../../assets/favicon-8OdaHze_.png";
import { useFormik } from "formik";

function ForegetPass() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  // const inp = useRef();
  async function sendEmail({ email }) {
    const dataPromise = axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
      email,
    });
    toast.promise(
      dataPromise,
      {
        loading: "loading",
        success: ({ data }) => data.message,
        error: (data) => data.response.data.message,
      },
      {
        position: "top-center",
      }
    );
    try {
      setLoader(true);
      const { data } = await dataPromise;
      setTimeout(() => {
        navigate("/resetCode");
      }, 1000);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }
  const initialValues = {
    email: "",
  };
  const validationYup = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationYup,
    onSubmit: sendEmail,
  });

  return (
    <div className="min-h-[50vh]">
      <form
        onSubmit={formik.handleSubmit}
        className=" sm:max-w-md mx-auto  relative py-5 shadow-md  sm:py-6 px-2 rounded-md "
      >
        <div>
          <Link to={"/login"}>
            <i className="fa-solid animate-custom_animate fa-arrow-left text-xl text-green-500 cursor-pointer"></i>
          </Link>
        </div>

        <div className="size-[50px] m-auto">
          <img src={img} alt="" className="w-full h-full object-contain " />
        </div>
        <h1 className="text-center font-semibold text-2xl">Forget Password?:</h1>
        <p className="text-center text-gray-600 ">Enter your email address</p>
        <div className="relative z-0 mb-5">
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            type="text"
            id="email"
            className="block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=""
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
            {formik.errors.email}
          </div>
        )}
        <div>
          <button
            disabled={!(formik.dirty && formik.isValid)}
            className={`disabled:cursor-not-allowed btn`}
          >
            {loader && <i className="fas fa-spin fa-spinner me-2"></i>} Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForegetPass;
