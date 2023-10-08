import React from 'react';
import Posts from './Posts';


function Home({ allPosts }){


    console.log(allPosts)

    return (
        <div>
            <ul>
                {allPosts.map(p => (
                    <Posts key={p.id} post={p}/>
                ))}</ul>
        </div>
    )
}

export default Home;