import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Dashboard.css'; // Import your CSS file for styling
import { Link,Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from an API endpoint
    axios.get('http://localhost:5000/allprofiles',{
            headers:{
                'x-token':localStorage.getItem('token')
            }
        }) // Replace with your API endpoint
      .then(response => {
        console.log(response.data);
        setUsers(response.data); 
        // Assuming the response data is an array of user objects
      })
      
  }, []);
  if(!localStorage.getItem('token')){
    return <Navigate to="/login"></Navigate>
  }

  return (
    <div className="dashboard-container">
        <nav className='navbar'>
            <ul><Link to="/" onClick={()=> localStorage.removeItem('token')}><li>Logout</li></Link>
                   
                   <Link to="/myprofile"><li>Myprofile</li></Link>
                   
            </ul>
           </nav>
      <h2>Dashboard</h2>
      <center>
      {users.length >=1? <div className="users-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            {/* <div className="user-profile-pic">
              <img src={user.profilePicUrl} alt="Profile" />
            </div> */}
            <div className="user-details">
              <h3>{user.fullname}</h3>
              <p>Email: {user.email}</p>
              <Link to={`/individual/${user.fullname}/${user.email}/${user.skill}/${user._id}`}><button>View Profile</button></Link>
              <p><b>Skills:</b> </p>
              <ul>
                {user.skill.split(',').map(skill=>
                    <li>{skill}</li>)}
                
              </ul>
              
            </div>
            <br />
          </div>
        ))}
      </div> :null}
      </center>
      
    </div>
  );
};

export default Dashboard;
