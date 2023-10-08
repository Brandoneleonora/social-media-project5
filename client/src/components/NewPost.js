import React, { useState } from 'react';
import "./components.css/newpost.css"

function NewPost({ user, setAllPosts, allPosts}){
    const [body, setBody] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
    
        fetch("/home", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user,
            body: body,
          }),
        })
          .then((r) => r.json())
          .then((newPost) => {
            addPost(newPost)
            setBody("");
          });

    function addPost(post){
      setAllPosts([...allPosts, post])
    }
      }
    return(
      <div class='wrapped-container'>
        <div class='container'>
          <h1>{user}</h1>
          <form class="new-posts-form" onSubmit={handleSubmit}>
            <textarea type='text' name="body" value={body} onChange={e => setBody(e.target.value)}/>
            <button type='submit'>Submit</button>
          </form>
        </div>
    
      </div>

    )
}

export default NewPost;