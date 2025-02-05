// import { Helmet } from "react-helmet-async";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";
import img from "../../assets/favicon-8OdaHze_.png";
import { Helmet } from "react-helmet";
function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Fresh Cart" />
        <link rel="icon" href={img} type="image/png" />
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}

export default Home;
