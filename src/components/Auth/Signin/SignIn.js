import useInput from "../../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import {useState, useCallback, useEffect} from "react"
import './SignIn.css'
const SignIn = (props) => {
  const isEmail = (value) => value.includes("@");
  const isPasswordLength = (value) => value.length > 5;
  let navigate = useNavigate();
  const [users,setUsers] = useState([]);
  const [userFound, setUserFound] = useState(false);
  const [showMessage, setMessage]=useState()
  const fetchUsersHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://react-solution-test-3-default-rtdb.firebaseio.com/Users.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }let loadedUsers=[]
      const data = await response.json();
      for (const key in data) {
        loadedUsers.push({
          id: key,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          email: data[key].email,
          password: data[key].password,
          isAdmin: data[key].isAdmin,
        });
      }
      setUsers(loadedUsers)
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPasswordLength);
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
 
    let userfoundLocal= users.find((element) => {
      return element.email === emailValue ;
    })
    setUserFound(userfoundLocal)
    if(!userfoundLocal){
      console.log("not found");
      setMessage("User with entered email doesn't exist");
      return;
    }
     if(userfoundLocal && userfoundLocal.password !== passwordValue){
      setMessage("Email or password is not correct")
      return;
    }
        resetEmail();
        resetPassword();
        setMessage()
        navigate("../home", { replace: true });
        localStorage.setItem("user",JSON.stringify(userfoundLocal))
        props.loginFunc();
  };
  const navigateToSignUp = () => {
    navigate("../signup", { replace: true });
  };
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const passwordClasses = passwordHasError ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={submitHandler} className="align-middle">
      <h3>Sign In</h3>
      { showMessage &&  <p className="error-text"> {showMessage} </p>}
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail</label>
        <br />
        <input
          type="text"
          id="name"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
         {emailHasError && ( <p className="error-text">Please enter a valid email address.</p> )}
      </div>
      <div className={passwordClasses}>
        <label htmlFor="name">Password</label>
        <br />
        <input
          type="text"
          id="name"
          value={passwordValue}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        {passwordHasError && (
          <p className="error-text">Please enter ateast 6 characters.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
      <p>
        Don't have an account? <span className="cursor-pointer green-color" onClick={navigateToSignUp}>Sign Up for free</span>
      </p>
    </form>
  );
};

export default SignIn;
