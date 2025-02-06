/* eslint-disable react/prop-types */
import { useState } from "react";

function ConfirmModal({ logoutFn }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 p-1 rounded-md text-white hover:bg-red-700"
      >
        <i className="fa-solid fa-right-from-bracket text-xl"></i>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex  p-2 z-[51] items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white flex items-center flex-col justify-center  h-[250px] w-full sm:w-1/2 text-center p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Are You Sure ? 😏</h2>
            <div className="mt-4 flex justify-center space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel 😃
              </button>
              <button
                onClick={async () => {
                  setShowModal(false);
                  logoutFn();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes,Log Out 😔
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmModal;
