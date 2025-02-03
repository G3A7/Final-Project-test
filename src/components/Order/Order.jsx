import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../context/TokenContextProvider";
import ingEmptyFav from "../../assets/Animation - 1734995792926-BDjvBpLc.gif";
import { Link } from "react-router-dom";

function Order() {
  const { token } = useContext(tokenContext);
  const [orders, setOrders] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  async function getOrdersForUser() {
    try {
      setLoader(true);
      const { id } = jwtDecode(token);
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      setOrders(data);
      // console.log(orders);
      setError(null);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data.message);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    token && getOrdersForUser();
  }, [token]);
  return (
    <div>
      <h1 className="text-3xl mb-5 ms-2 font-semibold text-green-600">All Orders : </h1>

      <section>
        {loader ? (
          <div className="h-[450px] flex justify-center items-center">
            <i className="fas fa-spin fa-spinner text-green-600 text-7xl"></i>
          </div>
        ) : error ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {" "}
            {error}
          </div>
        ) : orders?.length == 0 ? (
          <div className="bg-navbar-bg p-5 min-h-[50vh] flex flex-col items-center justify-center space-y-3">
            <img src={ingEmptyFav} alt="" />
            <p className="w-full text-center font-semibold text-lg">
              <span className="text-green-700 font-bold"> Oops!</span> Your Order is empty. Start
              adding products by clicking the button below!
            </p>
            <Link className="btn text-lg text-center font-semibold" to="/">
              Back To Home
            </Link>
          </div>
        ) : (
          orders?.map((order) => {
            return (
              <div key={order.id} className=" mb-5 border-green-600 border-[2px] p-2 rounded-md">
                <div className="flex sm:justify-between items-center flex-wrap justify-center gap-5  p-3 bg-navbar-bg shadow-md">
                  <p className="text-green-600 text-2xl font-bold">
                    OrderId:
                    <span className="p-2 bg-slate-200 ms-1 rounded-md font-bold"># {order.id}</span>
                  </p>
                  <div>
                    <button
                      className={`btn w-fit ${
                        !order.isPaid
                          ? "bg-red-600 hover:bg-red-600"
                          : "bg-green-600 hover:bg-green-600"
                      } mx-2 `}
                    >
                      {!order.isPaid ? (
                        <i className="fa-solid fa-circle-xmark me-2"></i>
                      ) : (
                        <i className="fa-solid fa-check me-2"></i>
                      )}
                      {!order.isPaid ? "Not" : ""}Paid
                    </button>
                    <button className="btn  w-fit">
                      {!order.isDelivered ? (
                        <>
                          {" "}
                          <i className="fa-solid fa-hourglass-half"></i> In Transit
                        </>
                      ) : (
                        <>
                          <i className="fa-solid text-white fa-truck"></i>
                          Delivered
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="row items-center flex-wrap">
                  {order?.cartItems?.map((product) => {
                    return (
                      <div
                        key={product.product.id}
                        className="p-2  w-full sm:w-6/12 md:w-4/12 lg:w-3/12 "
                      >
                        <div className="p-2 text-center shadow-sm border-[1px] border-gray-600 space-y-3 rounded-md">
                          <div className="w-full ">
                            <img
                              src={product.product.imageCover}
                              className="object-cover w-full h-full"
                              alt=""
                            />
                          </div>
                          <h1 className="text-green-600 text-2xl font-bold">
                            {product.product.title.length > 35
                              ? product.product.title.slice(0, 35) + "..."
                              : product.product.title}
                          </h1>
                          <p className="font-bold text-xl">
                            {product.price} * <span className="text-red-500">{product.count}</span>{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px-3 bg-navbar-bg rounded-md">
                  <p className="font-semibold text-2xl">
                    Total Order Price:{" "}
                    <span className="font-bold text-2xl text-green-600">
                      {order.totalOrderPrice}{" "}
                    </span>
                    EGP
                  </p>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

export default Order;
