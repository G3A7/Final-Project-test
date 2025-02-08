/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/prop-types */
import { useState } from "react";

// function ConfirmModal({ deleteProducts }) {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button onClick={() => setShowModal(true)} className="btn bg-red-700 w-fit hover:bg-red-600">
//         Clear All
//       </button>

//       {showModal && (
//         <div className="fixed inset-0 flex p-2 z-[51] items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white  flex items-center flex-col justify-center  h-[250px] w-full sm:w-1/2 text-center p-6 rounded-lg shadow-lg">
//             <h2 className="text-lg font-bold">Are You Sure ? 😏</h2>
//             <div className="mt-4 flex justify-center space-x-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-300 px-4 py-2 rounded-md"
//               >
//                 Cancel 😃
//               </button>
//               <button
//                 onClick={async () => {
//                   setShowModal(false);
//                   await deleteProducts();
//                 }}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md"
//               >
//                 Yes,Delete 😔
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ConfirmModal;

// eslint-disable-next-line react/prop-types
function ConfirmModal({ deleteProducts }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className="btn bg-red-700 w-fit hover:bg-red-600">
        Clear All
      </button>
      {showModal && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 bg-black/50 min-h-[100vh] "
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <button
                onClick={() => {
                  setShowModal(false);
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
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product 😏?
                </h3>
                <button
                  onClick={async () => {
                    const { message } = await deleteProducts();
                    if (message == '"success"') {
                      setShowModal(false);
                    }
                  }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, i'm sure 😔
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel 😃
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmModal;
