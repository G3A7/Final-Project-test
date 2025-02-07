import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

function CategorySlider() {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    cssEase: "linear",
    autoplaySpeed: 1000,
    speed: 500,
    // lazyLoad: true,
    slidesToShow: 7,
    pauseOnHover: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [error, setError] = useState(null);
  // const [loader, setLoader] = useState(true);
  const url = `https://ecommerce.routemisr.com/api/v1/categories/`;
  async function getCategories() {
    try {
      setLoader(true);
      const { data } = await axios.get(url);
      setCategories(data.data);
      // console.log(categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="my-[25px]">
      {/* <h1 className="font-semibold text-2xl ps-6 mb-2">Category Slider</h1> */}
      {loader ? (
        <div className="flex items-center justify-center min-h-[250px]">
          <i className="fas fa-spin fa-spinner text-green-600 text-6xl"></i>
        </div>
      ) : (
        <Slider {...settings}>
          {categories.map((e) => {
            return (
              <div key={e._id}>
                <img
                  src={e.image}
                  className="w-full cursor-pointer  block h-[255px] object-cover"
                  alt=""
                />
                <h2 className="text-green-600 ">{e.name}</h2>
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}

export default CategorySlider;
