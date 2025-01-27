/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to={"/login"} />;
}

export default ProtectedRoute;
