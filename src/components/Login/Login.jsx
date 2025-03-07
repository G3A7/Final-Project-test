import axios from "axios";
import cart from "../../assets/favicon-8OdaHze_.png";
import { useFormik } from "formik";
import { useContext, useRef, useState } from "react";
import * as Yup from "yup";
// import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../context/TokenContextProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
function Login() {
  const { setToken } = useContext(tokenContext);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const pass = useRef();
  const values = {
    name: "",
    email: "",
  };
  let validateFn = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "must be strong password please 😁"
      ),
  });
  async function SubmitFn(vals) {
    setLoader(true);
    const res = axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", vals);
    toast.promise(
      res,
      {
        loading: "wait",
        success: "Account Created Successfully",
        error: (data) => data.response.data.message,
      },
      {
        position: "top-center",
        // autoClose: 1000,
      }
    );
    try {
      const { data } = await res;
      if (data.message === "success") {
        setTimeout(() => {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
        }, 2000);
      }
    } catch (e) {
      console.log(e);
      if (e.status == 409) {
        toast.error(`${e.response.data.message} 😎`);
      } else if (e.status == 401) {
        toast.error(`${e.response.data.message} 😎`);
      }
    } finally {
      setLoader(null);
    }
  }
  const formik = useFormik({
    initialValues: values,
    validationSchema: validateFn,
    onSubmit: SubmitFn,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="bg-[url('/light-patten.svg')] min-h-[60vh]  ">
        <h2 className="text-center mb-5">
          <span className="text-2xl text-green-700 font-bold">Login To</span>
          <div className="animate-custom_animate inline-block ms-3 align-middle w-[50px] h-[50px]">
            <img src={cart} className="w-full object-cover" alt="" />
          </div>
        </h2>
        {/* <h2 className="text-sm sm:text-xl    text-center mb-5 text-gray-500">
          Welcome to FreshCart - let&apos;s create your account
        </h2> */}
        {/* bg-navbar-bg max-w-xs  max-w-sm   shadow  */}
        <form
          onSubmit={formik.handleSubmit}
          className=" sm:max-w-md mx-auto  py-5   sm:py-6 px-2 rounded-md "
        >
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
            <div className="absolute right-0 top-[15px]">
              <i
                onClick={() => {
                  if (show) {
                    pass.current.type = "password";
                    setShow(false);
                  } else {
                    pass.current.type = "text";
                    setShow(true);
                  }
                }}
                className={`text-green-600 cursor-pointer fa-regular fa-eye${show ? "" : "-slash"}`}
              ></i>
            </div>
            <input
              ref={pass}
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              type="password"
              id="password"
              className={`block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer`}
              placeholder=""
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.password}
            </div>
          )}

          <div>
            <button
              disabled={!(formik.dirty && formik.isValid) || loader}
              className={`disabled:cursor-not-allowed btn ${loader ? "cursor-not-allowed" : ""}`}
            >
              {/* <i className="fa fa-spin fa-spinner"></i> */}
              {loader ? <i className="fa fa-spin fa-spinner"></i> : "Login"}
            </button>
          </div>
          <Link to="/forgetpass" className="underline mt-3 block text-green-700">
            Forget Passwor
          </Link>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default Login;
