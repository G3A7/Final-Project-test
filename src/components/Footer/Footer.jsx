import img1 from "../../assets/amazon-pay-C6yg0mFR.png";
import img2 from "../../assets/American-Express-Color-BA04NtD8.png";
import img3 from "../../assets/paypal-f_p-vrjl.png";
import img4 from "../../assets/mastercard-DpLisAk5.webp";
import img5 from "../../assets/get-apple-store-9A-0RbJo.png";
import img6 from "../../assets/get-google-play-BORhnNzJ.png";
import img7 from "../../assets/Animation - 1734929967700-LxrRZL4f.gif";

function Footer() {
  return (
    <div className="bg-navbar-bg py-5 ">
      <div className="container p-3">
        <div className="border-b-2 border-gray-600 py-2 ">
          <h1 className="text-xl">Get the FreshCart app</h1>
          <p className="text-gray-500 mb-3">
            We will send you a link, open it on Your phone to download the app.
          </p>
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full sm:w-8/12 pe-5">
              <input
                type="text "
                className="focus:shadow-none border-[2px] border-green-600 w-full focus:border-green-600 focus:outline-none p-2 rounded-md"
                placeholder="Email...."
              />
            </div>
            <div className="sm:w-4/12 mt-3 sm:mt-0">
              <button className="btn w-full">Share App Link</button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center  md:justify-between items-center my-5">
          <div className="flex  gap-3 items-center justify-center">
            Payment Pathers <img className="w-[50px] cursor-pointer" src={img1} alt="" />
            <img className="w-[50px] cursor-pointer" src={img2} alt="" />
            <img className="w-[50px] cursor-pointer" src={img3} alt="" />
            <img className="w-[50px] cursor-pointer" src={img4} alt="" />
          </div>
          <div className="flex gap-3  mt-5 lg:mt-0  items-center justify-center">
            Get devliveries with FreshCart{" "}
            <img className="w-[90px] cursor-pointer" src={img5} alt="" />{" "}
            <img className="w-[90px] cursor-pointer" src={img6} alt="" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-center text-3xl text-green-600 font-bold">Follow Us</h1>
          <img src={img7} className="w-[40px] h-[40px]" alt="" />
          <div>
            <i className="text-lg text-green-400 cursor-pointer me-2 fa-brands fa-facebook"></i>{" "}
            <i className="text-lg text-green-400 cursor-pointer me-2 fa-brands fa-twitter"></i>{" "}
            <i className="text-lg text-green-400 cursor-pointer me-2 fa-brands fa-google"></i>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
