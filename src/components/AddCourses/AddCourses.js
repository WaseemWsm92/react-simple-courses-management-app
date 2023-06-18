import useInput from "../../hooks/use-input";
import { useState } from "react";
const isNotEmpty = (value) => value.trim() !== "";
const AddCourse = () => {
  const [showMessage, setMessage] = useState();
  const {
    value: courseValue,
    isValid: courseIsValid,
    hasError: courseHasError,
    valueChangeHandler: courseChangeHandler,
    inputBlurHandler: courseBlurHandler,
    reset: resetCourse,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (courseIsValid) {
    formIsValid = true;
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    } else {
      console.log("Sending req...");
      let user=JSON.parse(localStorage.getItem("user"));
      let body = {
        courseName: courseValue,
        email:user.email
      };
      try {
        const response = await fetch(
          "https://react-solution-test-3-default-rtdb.firebaseio.com/Courses.json",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          setMessage("Course not Added");
          if (!response.ok) {
            throw new Error("Something went wrong!");
          }
        }
        const data = await response.json();
        console.log(data);
      } catch {}
      resetCourse();
      setMessage("Course Added Successfully");
    }
  };
  const courseClasses = courseHasError ? "form-control invalid" : "form-control";
  return (
    <form onSubmit={submitHandler} className="align-middle">
      {showMessage && <p className="error-text">{showMessage} </p>}
      <div className="control-group ">
        <div className={courseClasses}>
          <label htmlFor="name">Course Name</label>
          <br />
          <input
            type="text"
            id="name"
            value={courseValue}
            onChange={courseChangeHandler}
            onBlur={courseBlurHandler}
          />
          {courseHasError && (
            <p className="error-text">Please enter a course name.</p>
          )}
        </div>
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Add Course</button>
      </div>
    </form>
  );
};
export default AddCourse;
