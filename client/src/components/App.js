import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./Signup";
import Home from "./Home";
import LogIn from "./LogIn";
import NewPost from "./NewPost";
import Profile from "./Profile";
import PersonalPosts from "./PersonalPosts";
import NavBar from "./NavBar";


function App() {
  const navigate = useNavigate()
  const [allPosts, setAllPosts] = useState(null)
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState("false")
  const [userPosts, setUserPosts] = useState([])

  
  useEffect(() => {
    fetch("/home")
      .then(r => r.json())
      .then(posts => setAllPosts(posts))
  }, [])

  useEffect(() => {
    fetch(`posts/${user}`)
    .then(res => res.json())
    .then(posts => {
        setUserPosts(posts)
        console.log(posts)
    })
  }, [allPosts])

  useEffect(() => {
    fetch("/check_session")
    .then((response) => {
      if (response.ok) {
        response.json()
        .then((user) => {
          setUser(user.username)
          setLoggedIn(true)
        });
      }
      else {
        navigate("/")
      }
    });
  }, []);

  function updatePosts(new_post) {
    const updatedPost = allPosts.map((post) => {
      if (post.id === new_post.id) {
        return new_post;
      } else {
        return post;
      }
    });
    setAllPosts(updatedPost);
  }

  function postDelete(id){
    setAllPosts(allPosts.filter((post) => post.id !== id))
  }

  return (
    <main>
      {loggedIn === true? <NavBar />: loggedIn === false}
      <Routes>
        <Route path="home" element={user && <Home allPosts={allPosts} />}/>
        <Route path="profile" element={<Profile user={user} setLoggedIn={setLoggedIn}/>} />
        <Route path="posts" element={<PersonalPosts  postDelete={postDelete} userPosts={userPosts} updatePosts={updatePosts}/>}/>
        <Route path="login" element={<LogIn setUser={setUser} setLogIn={setLoggedIn} />}/>
        <Route path="newPost" element={<NewPost setAllPosts={setAllPosts} allPosts={allPosts} user={user}/>}/>
        <Route path="/" element={<SignUp setUser={setUser} setLogIn={setLoggedIn} />}/>
      </Routes>

    </main>
  );
}

export default App;
