import React, { useEffect, useState } from "react";
import EditPost from './EditPost';

function PersonalPosts({  postDelete, userPosts,  updatePosts}){



    return(
        <div>
            <ul>{userPosts.map(post => (
                <EditPost key={post.id} post={post} postDelete={postDelete} updatePosts={updatePosts}/>
            ))}</ul>
        </div>
    )
}


export default PersonalPosts