import React from 'react';
import "./GreenPassList.css"
import "./Home.css";
const GreenPassList = (props) => {
  return (
    <div style={{textAlign:"center"}}>
      <h2>{props.email}</h2>
      <h2>{props.status}</h2>
      <div className="allowDiv">
        <button className="allowBtn" onClick={()=>props.approveFunction(props.id)}>Allow</button>
        <button className="rejectBtn" onClick={()=>props.rejectFunction(props.id)}>Reject</button>
      </div>
    </div>
  );
};

export default GreenPassList;