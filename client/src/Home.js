import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import './Home.css';

const HomeComponent =() =>{
    return (
        <div className='container'>
           <nav className='navbar'>
            <ul><Link to="/login"><li>Login</li></Link>
                   <Link to="register"><li>Register</li></Link>
                   <Link to="/"><li>Home</li></Link>
                   
            </ul>
           </nav>


           <div className='center'>
            <h1>Developers Hub</h1>
            <p>create a developer profile/ portfolio share posts and get help from others</p>
            <Link to="/register"><button className='signup'>Sign Up</button></Link>
            <Link to="/login"><button className='login'>Login</button></Link> 

           </div>

        </div>
    )
}

export default HomeComponent;