import React, { useState } from 'react'
import "./components.css/cards.css"

function EditPost({ post, postDelete, updatePosts }){
    const timestamp = new Date(post.created_at).toLocaleTimeString();
    const [isEditing, setIsEditing] = useState(false);
    const [postBody, setPostBody] = useState('');

    function handleFormSubmit(e) {
      e.preventDefault();
  
      fetch(`http://127.0.0.1:5555/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: postBody,
        }),
      })
        .then((r) => r.json())
        .then((updatedPost) => updatePosts(updatedPost));
    }
  
    function handleDeleteClick() {
        fetch(`posts/${post.id}`, {
          method: "DELETE",
        });
        postDelete(post.id)
    }

    return(
        <div class='card-wrapper'>
            <div class='card'>
                <div class='header'>
                    <h1>{post.username}</h1>
                </div>
                <form class='body' onSubmit={handleFormSubmit}>
                    {isEditing ? <textarea type='text' value={postBody} onChange={e => setPostBody(e.target.value)}/> : <p>{post.body}</p>}
                    <p class="timestamp">{timestamp}</p>
                    {isEditing ? <button type="submit" onClick={() => setIsEditing((isEditing) => !isEditing)} >Save</button>: <button onClick={() => setIsEditing((isEditing) => !isEditing)}>Edit</button>}
                </form>
                <button onClick={handleDeleteClick}>Delete</button>
            </div> 
        </div>
    )
}

export default EditPost;