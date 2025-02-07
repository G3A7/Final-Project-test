// import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import DefaultLoader from "../DefaultLoader/DefaultLoader";
// import axios from "axios";

function Categories() {
  const { data, isError, isLoading, error } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    "categories"
  );
  // const [open, setOpen] = useState(false);
  // const [subCat, setSubCat] = useState(null);

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

  // async function getSubCategories(id) {
  //   try {
  //     const { data } = await axios.get(
  //       `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  //     );
  //     console.log(data.data);
  //     setSubCat(data.data);
  //     setOpen(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
                  // getSubCategories(category._id);
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

      {/* {open && (
        <div>
          {subCat.map((e) => {
            return <div key={e._id}></div>;
          })}
        </div>
      )} */}
    </>
  );
}

export default Categories;
