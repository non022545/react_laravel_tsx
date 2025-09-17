import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            <h1>My Website</h1>
            <ul>
                <Link to="/">insertvalo</Link>
                <Link to="/login">login</Link>
            </ul>
        </div>
    )
}

export default Navbar
