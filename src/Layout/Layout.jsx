import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
// import DefaultLoader from "../components/DefaultLoader/DefaultLoader";
function Layout() {
  return (
    <div>
      <Navbar />
      {/* <DefaultLoader /> */}
      <div className="container p-2 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
