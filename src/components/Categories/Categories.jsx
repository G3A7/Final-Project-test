import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import DefaultLoader from "../DefaultLoader/DefaultLoader";
import axios from "axios";
import toast from "react-hot-toast";

function Categories() {
  const { data, isError, isLoading, error } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "categories"
  );
  const [open, setOpen] = useState(false);
  const [subCat, setSubCat] = useState(null);
  const [typeCat, setTypeCat] = useState("");
  const [loaderSubCat, setLoaderSubCat] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <DefaultLoader />
        {/* <i className="fas fa-spin fa-spinner text-green-500 text-7xl"></i> */}
      </div>
    );
  }
  if (isError) {
    return <div>{error}</div>;
  }

  async function getSubCategories(id) {
    const promiseData = axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    toast.promise(promiseData, {
      loading: "loading",
      error: "error",
      success: "success",
    });
    try {
      setLoaderSubCat(true);
      const { data } = await promiseData;
      // console.log(data.data);
      setSubCat(data.data);
      setOpen(true);
      console.log(document.body.scrollHeight);
      window.scroll({
        top: document.body.scrollHeight - 1000,
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderSubCat(false);
    }
  }

  return (
    <>
      <div className="bg-navbar-bg p-3 rounded-md dark:bg-slate-800">
        <h1 className="text-3xl text-green-600 font-bold mb-5 text-center sm:text-left ">
          <i className="fa-solid fa-tags text-4xl animate-bounce"></i> Categories
        </h1>
        <div className="flex flex-wrap justify-center items-center">
          {data.map((category) => {
            return (
              <div
                onClick={() => {
                  getSubCategories(category._id);
                  setTypeCat(category.name);
                }}
                key={category._id}
                className="w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-3"
              >
                <div className="  p-2 shadow-md ">
                  <div className=" size-[250px] mx-auto cursor-pointer">
                    <img src={category.image} className="w-full h-full  object-cover" alt="" />
                  </div>
                  <h1 className="text-center text-2xl text-green-600 font-medium ">
                    {category.name}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {loaderSubCat ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <i className="fas fa-spin fa-spinner text-5xl text-green-600"></i>
        </div>
      ) : (
        open && (
          <div className="bg-navbar-bg mt-3 p-3 dark:bg-slate-800">
            <h1 className="text-center mb-3 text-2xl text-green-600 font-semibold">{typeCat}</h1>
            <div className="flex flex-wrap items-center -p-2 ">
              {subCat.map((e) => {
                return (
                  <div
                    className="w-full  sm:w-1/2  md:w-4/12  rounded-md p-2 lg:w-3/12"
                    key={e._id}
                  >
                    <div className="bg-white p-2 rounded-md  text-center">{e.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Categories;
