import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      <div className="container p-2 ">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
