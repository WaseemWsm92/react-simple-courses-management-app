import "./ApplyGreenPass.css"
import { useState, useEffect, useCallback } from "react";
const ApplyGreenPass = () =>{
    const [greenPassStatus, setGreenPassStatus] = useState([]);
    const fetchUsersHandler = useCallback(async () => {
        try {
            const response = await fetch(
                "https://react-solution-test-3-default-rtdb.firebaseio.com/GreenPassStatus.json"
            );
            if (!response.ok) {
                throw new Error("Something went wrong!");
            } let loadedGreenPass = []
            const data = await response.json();
            for (const key in data) {
                loadedGreenPass.push({
                    id: key,
                    greenPassStatus: data[key].status,
                    email: data[key].email
                });
            }
            let userDetails= JSON.parse(localStorage.getItem("user"))
            let found = loadedGreenPass.find((element) => {
              return element.email === userDetails.email;
            })
            setGreenPassStatus(found)
        } catch (error) { }
    }, []);

    useEffect(() => {
        fetchUsersHandler();
    }, [fetchUsersHandler]);

    const applyGreenPassHandler = async () =>{
        let userDetails= JSON.parse(localStorage.getItem("user"));
        
        let body = {
            email: userDetails.email,
            status:"Pending"
          };
          try {
            const response = await fetch(
              "https://react-solution-test-3-default-rtdb.firebaseio.com/GreenPassStatus.json",
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
    }
    let content = ((!greenPassStatus  || greenPassStatus.greenPassStatus === "rejected")) && <button className="blueButton" onClick={applyGreenPassHandler}>Apply Green Pass</button>
    if (greenPassStatus && (greenPassStatus.greenPassStatus==="Approved" || greenPassStatus.greenPassStatus==="Pending")) {
        content = <p>You have already applied.</p>;
    }
    return(
        <div>
           {content}
        </div>
    )
}
export default ApplyGreenPass;