import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultLoader from "../DefaultLoader/DefaultLoader";

function CategorySpecific() {
  const [subCat, setSubCat] = useState(null);
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  async function getSubCategories() {
    const promiseData = axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    try {
      setLoader(true);
      const { data } = await promiseData;
      console.log(data.data);
      setSubCat(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    getSubCategories();
  }, []);

  return (
    <div className="min-h-[60vh]">
      {loader ? (
        <DefaultLoader />
      ) : (
        <div className="bg-navbar-bg mt-3   p-3 dark:bg-slate-800">
          <h1 className="text-center mb-3 text-2xl text-green-600 font-semibold">Sub Categories</h1>
          <div className="flex flex-wrap items-center -p-2 ">
            {subCat?.length == 0 ? (
              <h1 className="text-2xl text-green-700 text-center flex-1 bg-slate-200">No Sub Category</h1>
            ) : (
              subCat?.map((e) => {
                return (
                  <div
                    className="w-full  sm:w-1/2  md:w-4/12  rounded-md p-2 lg:w-3/12"
                    key={e._id}
                  >
                    <div className="bg-white p-2 rounded-md  text-center">{e.name}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategorySpecific;
