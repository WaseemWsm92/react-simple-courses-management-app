import React from 'react';
const Course = (props) => {
  return (
    <li style={{textAlign:"center"}}>
      <h2>{props.title}</h2>
    </li>
  );
};

export default Course;