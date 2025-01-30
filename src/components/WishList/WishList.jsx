import { useContext, useEffect, useState } from "react";
import { wishListContext } from "../../context/WishListContextProvider";

function WishList() {
  const { getAllWishList } = useContext(wishListContext);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);
  const [productsWishlist, setProductsWishlist] = useState(false);
//   واقف هنا 
  async function getAll() {
    try {
      setLoading(true);
      const data = await getAllWishList();
      setProductsWishlist(data.data);
      setError(null);
    } catch (error) {
      setError("Errro");
      console.log(error);
    } finally {
      setLoading(null);
    }
  }

  useEffect(() => {
    getAll();
    console.log(productsWishlist)
  }, []);

  return (
    <div>
      <h1 className="text-2xl">
        {/* <i class="fa-solid fa-heart"></i> */}
        My WishList <i className="fas fa-heart fa-beat text-2xl text-green-600"></i>
      </h1>
      {/*       Wiash List  UI */}
      <section className=" shadow-lg p-5">
        <div className="container">
          <div className="flex justify-between shadow-sm shadow-green-600 items-center p-5  mb-5  ">
            <div className="flex items-center justify-center gap-4 bg-red-600">
              <div className="">
                <img src="" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2>name</h2>
                <p>price</p>
              </div>
            </div>
            <div>
              <i className="fas fa-trash-can text-red-600"></i>
              <button>Cart</button>
            </div>
          </div>
          <div className="flex justify-between items-center p-5   ">
            <div className="flex items-center justify-center gap-4 bg-red-600">
              <div className="">
                <img src="" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2>name</h2>
                <p>price</p>
              </div>
            </div>
            <div>
              <i className="fas fa-trash-can text-red-600"></i>
              <button>Cart</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WishList;
