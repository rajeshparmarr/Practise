import React from "react";
import { Link } from "react-router-dom";

const Default = () => {
  return (
    <div>
      <header >
        <Link to={"/home"}>Go to Home</Link>
        <br />
        <Link to={"/add-task"}>Go to Add Task Page</Link>
        <br />

        <Link to={"/task-list"}>Go to Task List</Link>
        <br />

        <Link to={"/single-task-page"}>Go to Single Task Page</Link>
        <br />
      </header>
    </div>
  );
};

export default Default;
