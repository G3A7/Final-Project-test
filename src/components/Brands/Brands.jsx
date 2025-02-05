import useFetch from "../../Hooks/useFetch";

function Brands() {
  const { data, isError, isLoading, error } = useFetch(
    `https://ecommerce.routemisr.com/api/v1/brands`,
    "brands"
  );
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <i className="fas fa-spin fa-spinner text-green-500 text-7xl"></i>
      </div>
    );
  }
  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-navbar-bg p-3 rounded-md">
      <h1 className="text-3xl text-green-600 font-bold mb-5 text-center sm:text-left ">
        <i className="fa-solid fa-tags text-4xl animate-bounce"></i> Top Brands
      </h1>
      <div className="flex flex-wrap ">
        {data.map((brand) => {
          return (
            <div key={brand._id} className="w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-2">
              <div className="bg-white shadow-md cursor-pointer">
                <img src={brand.image} className="w-full h-full object-cover" alt="" />
                <h1 className="text-center text-2xl text-green-600 font-medium pb-2">{brand.name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Brands;
