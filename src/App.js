import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./components/Auth/Signup/SignUp";
import SignIn from "./components/Auth/Signin/SignIn";
import Home from "./components/Home/Home"
import AddCourse from "./components/AddCourses/AddCourses";
import ApplyGreenPass from "./components/ApplyGreenPass/ApplyGreenPass";
import Protected from "./Protected";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  let currentUser = JSON.parse(localStorage.getItem("user"))
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setisLoggedIn(true);
      navigate(`../${location.pathname}`, { replace: true });
    }
  }, [])

  const logIn = () => {
    setisLoggedIn(true);
  };


  const logOut = () => {
    setisLoggedIn(false);
    localStorage.removeItem("user");
    navigate("../", { replace: true });
  };


  return (
    <Fragment>
      <div >
        {isLoggedIn ? (
          <div className="header-right">
            <Link className="btn" to="/home">Home</Link>
            {
              !currentUser?.isAdmin &&
              <span>
                <Link className="btn" to="/add-course">Add Courses</Link>
                <Link className="btn" to="/apply-green-pass">Apply Green-Pass</Link>
              </span>
            }
            <button onClick={logOut}>Logout</button>
          </div>
        ) :""}


      </div>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<SignIn loginFunc={logIn} />} />}
        {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
        <Route path="/home" element={<Protected isLoggedIn={isLoggedIn}> <Home /> </Protected>} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/apply-green-pass" element={<ApplyGreenPass />} />
      </Routes>
    </Fragment>
  );
}

export default App;
