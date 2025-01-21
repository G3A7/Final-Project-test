import Login from "../Login/Login";

function ProtectedRoute({ children }) {
  if (localStorage.getItem("token")) {
    return { children };
  }
  return <Login />;
}

export default ProtectedRoute;
