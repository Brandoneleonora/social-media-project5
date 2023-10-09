import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./components.css/login.css"


function LogIn({ setUser, setLogIn }){
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    function handleSubmit(e) {
        e.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            
        })
        .then(r => {
            if(!r.ok) {
                throw Error('Incorrect Credentials')
            }
            else{
                return r.json()
            }
            
        }) 
            
        .then((e) => {
            setUser(e.username)
            setLogIn(true)
            setUsername("")
            setPassword("")
            navigate('/home')
        })
    }

    return(
        <div className="sign-up-page">
            <div className='web-Logo'>
                <h1><span>Gym</span><span>Eco.</span></h1>
            </div>
            <div className="log-in-form"> 
                <h1>Log In</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username..." value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password..." value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type='sumbit'>Log In</button>
                    <Link to={"/"}>Create an account?</Link>
                </form>
            </div>
        </div>


    )

}

export default LogIn