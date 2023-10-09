import { useNavigate } from "react-router-dom";
import "./components.css/Profile.css"
import React, { useEffect, useState} from "react";


function Profile({ user, setLoggedIn }){
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)

    useEffect(() => {
        fetch(`profile/${user}`)
        .then(res => res.json())
        .then(profile => setProfile(profile))
      }, [user])

    function handleLogout(){
      fetch('/logout', {method: 'DELETE'})
      .then(res => {
        console.log(res)
        setLoggedIn(false)
      })
      navigate('/')
    }
  
    return (
        <div className="profile-container">
          {profile && 
          <div className="profile-box">
            <div class="right-side">
              <h1>{`First Name: ${profile.first_name}`}</h1>
              <h1>{`Last Name: ${profile.last_name}`}</h1>
              <h1>{`Username: ${profile.username}`}</h1>
              <h1>{`Password: **********`}</h1>
            </div>
            <div class="left-side">
              <h1>{`Lifter: ${profile.lifter}`}</h1>
              <h1>{`Age: ${profile.age}`}</h1>
              <h1>{`Astrology_sign: ${profile.astrology_sign}`}</h1>
              <h1>{`Favorite Color: ${profile.color}`}</h1>
            </div>
          </div>
          }
          <button onClick={() => handleLogout()}>Sign Out</button>
        </div>
    )
}


export default Profile;