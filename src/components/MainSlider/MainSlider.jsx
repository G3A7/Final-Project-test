import img1 from "../../assets/slider-image-1.jpeg";
import img2 from "../../assets/slider-image-2.jpeg";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import Slider from "react-slick";

function MainSlider() {
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    cssEase: "linear",
    autoplaySpeed: 2000,
    speed: 500,
    // lazyLoad: true,
    slidesToShow: 1,
    pauseOnHover: false,
    slidesToScroll: 1,
    // responsive: [
    //   {
    //     breakpoint: 900,
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //     },
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 1,
    //     },
    //   },
    // ],
  };
  return (
    <>
      <div className="row  ">
        <div className="w-2/3 ">
          <Slider {...settings}>
            <img src={slide1} className="h-[200px] sm:h-[400px] w-full " alt="" />
            <img src={slide2} className="h-[200px] sm:h-[400px] w-full " alt="" />
            <img src={slide3} className="h-[200px] sm:h-[400px] w-full " alt="" />
          </Slider>
        </div>
        <div className="w-1/3">
          <img src={img1} className=" h-[100px] sm:h-[200px] w-full block" alt="" />
          <img src={img2} className=" h-[100px] sm:h-[200px] w-full block" alt="" />
        </div>
      </div>
    </>
  );
}

export default MainSlider;
