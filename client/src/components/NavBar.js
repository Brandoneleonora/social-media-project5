import React from "react"
import { NavLink } from "react-router-dom"
import "./components.css/navbar.css"

function NavBar(){
    return(
        <div class='nav_bar'>
            <div className="webLogo">
                <NavLink to='/home' className="logo-words"><span>Gym</span><span>Eco.</span></NavLink>
            </div>
            <div className="navBar-options">
                <NavLink to='/home' className="home">Home</NavLink>
                <NavLink to='/posts' className="my-post">My Posts</NavLink>
                <NavLink to ='/newPost' className="new-post">Create Post</NavLink>
                <NavLink to='/profile' className="profile">Profile</NavLink>

            </div>
        </div>
    )

}


export default NavBar