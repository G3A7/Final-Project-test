import { useState } from "react";

function ConfirmModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Clear All
      </button>

      {showModal && (
        <div className="fixed inset-0 flex p-2 items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full sm:w-1/2 text-center p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Are You Sure ? 😏</h2>
            <div className="mt-4 flex justify-center space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel 😃
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes,Delete 😔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfirmModal;
