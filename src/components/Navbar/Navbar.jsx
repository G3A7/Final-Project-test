// import { Link, NavLink } from "react-router-dom";

import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { useContext, useRef, useState } from "react";
import { tokenContext } from "../../context/TokenContextProvider";
function Navbar() {
  let { token, setToken } = useContext(tokenContext);
  const navigate = useNavigate();
  // token = true;
  function logoutFn() {
    localStorage.removeItem("token");
    setToken(null);
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

  return (
    // sm:max-h-none
    <nav
      //  max-h-[85px]
      style={{ maxHeight: `${h}px` }}
      className={`bg-navbar-bg pt-1  overflow-hidden transition-all duration-[.5s]
         fixed top-0 left-0 right-0 z-[50]`}
    >
      <div className="container">
        <div className="row justify-between items-center">
          <div className="logo">
            <Link to={"/"}>
              <img src={logo} alt="logo Fresh Cart" />
            </Link>
          </div>

          {token ? (
            <>
              <div className="row  sm:order-4 items-center ">
                <ul className="row items-center gap-2">
                  <li className="cursor-pointer">
                    <Link to={"/fav"} className="">
                      <i
                        className="fa-regular fa-heart text-2xl
                  text-green-600"
                      ></i>
                    </Link>
                  </li>
                  <li className="">
                    <Link to={"/cart"}>
                      <i className="fa-solid fa-cart-plus  text-xl text-green-600"></i>
                    </Link>
                  </li>
                </ul>

                <div
                  onClick={() => {
                    Expand();
                  }}
                  className="burgurIcon cursor-pointer block sm:hidden"
                >
                  <i className="fa-solid fa-bars text-2xl"></i>
                </div>

                <div className="ms-2 sm:ms-4">
                  <button
                    onClick={() => {
                      logoutFn();
                    }}
                    className="bg-red-600 p-1 rounded-md text-white hover:bg-red-700"
                  >
                    <i className="fa-solid fa-right-from-bracket text-xl"></i>
                  </button>
                </div>
              </div>

              <ul
                ref={heightul}
                className="w-full sm:gap-4 sm:text-lg sm:font-medium sm:w-fit sm:row  text-center py-5
           space-y-2 sm:space-y-0"
              >
                <li className="">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2"
                        : "relative after:absolute after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2 "
                    }
                    to={"/home"}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 "
                        : "relative after:absolute after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2"
                    }
                    to={"/products"}
                  >
                    Products
                  </NavLink>
                </li>

                <li className="relative">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 "
                        : "relative after:absolute after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2"
                    }
                    to={"/category"}
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 "
                        : "relative after:absolute after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2"
                    }
                    to={"/brands"}
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    className={(bt5a) =>
                      bt5a.isActive
                        ? "relative active pb-2 "
                        : "relative after:absolute after:w-0 after:border-b-[3px] after:border-green-600 after:bg-green-600 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-[.5s] pb-2"
                    }
                    to={"/orders"}
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            </>
          ) : (
            <ul className="row gap-3">
              <li className="relative">
                <NavLink to={"/register"}>Register</NavLink>
              </li>{" "}
              <li className="relative">
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
