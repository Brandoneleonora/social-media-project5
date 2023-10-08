import React from 'react'
import "./components.css/cards.css"

function Posts({ post }){

    const timestamp = new Date(post.created_at).toLocaleTimeString();

    return(
        <div class='card-wrapper'>
            <div class='card'>
                <div class='header'>
                    <h1>{post.username}</h1>
                </div>
                <div class='body'>
                    <p>{post.body}</p>
                    <p>{timestamp}</p>
                </div>
            </div> 
        </div>
    )
}

export default Posts;