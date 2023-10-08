import React, {useState} from 'react';
import './components.css/signup.css'
import { useNavigate, Link } from "react-router-dom";

function SignUp({ setUser, setLogIn }){
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function handleSubmit(e) {
        e.preventDefault();

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                username: username,
                password: password,
            }),
            
        })
        .then(r => r.json())
        .then((e) => {
            setUser(e.username)
            setLogIn(true)
            setFirstName("")
            setLastName("")
            setUsername("")
            setPassword("")
            navigate("/home")
        })
        .catch((error) => {
            console.log("Need to enter something in the input fields")
            console.log(error)
        })
    }
    
    return(
        <div className='sign-up-page'>
            
            <div className='web-Logo'>
                <h1><span>Gym</span><span>Eco.</span></h1>
            </div>

            <div class="sign-up">
                <h1>Sign Up Now</h1>
                <form class="sign-up-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="First Name..." value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <input type="text" placeholder="Last Name..." value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <input type="text" placeholder="Username..." value={username} onChange={e => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Password..." value={password} onChange={e => setPassword(e.target.value)}/>
                    <button type='sumbit'>Sign Up</button>
                </form>
                <Link to={"/login"}>Already have an account?</Link>
            </div>

        </div>
        
    )
}

export default SignUp