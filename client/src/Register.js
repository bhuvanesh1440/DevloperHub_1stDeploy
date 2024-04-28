import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css'
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        mobile: '',
        skill: '',
        password: '',
        confirmpassword: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });

      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hi");
        console.log(formData);
        // Check if passwords match
        if (formData.password !== formData.confirmpassword) {
          console.error('Passwords do not match');
          // Handle password mismatch scenario (e.g., show an error to the user)
          return;
        }
      
        try {
          // Send data to the server
          const response = await axios.post('https://mern-deploy-api-smoky.vercel.app/register', formData);
          console.log(response.data);
          alert(response.data) // Assuming the response contains the result from the server
      
          // Reset form after successful submission
          setFormData({
            fullname: '',
            email: '',
            mobile: '',
            skill: '',
            password: '',
            confirmpassword: '',
          });
        } catch (error) {
          console.error('Error registering user:', error);
        }
      };
    
      return (
        <div className="register-container">
            <nav className='navbar'>
            <ul><Link to="/login"><li>Login</li></Link>
                   <Link to="register"><li>Register</li></Link>
                   <Link to="/"><li>Home</li></Link>
                   
            </ul>
           </nav>
      <h2 style={{ color:"white",margin: " 15px" }}>Create an account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="fullname" placeholder="Name" value={formData.fullname} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
          <input type="text" name="skill" placeholder="Skill" value={formData.skill} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-btn">Register</button>
        </div>
      </form>
    </div>
      );
    };
    
    


export default Register
