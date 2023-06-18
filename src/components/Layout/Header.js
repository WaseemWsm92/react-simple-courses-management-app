import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {
  let navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("user");
    navigate("../", { replace: true });
  };
  return (
    <div className="header">
      <div className="header-right">
        <Link to="/home">Home</Link>
        <Link to="/add-course">Add Courses</Link>
        <Link to="/apply-green-pass">Apply Green-Pass</Link>
        <button to="/" className=" blueButton" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;
