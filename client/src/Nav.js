import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
const Nav = () => {
  return (
    <div>
        <nav className='navbar'>
            <ul><Link to="/login"><li>Login</li></Link>
                   <Link to="register"><li>Register</li></Link>
                   <Link to="/"><li>Home</li></Link>
                   
            </ul>
           </nav>
      
    </div>
  )
}

export default Nav
