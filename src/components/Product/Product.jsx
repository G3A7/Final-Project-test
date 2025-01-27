import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Product({ product }) {
  return (
    //             px-4 | p-2
    <div className="p-2 w-full sm:w-6/12 md:w-4/12 lg:w-3/12">
      <div className=" p-2 shadow-lg group/parent rounded-md relative">
        <div className="group-hover/parent:opacity-100 group-hover/parent:visible  invisible  group-hover/parent:left-0 transition-all absolute flex flex-col w-[50px] h-[45%] bg-white opacity-0 shadow-md top-[15px] left-[-50px] text-center">
          <div className="cursor-pointer mt-6">
            <i className="fa-solid text-xl text-green-600 fa-heart fa-beat"></i>
          </div>
          <Link title="details" to={`/products/${product.id}/${product.category._id}`}>
            <div className="cursor-pointer mt-6">
              <i className="fa-solid text-xl text-green-600 fa-eye"></i>
            </div>
          </Link>
          <div className="cursor-pointer mt-6">
            <i className="fa-solid text-xl  fa-beat text-green-600 fa-cart-plus"></i>
          </div>
        </div>
        <div className="mb-2">
          <img src={product.imageCover} alt="" className="w-full h-[300px] object-cover block" />
        </div>
        <h3 className="text-green-600">{product.category.name}</h3>
        <h4 className="truncate font-semibold text-lg">{product.title}</h4>
        <div className="mt-3 flex justify-between items-center text-gray-500 font-medium">
          <span>{product.price} EGP</span>
          <p>
            <i className="fa-solid fa-star text-yellow-300"></i> {product.ratingsAverage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Product;
