/* eslint-disable react/prop-types */
// import axios from "axios";

import { useEffect, useState } from "react";

function DialogBrands({ open, setopen, getBrandsImg }) {
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(true);
  async function getimage() {
    try {
      setLoader(true);
      const img = await getBrandsImg();
      console.log(img);
      setImage(img);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getimage();
  }, []);

  return (
    <>
      <>
        <div
          id="popup-modal"
          tabIndex={-1}
          className={` ${
            open ? "flex bg-black/50" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm ">
              <button
                onClick={() => {
                  setopen(false);
                }}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5  text-center">
                {loader ? (
                  <i className="fas fa-spin text-green-600 text-5xl fa-spinner"></i>
                ) : (
                  <img src={image}  className="w-full" />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default DialogBrands;
