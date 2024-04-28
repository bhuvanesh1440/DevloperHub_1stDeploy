import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Myprofile = () => {
  const [users, setUsers] = useState({});
  const [review, setReview] = useState([]);

  useEffect(() => {
    // Fetch user data from an API endpoint
    axios
      .get("https://mern-deploy-api-smoky.vercel.app/myprofile", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }) // Replace with your API endpoint
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
        // Assuming the response data is an array of user objects
      });

    //review
    axios
      .get("https://mern-deploy-api-smoky.vercel.app/myreview", {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }) // Replace with your API endpoint
      .then((response) => {
        console.log(response.data);
        setReview(response.data);
        // Assuming the response data is an array of user objects
      });
  }, []);
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login"></Navigate>;
  }

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <ul>
          <Link to="/" onClick={() => localStorage.removeItem("token")}>
            <li>Logout</li>
          </Link>

          <Link to="/myprofile">
            <li>Myprofile</li>
          </Link>
        </ul>
      </nav>

      <Link to="/dashboard">
        <h2>Dashboard</h2>
      </Link>
     
      <center>
        
        <div className="users-list">
          <div key={users.id} className="user-card">
            {/* <div className="user-profile-pic">
                <img src={user.profilePicUrl} alt="Profile" />
              </div> */}
            <div className="user-details">
              <h3>{users.fullname}</h3>
              <p>Email: {users.email}</p>
              <p>Mobil: {users.mobile}</p>
              <p>
                <b>Skills:</b>{" "}
              </p>
              <ul>
                {users.skill &&
                  users.skill.split(",").map((skill) => <li>{skill}</li>)}
              </ul>
              <h4>My Reviews</h4>
              <div>
                {review.length!=0 ? 
                  review.map((review) => (
                    <div>
                      <h4>
                        <Link to="#">{review.taskprovider}</Link>
                      </h4>
                      <p>{review.ratings}/5</p>
                    </div>
                  )):<p>Reviews not yet added</p>}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <Link to="/dashboard">
      <b> View All Profiles</b>
      </Link>
      </center>
    </div>
  );
};

export default Myprofile;
