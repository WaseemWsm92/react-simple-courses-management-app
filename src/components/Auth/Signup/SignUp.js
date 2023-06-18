import useInput from "../../../hooks/use-input";
import "./SignUp.css";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPasswordLength = (value) => value.length > 5;
const SignUp = (props) => {
  let navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users,setUsers] = useState([]);
  const [adminFound, setAdminFound] = useState(false);
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
      setAdminFound(
        loadedUsers.find((element) => {
          return element.isAdmin === true;
        })
      );
      setIsAdmin(false);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
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
  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmpPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput(isPasswordLength);

  let formIsValid = false;

  if (
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    confirmPasswordIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    let foundUser = users.find((element) => {
        return element.email === emailValue;
      })
    if(foundUser){
        setMessage(" User Name with the given email already exist.")
        return;
    }
    
    if (!formIsValid && foundUser ) {
      return;
    }
    else{
        let body = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            password: passwordValue,
            isAdmin,
          };
          try {
            const response = await fetch(
              "https://react-solution-test-3-default-rtdb.firebaseio.com/Users.json",
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            console.log(data);
          } catch {
            console.log("Some error occured!");
          }
        resetFirstName();
        resetLastName();
        resetEmail();
        resetPassword();
        resetConfirmPassword();
        setMessage("Sign Up Successful")
    }
  };

  const getIsAdminVal = () => {
    setIsAdmin((prev) => !prev);
  };
  const navigateToSignIn = () => {
    navigate("../", { replace: true });
  };
  const firstNameClasses = firstNameHasError ? "form-control invalid" : "form-control";
  const lastNameClasses = lastNameHasError ? "form-control invalid" : "form-control";
  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const passwordClasses = passwordHasError ? "form-control invalid" : "form-control";
  const confirmPasswordClasses = confirmpPasswordHasError ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={submitHandler} className="align-middle">
      <h3>Sign Up</h3>
      {showMessage && ( <p className="error-text"> {showMessage} </p> )}
      <div className="control-group ">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <br />
          <input
            type="text"
            id="name"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && (
            <p className="error-text">Please enter a first name.</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <br />
          <input
            type="text"
            id="name"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (<p className="error-text">Please enter a last name.</p> )}
        </div>
      </div>
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
        {passwordHasError && ( <p className="error-text">Please enter ateast 6 characters.</p> )}
      </div>
      <div className={confirmPasswordClasses}>
        <label htmlFor="name">Confirm Password</label>
        <br />
        <input
          type="text"
          id="name"
          value={confirmPasswordValue}
          onChange={confirmPasswordChangeHandler}
          onBlur={confirmPasswordBlurHandler}
        />
         {confirmpPasswordHasError && ( <p className="error-text">Please enter atleast 6 characters</p> )}
      </div>
      {passwordValue !== confirmPasswordValue && ( <p className="error-text"> Entered Password and confirm password does not match </p> )}
      {!adminFound?.isAdmin && (
        <>
          <label htmlFor="name">Is Admin?</label>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round" onClick={getIsAdminVal}></span>
          </label>
        </>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>

      <p>
        Already have an account?{" "}
        <span className="cursor-pointer green-color" onClick={navigateToSignIn}>
          Sign In.
        </span>
      </p>
    </form>
  );
};

export default SignUp;
