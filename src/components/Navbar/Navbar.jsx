// import { Link, NavLink } from "react-router-dom";

import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
// import logo from "../../assets/freshcart-logo.svg";
// import img from "../../assets/favicon-8OdaHze_.png";
import { useContext, useEffect, useRef, useState } from "react";
import { tokenContext } from "../../context/TokenContextProvider";
import { cartContext } from "../../context/CartContextProvider";
import { wishListContext } from "../../context/WishListContextProvider";
import ConfirmModalLogOut from "../LogOutDialog/ConfirmModalLogOut";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Navbar() {
  const [dark, setIsDark] = useState(
    localStorage.getItem("dark") ? JSON.parse(localStorage.getItem("dark")) : false
  );
  const [detailsName, setDetailsName] = useState({});
  const [open, setOpen] = useState(false);
  const { numOfCartItems } = useContext(cartContext);
  let { token, setToken } = useContext(tokenContext);
  const { loaderIconForNav } = useContext(cartContext);
  const { facLength, loaderFav } = useContext(wishListContext);

  const navigate = useNavigate();
  // token = true;
  function logoutFn() {
    localStorage.removeItem("token");
    setToken(null);
    // علي حسب .
    // localStorage.setItem("fav", JSON.stringify([]));
    // localStorage.setItem("numOfCartItems", 0);

    navigate("/login");
  }
  const [expand, setExapnd] = useState(true);
  const [h, setHeight] = useState(75);
  const heightul = useRef();
  function Expand() {
    console.log(expand);
    // console.log(heightul.current.scrollHeight + 75);
    if (expand) {
      setHeight(heightul.current.scrollHeight + 75);
    } else {
      setHeight(75);
    }
    setExapnd(!expand);
  }

  async function getDetailsUser() {
    try {
      console.log("dddd");
      // console.log(token);
      const { id } = jwtDecode(token);
      // console.log(id);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${id}`);
      // console.log(data.data);
      setDetailsName(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    token && getDetailsUser();
  }, [token]);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", false);
    }
  }, [dark]);

  return (
    // sm:max-h-none
    <nav
      //  max-h-[85px]
      style={{ maxHeight: `${h}px` }}
      className={`bg-navbar-bg pt-1 overflow-hidden   dark:bg-slate-800  transition-all duration-[.5s]
         fixed top-0 left-0 right-0 z-[50]`}
    >
      <div className="container">
        <div className="row justify-between  items-center">
          <div className="dark:bg-white">
            <Link to={"/"}>
              <img src={logo} alt="logo Fresh Cart" />
            </Link>
          </div>

          {token ? (
            <>
              <div className="row   md:order-4 items-center ">
                <ul className="row items-center ">
                  <li className="cursor-pointer relative me-1">
                    <Link to={"/wishList"} className="">
                      <span
                        className={`absolute bg-green-600 rounded-full top-[-18px] right-[-5px] size-[25px] flex items-center justify-center text-white `}
                      >
                        {loaderFav ? <i className="fas fa-spin fa-spinner"></i> : facLength}
                      </span>
                      <i
                        className="fa-regular fa-heart text-2xl
                  text-green-600"
                      ></i>
                    </Link>
                  </li>
                  <li className="relative ">
                    <Link to={"/cart"}>
                      <span
                        className={`absolute bg-green-600 rounded-full top-[-20px] right-[-12px] size-[25px] flex items-center justify-center text-white `}
                      >
                        {loaderIconForNav ? (
                          <i className="fas fa-spin fa-spinner"></i>
                        ) : (
                          numOfCartItems
                        )}
                      </span>
                      <i className={`fa-solid fa-cart-plus text-xl text-green-600 `}></i>
                    </Link>
                  </li>
                </ul>

                <div
                  onClick={() => {
                    Expand();
                  }}
                  className="burgurIcon cursor-pointer block md:hidden"
                >
                  <i className="fa-solid fa-bars dark:text-white  text-2xl"></i>
                </div>
                {/* <div className="ms-1">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultValue className="sr-only peer" defaultChecked />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600" />
                  </label>
                </div> */}
                <div className="ms-2  sm:ms-4">
                  <div
                    onClick={() => {
                      setOpen(!open);
                    }}
                    className="size-[30px]  cursor-pointer shadow-lg border-[1px] flex items-center justify-center rounded-full"
                  >
                    <i className="fa-regular text-green-600 dark:text-white fa-user"></i>
                    {/* <img src={img} alt="" className="w-full h-full" /> */}
                  </div>
                  <div
                    className={`shadow-lg bg-white dark:bg-slate-900 dark:text-white   fixed top-[75px] right-4 z-[100]  ${
                      open === true ? "max-h-[430px]" : "max-h-0"
                    } transition-all duration-[1s]  overflow-hidden`}
                  >
                    <ul className="space-y-2 p-2 w-full h-full">
                      <li>{detailsName?.name}</li>
                      <li>{detailsName?.email}</li>
                      <li>{detailsName?.phone?.slice(0, 7) + "$$.."}</li>
                      <li>
                        <ConfirmModalLogOut logoutFn={logoutFn} />
                      </li>
                      <li>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            // defaultValue
                            onChange={() => {}}
                            className="sr-only peer"
                            checked={dark}
                          />
                          <div
                            onClick={() => {
                              setIsDark(!dark);
                            }}
                            className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
                          />
                          <span
                            onClick={() => {
                              setIsDark(!dark);
                            }}
                            className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Dark
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>

                  {/* <ConfirmModalLogOut logoutFn={logoutFn} /> */}
                  {/* <button
                    onClick={() => {
                      logoutFn();
                    }}
                    className="bg-red-600 p-1 rounded-md text-white hover:bg-red-700"
                  >
                    <i className="fa-solid fa-right-from-bracket text-xl"></i>
                  </button> */}
                </div>
              </div>

              <ul
                ref={heightul}
                className="w-full sm:gap-4 sm:text-lg sm:font-medium md:w-fit md:row  text-center py-5
           space-y-2 md:space-y-0"
              >
                <li className="relative">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 dark:text-white"
                        : "relative after:absolute dark:text-white after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2 "
                    }
                    to={"/"}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="relative dark:text-white">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 dark:text-white "
                        : "relative after:absolute dark:text-white after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2"
                    }
                    to={"/products"}
                  >
                    Products
                  </NavLink>
                </li>

                <li className="relative dark:text-white">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 dark:text-white "
                        : "relative after:absolute dark:text-white after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2"
                    }
                    to={"/category"}
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="relative dark:text-white">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 dark:text-white "
                        : "relative after:absolute dark:text-white after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2"
                    }
                    to={"/brands"}
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="relative dark:text-white">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 dark:text-white "
                        : "relative after:absolute dark:text-white after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2"
                    }
                    to={"/allorders"}
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            <ul className="row gap-3">
              <li className="relative dark:text-white">
                <NavLink to={"/register"}>Register</NavLink>
              </li>{" "}
              <li className="relative dark:text-white">
                <NavLink to={"/login"}>Login</NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
