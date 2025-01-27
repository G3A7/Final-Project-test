import img from "../../assets/error.svg";

function NotFound() {
  return (
    <div className="h-screen">
      <img src={img} className="w-full block" alt="" />
    </div>
  );
}

export default NotFound;
