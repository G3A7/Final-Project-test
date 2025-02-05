import axios from "axios";
import cart from "../../assets/favicon-8OdaHze_.png";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
// import { tokenContext } from "../../context/TokenContextProvider";
function Register() {
  // const { setToken } = useContext(tokenContext);
  const [show, setShow] = useState(false);
  const [showreP, setShowreP] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const pass = useRef();
  const rePass = useRef();
  const values = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let validateFn = Yup.object().shape({
    name: Yup.string().required().min(3).max(15),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "must be strong password please 😁"
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")])
      .required(),
    phone: Yup.string()
      .matches(/^(020)?(010|012|015|011)[0-9]{8}$/, "must be mobile phone valid please 😐")
      .required(),
  });
  async function SubmitFn(vals) {
    setLoader(true);
    const res = axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", vals);
    toast.promise(
      res,
      {
        pending: "wait",
        success: "Account Created Successfully",
        error: "Erro",
      },
      {
        position: "top-center",
        autoClose: 1000,
      }
    );
    try {
      const { data } = await res;
      if (data.message === "success") {
        setTimeout(() => {
          navigate("/login");
        }, 700);
      }
    } catch (e) {
      console.log(e);
      if (e.status == 409) {
        toast.error(`${e.response.data.message} 😎`, {
          pauseOnHover: false,
        });
      } else if (e.status == 401) {
        toast.error(`${e.response.data.errors.msg} 😎`);
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
        <title>Register</title>
      </Helmet>
      <div>
        <h2 className="text-center mb-5">
          <span className="text-2xl text-green-700 font-bold">Register To</span>
          <div className="animate-custom_animate inline-block ms-3 align-middle w-[50px] h-[50px]">
            <img src={cart} className="w-full object-cover" alt="" />
          </div>
        </h2>
        <h2 className="text-sm sm:text-xl    text-center mb-5 text-gray-500">
          Welcome to FreshCart - let&apos;s create your account
        </h2>
        {/* bg-navbar-bg max-w-xs  max-w-sm   shadow  */}
        <form
          onSubmit={formik.handleSubmit}
          className=" sm:max-w-md mx-auto  py-5   sm:py-6 px-2 rounded-md "
        >
          <div className="relative z-0 mb-5">
            <input
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              type="text"
              id="name"
              className="block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Name
            </label>
          </div>
          {formik.errors.name && formik.touched.name && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.name}
            </div>
          )}
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
          <div className="relative z-0 mb-5">
            <div className="absolute right-0 top-[15px]">
              <i
                onClick={() => {
                  if (showreP) {
                    rePass.current.type = "password";
                    setShowreP(false);
                  } else {
                    rePass.current.type = "text";
                    setShowreP(true);
                  }
                }}
                className={`text-green-600 cursor-pointer fa-regular fa-eye${
                  showreP ? "" : "-slash"
                }`}
              ></i>
            </div>

            <input
              ref={rePass}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              type="password"
              id="rePassword"
              className="block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              rePassword
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.rePassword}
            </div>
          )}
          <div className="relative z-0 mb-5">
            <input
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              type="text"
              id="phone"
              className="block py-2.5 px-0  w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=""
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-green-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Phone
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              {formik.errors.phone}
            </div>
          )}
          <div>
            <button
              disabled={!(formik.dirty && formik.isValid) || loader}
              className={`disabled:cursor-not-allowed btn ${loader ? "cursor-not-allowed" : ""}`}
            >
              {/* <i className="fa fa-spin fa-spinner"></i> */}
              {loader ? <i className="fa fa-spin fa-spinner"></i> : "Register"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
