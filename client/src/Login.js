import React, { useState } from 'react';
import './Login.css';
import {Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [auth, setAuth] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", data).then(
      res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        setAuth(true);
      }
    );
    console.log(data);
  };

  if (auth || localStorage.getItem('token')) {
    return <Navigate to="/dashboard" />;
  }

  return (
   <div>
    <nav className='navbar'>
            <ul><Link to="/login"><li>Login</li></Link>
                   <Link to="register"><li>Register</li></Link>
                   <Link to="/"><li>Home</li></Link>
                   
            </ul>
           </nav>
     
           <div className="login-container">
        
        <h2 style={{ color: 'white', margin: "15px" }}>Sign In</h2>
        <form className="login-form" onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="uname"><b>Email</b></label>
            <input type="email" placeholder="Enter Username" name="email" onChange={handleChange} required />
  
            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" onChange={handleChange} required /><br />
  
            <button type="submit" className="login-btn">Login</button>
          </div>
        </form>
      </div>
   </div>
  );
};

export default Login;
