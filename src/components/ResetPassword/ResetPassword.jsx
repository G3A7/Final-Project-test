import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import img from "../../assets/favicon-8OdaHze_.png";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { tokenContext } from "../../context/TokenContextProvider";
import { Helmet } from "react-helmet";

function ResetPassword() {
  const { setToken } = useContext(tokenContext);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const validationYup = Yup.object().shape({
    email: Yup.string().email().required(),
    newPassword: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "must be strong password please 😁"
      ),
  });
  const formik = useFormik({
    initialValues: { email: "", newPassword: "" },
    validationSchema: validationYup,
    onSubmit: resetPass,
  });

  async function resetPass({ email, newPassword }) {
    const dataPromise = axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
      email,
      newPassword,
    });

    toast.promise(
      dataPromise,
      {
        loading: "loading",
        success: "success",
        error: (data) => data.response.data.message,
      },
      {
        position: "top-center",
      }
    );
    try {
      setLoader(true);
      const { data } = await dataPromise;
      console.log(data);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      //  مش عارف هل اشيلهم ولا لا .
      // localStorage.setItem("fav", 0);
      // localStorage.setItem("numOfCartItems", 0);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
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
          <h1 className="text-center font-semibold text-2xl dark:text-white">Reset Password?:</h1>
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

          <div className="relative z-0 mb-5">
            <input
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              type="text"
              id="newPassword"
              className="block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""
            />
            <label
              htmlFor="newPassword"
              className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              New Password
            </label>
          </div>

          {}

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
    </div>
  );
}

export default ResetPassword;
